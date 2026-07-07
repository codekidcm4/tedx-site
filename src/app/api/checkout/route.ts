import { NextResponse } from "next/server";
import Stripe from "stripe";
import { ticketConfig, sessionById } from "@/data/tickets";
import type { SessionId } from "@/data/tickets";
import { dbConfigured, createOrderWithHolds, attachPaymentIntent } from "@/lib/ticketsDb";

// Starts a ticket order: reserves the seats (database hold, so no double-booking) and creates a
// Stripe PaymentIntent. The amount is recomputed here from trusted config so the client can't set
// its own price. Fulfillment (minting QR tickets + email) happens in the Stripe webhook on success.
export async function POST(req: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return NextResponse.json({ error: "not_configured" }, { status: 503 });

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

  const validSession = ticketConfig.sessions.some((s) => s.id === sessionId);
  const validSeats = Array.isArray(seats) && seats.length >= 1 && seats.length <= ticketConfig.maxPerOrder;
  if (!validSession || !validSeats) {
    return NextResponse.json({ error: "invalid_order" }, { status: 400 });
  }

  const seatList = seats as string[];
  const price = sessionById(sessionId as SessionId).price;
  const amount = price * seatList.length;
  const nameMap = (names && typeof names === "object" ? (names as Record<string, string>) : {});
  const buyerEmail = typeof email === "string" ? email : "";

  // Reserve the seats in the database first (if configured). If a seat was just taken, stop here.
  let orderId: string | null = null;
  if (dbConfigured()) {
    const held = await createOrderWithHolds({ session: sessionId as string, seats: seatList, email: buyerEmail, names: nameMap, amountCents: amount });
    if ("error" in held) {
      if (held.error === "seat_taken") {
        return NextResponse.json({ error: "seat_taken" }, { status: 409 });
      }
      return NextResponse.json({ error: "db_error" }, { status: 500 });
    }
    orderId = held.orderId;
  }

  try {
    const stripe = new Stripe(key);
    const intent = await stripe.paymentIntents.create({
      amount,
      currency: ticketConfig.currency,
      automatic_payment_methods: { enabled: true },
      receipt_email: buyerEmail || undefined,
      metadata: {
        event: "TEDxHuntingValley",
        session: String(sessionId),
        seats: seatList.join(","),
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
