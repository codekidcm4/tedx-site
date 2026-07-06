"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { formatPrice } from "@/data/tickets";
import type { SessionId } from "@/data/tickets";

const pk = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
export const stripeConfigured = Boolean(pk);
const stripePromise = pk ? loadStripe(pk) : null;

function PayForm({ amount, onSuccess }: { amount: number; onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePay(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setSubmitting(true);
    setError(null);
    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/tickets` },
      redirect: "if_required",
    });
    if (stripeError) {
      setError(stripeError.message || "Payment could not be completed. Please try again.");
      setSubmitting(false);
    } else {
      onSuccess();
    }
  }

  return (
    <form onSubmit={handlePay} className="max-w-lg">
      <PaymentElement options={{ layout: "tabs" }} />
      {error && (
        <p className="mt-3 text-xs text-[#e62b1e] font-semibold" role="alert">{error}</p>
      )}
      <button
        type="submit"
        disabled={!stripe || submitting}
        className="mt-6 inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#e62b1e] text-white font-bold text-sm rounded-sm hover:bg-[#c9231a] transition-colors disabled:opacity-50"
      >
        {submitting ? "Processing…" : `Pay ${formatPrice(amount)}`}
      </button>
      <p className="text-[0.65rem] text-[#9a9a9a] mt-3">
        Payments are secured by Stripe. Test mode: use card 4242 4242 4242 4242, any future date and CVC.
      </p>
    </form>
  );
}

interface StripePaymentProps {
  sessionId: SessionId;
  seats: string[];
  email: string;
  amount: number;
  onSuccess: () => void;
}

export function StripePayment({ sessionId, seats, email, amount, onSuccess }: StripePaymentProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const seatsKey = seats.join(",");

  useEffect(() => {
    let active = true;
    fetch("/api/checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ sessionId, seats, email }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (!active) return;
        if (d.clientSecret) setClientSecret(d.clientSecret);
        else setErr("We couldn't start the payment. Please go back and try again.");
      })
      .catch(() => active && setErr("We couldn't start the payment. Please go back and try again."));
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId, seatsKey, email]);

  if (err) return <p className="text-sm text-[#e62b1e] font-semibold" role="alert">{err}</p>;
  if (!stripePromise) return null;
  if (!clientSecret) return <p className="text-sm text-[#9a9a9a]">Loading secure payment…</p>;

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: { theme: "stripe", variables: { colorPrimary: "#e62b1e", borderRadius: "2px" } },
      }}
    >
      <PayForm amount={amount} onSuccess={onSuccess} />
    </Elements>
  );
}
