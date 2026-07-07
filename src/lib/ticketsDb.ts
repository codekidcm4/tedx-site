import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Server-only Supabase access with the service-role key (bypasses RLS). Never import this from a
// client component. Every function no-ops gracefully when the DB isn't configured, so the site
// keeps working (checkout falls back to Stripe-only) until the service-role key is added.

const url = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function dbConfigured(): boolean {
  return Boolean(url && serviceKey);
}

let client: SupabaseClient | null = null;
function db(): SupabaseClient {
  if (!client) client = createClient(url as string, serviceKey as string, { auth: { persistSession: false } });
  return client;
}

// The physical sessions a display session occupies. An All-Day seat is held/sold in BOTH s1 and s2.
function physicalSessions(session: string): string[] {
  return session === "all-day" ? ["s1", "s2"] : [session];
}

/** Seats currently unavailable for the given (display) session: sold tickets + unexpired holds. */
export async function getTakenSeats(session: string): Promise<string[]> {
  if (!dbConfigured()) return [];
  const phys = physicalSessions(session);
  const nowIso = new Date().toISOString();
  const taken = new Set<string>();
  const [{ data: tks }, { data: holds }] = await Promise.all([
    db().from("tickets").select("seat").in("session", phys),
    db().from("seat_holds").select("seat").in("session", phys).gt("expires_at", nowIso),
  ]);
  (tks ?? []).forEach((t) => taken.add((t as { seat: string }).seat));
  (holds ?? []).forEach((h) => taken.add((h as { seat: string }).seat));
  return [...taken];
}

type CreateResult = { orderId: string } | { error: "seat_taken" | "db_error" };

/** Create a pending order and hold its seats (in every physical session) for `holdMinutes`. */
export async function createOrderWithHolds(params: {
  session: string;
  seats: string[];
  email: string;
  names: Record<string, string>;
  amountCents: number;
  holdMinutes?: number;
}): Promise<CreateResult> {
  if (!dbConfigured()) return { error: "db_error" };
  const { session, seats, email, names, amountCents } = params;
  const phys = physicalSessions(session);
  const nowIso = new Date().toISOString();

  // Free up any expired holds on these seats so they can be taken again.
  await db().from("seat_holds").delete().in("session", phys).in("seat", seats).lte("expires_at", nowIso);

  // Reject if any seat is already sold.
  const { data: sold } = await db().from("tickets").select("seat").in("session", phys).in("seat", seats);
  if ((sold?.length ?? 0) > 0) return { error: "seat_taken" };

  const { data: order, error: oErr } = await db()
    .from("orders")
    .insert({ session, seats, email, names, amount_cents: amountCents, status: "pending" })
    .select("id")
    .single();
  if (oErr || !order) return { error: "db_error" };
  const orderId = (order as { id: string }).id;

  const expiresAt = new Date(Date.now() + (params.holdMinutes ?? 15) * 60_000).toISOString();
  const holdRows = phys.flatMap((ps) => seats.map((seat) => ({ session: ps, seat, order_id: orderId, expires_at: expiresAt })));
  const { error: hErr } = await db().from("seat_holds").insert(holdRows);
  if (hErr) {
    // Unique (session, seat) violation: someone holds a seat right now. Roll back the order.
    await db().from("orders").delete().eq("id", orderId);
    return { error: "seat_taken" };
  }
  return { orderId };
}

/** Link a Stripe PaymentIntent to an order. */
export async function attachPaymentIntent(orderId: string, paymentIntentId: string): Promise<void> {
  if (!dbConfigured()) return;
  await db().from("orders").update({ stripe_payment_intent: paymentIntentId }).eq("id", orderId);
}

export type FulfilledTicket = { session: string; seat: string; token: string; name: string | null };

/** Mark an order paid, mint a ticket (with QR token) per seat, and clear its holds. Idempotent. */
export async function fulfillOrder(orderId: string): Promise<
  { order: { session: string; email: string; amount_cents: number }; tickets: FulfilledTicket[] } | { error: string }
> {
  if (!dbConfigured()) return { error: "db_error" };
  const { data: order } = await db().from("orders").select("*").eq("id", orderId).single();
  if (!order) return { error: "no_order" };
  const o = order as { id: string; session: string; seats: string[]; email: string; names: Record<string, string>; amount_cents: number };
  const phys = physicalSessions(o.session);

  const ticketRows = phys.flatMap((ps) =>
    o.seats.map((seat) => ({ order_id: o.id, session: ps, seat, holder_name: o.names?.[seat] ?? null }))
  );
  // onConflict do nothing = idempotent if the webhook fires twice.
  await db().from("tickets").upsert(ticketRows, { onConflict: "session,seat", ignoreDuplicates: true });
  await db().from("orders").update({ status: "paid" }).eq("id", o.id);
  await db().from("seat_holds").delete().eq("order_id", o.id);

  const { data: tickets } = await db()
    .from("tickets")
    .select("session, seat, qr_token, holder_name")
    .eq("order_id", o.id);
  const mapped: FulfilledTicket[] = (tickets ?? []).map((t) => {
    const row = t as { session: string; seat: string; qr_token: string; holder_name: string | null };
    return { session: row.session, seat: row.seat, token: row.qr_token, name: row.holder_name };
  });
  return { order: { session: o.session, email: o.email, amount_cents: o.amount_cents }, tickets: mapped };
}

/** Look up a single ticket by its QR token (for the /ticket/[token] page and door check-in). */
export async function getTicketByToken(token: string) {
  if (!dbConfigured()) return null;
  const { data } = await db()
    .from("tickets")
    .select("session, seat, holder_name, checked_in")
    .eq("qr_token", token)
    .maybeSingle();
  return (data as { session: string; seat: string; holder_name: string | null; checked_in: boolean } | null) ?? null;
}
