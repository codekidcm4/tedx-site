import { NextResponse } from "next/server";
import Stripe from "stripe";
import { ticketConfig, sessionById, sampleSections, seatId } from "@/data/tickets";
import type { SessionId } from "@/data/tickets";
import { dbConfigured, createOrderWithHolds, attachPaymentIntent } from "@/lib/ticketsDb";

// Every real seat id, for validating the client's request.
const VALID_SEAT_IDS = new Set(
  sampleSections.flatMap((s) => s.rows.flatMap((r) => Array.from({ length: r.seats }, (_, i) => seatId(s.id, r.row, i + 1))))
);

// Starts a ticket order: reserves the seats (database hold, so no double-booking) and creates a
// Stripe PaymentIntent. The amount is recomputed here from trusted config and validated seats, so
// the client can't set its own price or seats. Fulfillment happens in the Stripe webhook on success.
export async function POST(req: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  // Never charge real money without seat inventory to fulfill it.
  if (key.startsWith("sk_live") && !dbConfigured()) {
    return NextResponse.json({ error: "inventory_unavailable" }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const { sessionId, seats, email, names } = (body ?? {}) as {
    sessionId?: string;
    seats?: unknown;
    email?: unknown;
    names?: unknown;
  };

  const rawSeats = Array.isArray(seats) ? (seats as unknown[]).filter((x): x is string => typeof x === "string") : [];
  const uniqueSeats = [...new Set(rawSeats)];
  const validSession = ticketConfig.sessions.some((s) => s.id === sessionId);
  const validSeats =
    Array.isArray(seats) &&
    rawSeats.length === seats.length &&
    uniqueSeats.length === rawSeats.length &&
    uniqueSeats.length >= 1 &&
    uniqueSeats.length <= ticketConfig.maxPerOrder &&
    uniqueSeats.every((s) => VALID_SEAT_IDS.has(s));
  if (!validSession || !validSeats) {
    return NextResponse.json({ error: "invalid_order" }, { status: 400 });
  }

  const price = sessionById(sessionId as SessionId).price;
  const amount = price * uniqueSeats.length;
  const nameMap = names && typeof names === "object" ? (names as Record<string, string>) : {};
  const buyerEmail = typeof email === "string" ? email : "";

  const stripe = new Stripe(key);

  // Reserve the seats first (if configured). Reuse the buyer's existing PaymentIntent on retry.
  let orderId: string | null = null;
  let reusedPi: string | null = null;
  if (dbConfigured()) {
    const held = await createOrderWithHolds({ session: sessionId as string, seats: uniqueSeats, email: buyerEmail, names: nameMap, amountCents: amount });
    if ("error" in held) {
      if (held.error === "seat_taken") return NextResponse.json({ error: "seat_taken" }, { status: 409 });
      return NextResponse.json({ error: "db_error" }, { status: 500 });
    }
    orderId = held.orderId;
    reusedPi = held.reusedPaymentIntent;
  }

  try {
    if (reusedPi) {
      const existing = await stripe.paymentIntents.retrieve(reusedPi);
      if (existing.status !== "succeeded" && existing.status !== "canceled") {
        return NextResponse.json({ clientSecret: existing.client_secret, amount });
      }
    }
    const intent = await stripe.paymentIntents.create({
      amount,
      currency: ticketConfig.currency,
      // Dynamic methods: card + Apple Pay + Google Pay. Link is hidden client-side (Payment
      // Element `wallets: { link: "never" }`) so buyers keep the wallets but not the Link upsell.
      automatic_payment_methods: { enabled: true },
      receipt_email: buyerEmail || undefined,
      metadata: {
        event: "TEDxHuntingValley",
        session: String(sessionId),
        seats: uniqueSeats.join(","),
        ...(orderId ? { order_id: orderId } : {}),
      },
    });
    if (orderId && intent.id) await attachPaymentIntent(orderId, intent.id);
    return NextResponse.json({ clientSecret: intent.client_secret, amount });
  } catch (err) {
    console.error("Stripe checkout error", err);
    return NextResponse.json({ error: "stripe_error" }, { status: 500 });
  }
}
