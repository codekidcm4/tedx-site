import { NextResponse } from "next/server";
import Stripe from "stripe";
import { ticketConfig, sessionById } from "@/data/tickets";
import type { SessionId } from "@/data/tickets";

// Creates a Stripe PaymentIntent for a ticket order. The amount is recomputed here from trusted
// config so the client can never set its own price. Returns a client secret for the Payment Element.
// Fulfillment (marking seats sold + emailing QR tickets) happens in the Stripe webhook once the
// database + email are connected; this route only starts the payment.
export async function POST(req: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    // Stripe not configured (e.g. env not set on this deployment). Client falls back to preview mode.
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const { sessionId, seats, email } = (body ?? {}) as {
    sessionId?: string;
    seats?: unknown;
    email?: unknown;
  };

  const validSession = ticketConfig.sessions.some((s) => s.id === sessionId);
  const validSeats =
    Array.isArray(seats) && seats.length >= 1 && seats.length <= ticketConfig.maxPerOrder;
  if (!validSession || !validSeats) {
    return NextResponse.json({ error: "invalid_order" }, { status: 400 });
  }

  const price = sessionById(sessionId as SessionId).price;
  const amount = price * (seats as string[]).length;

  try {
    const stripe = new Stripe(key);
    const intent = await stripe.paymentIntents.create({
      amount,
      currency: ticketConfig.currency,
      // Enables cards + Apple Pay + Google Pay + Link automatically, per your Stripe settings.
      automatic_payment_methods: { enabled: true },
      receipt_email: typeof email === "string" && email ? email : undefined,
      metadata: {
        event: "TEDxHuntingValley",
        session: String(sessionId),
        seats: (seats as string[]).join(","),
      },
    });
    return NextResponse.json({ clientSecret: intent.client_secret, amount });
  } catch (err) {
    console.error("Stripe checkout error", err);
    return NextResponse.json({ error: "stripe_error" }, { status: 500 });
  }
}
