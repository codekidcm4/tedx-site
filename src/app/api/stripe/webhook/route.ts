import Stripe from "stripe";
import { fulfillOrder } from "@/lib/ticketsDb";
import { sendTicketEmail } from "@/lib/ticketEmail";

// Stripe calls this after a payment. On success we mark the order paid, mint a QR ticket per seat,
// release the holds, and email the tickets. Add the endpoint in Stripe → Developers → Webhooks
// (event payment_intent.succeeded) and put its signing secret in STRIPE_WEBHOOK_SECRET.
export async function POST(req: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  const whsec = process.env.STRIPE_WEBHOOK_SECRET;
  if (!key || !whsec) return new Response("not configured", { status: 503 });

  const sig = req.headers.get("stripe-signature");
  const raw = await req.text();
  const stripe = new Stripe(key);

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig as string, whsec);
  } catch (err) {
    console.error("Webhook signature verification failed", err);
    return new Response("invalid signature", { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const pi = event.data.object as Stripe.PaymentIntent;
    const orderId = pi.metadata?.order_id;
    if (orderId) {
      const result = await fulfillOrder(orderId);
      if ("error" in result) {
        // A seat was lost between hold and payment: refund automatically, don't email tickets.
        if (result.error === "seat_conflict") {
          try {
            await stripe.refunds.create({ payment_intent: pi.id });
          } catch (err) {
            console.error("Auto-refund failed for seat conflict; needs manual review", pi.id, err);
          }
        }
      } else if (!result.alreadyFulfilled) {
        // Email only on the first successful delivery (Stripe can redeliver the event).
        try {
          await sendTicketEmail(result.order.email, result.tickets, result.order.session);
        } catch (err) {
          console.error("Ticket email failed (order still fulfilled)", err);
        }
      }
    }
  }

  return new Response("ok", { status: 200 });
}
