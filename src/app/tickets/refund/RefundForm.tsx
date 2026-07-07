"use client";

import { useState } from "react";
import { ticketConfig } from "@/data/tickets";
import { siteConfig } from "@/data/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function RefundForm() {
  const [email, setEmail] = useState("");
  const [session, setSession] = useState("");
  const [reason, setReason] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error" | "fallback" | "failed">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) { setState("error"); return; }
    setState("sending");
    try {
      const res = await fetch("/api/refund", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: email.trim(), session: session || null, reason }),
      });
      if (res.ok) setState("done");
      else if (res.status === 503) setState("fallback");
      else if (res.status === 400) setState("error");
      else setState("failed");
    } catch {
      setState("failed");
    }
  }

  if (state === "done") {
    return (
      <div className="border border-[#e0e0e0] rounded-sm p-6 bg-[#f9f9f9] max-w-lg">
        <p className="font-bold text-[#0a0a0a] mb-1">Request received.</p>
        <p className="text-sm text-[#555555] leading-relaxed">
          We&apos;ve logged your refund request for {email} and will follow up by email. Refunds are
          returned to the original payment method.
        </p>
      </div>
    );
  }

  if (state === "fallback") {
    return (
      <div className="border border-[#e0e0e0] rounded-sm p-6 bg-white max-w-lg">
        <p className="text-sm text-[#555555] leading-relaxed">
          Please email{" "}
          <a href={`mailto:${siteConfig.email}?subject=Refund request`} className="text-[#e62b1e] font-semibold hover:underline">
            {siteConfig.email}
          </a>{" "}
          with your name and the email used at checkout, and we&apos;ll take care of it.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="max-w-lg space-y-5">
      <div>
        <label htmlFor="refund-email" className="block text-sm font-semibold text-[#0a0a0a] mb-1.5">Email used at checkout</label>
        <input
          id="refund-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (state === "error") setState("idle"); }}
          placeholder="you@email.com"
          aria-invalid={state === "error"}
          className="w-full px-4 py-3 text-sm rounded-sm border border-[#e0e0e0] outline-none focus:border-[#e62b1e] transition-colors"
        />
      </div>
      <div>
        <label htmlFor="refund-session" className="block text-sm font-semibold text-[#0a0a0a] mb-1.5">Which session (optional)</label>
        <select
          id="refund-session"
          value={session}
          onChange={(e) => setSession(e.target.value)}
          className="w-full px-4 py-3 text-sm rounded-sm border border-[#e0e0e0] outline-none focus:border-[#e62b1e] transition-colors bg-white"
        >
          <option value="">Not sure</option>
          {ticketConfig.sessions.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="refund-reason" className="block text-sm font-semibold text-[#0a0a0a] mb-1.5">Reason (optional)</label>
        <textarea
          id="refund-reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={3}
          placeholder="Anything that helps us find your order"
          className="w-full px-4 py-3 text-sm rounded-sm border border-[#e0e0e0] outline-none focus:border-[#e62b1e] transition-colors"
        />
      </div>
      {state === "error" && (
        <p className="text-xs text-[#c9231a] font-semibold" role="alert">Please enter the email you used at checkout.</p>
      )}
      {state === "failed" && (
        <p className="text-xs text-[#c9231a] font-semibold" role="alert">Something went wrong. Please try again, or email us directly.</p>
      )}
      <button
        type="submit"
        disabled={state === "sending"}
        className="inline-flex items-center justify-center px-8 py-3.5 bg-[#e62b1e] text-white font-bold text-sm rounded-sm hover:bg-[#c9231a] transition-colors disabled:opacity-50"
      >
        {state === "sending" ? "Sending…" : "Request a refund"}
      </button>
    </form>
  );
}
