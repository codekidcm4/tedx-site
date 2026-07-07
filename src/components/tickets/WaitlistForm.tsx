"use client";

import { useState } from "react";
import { siteConfig } from "@/data/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Shown when a session is sold out. Captures an email so the organizer can reach out if seats open
// up (a refund frees a seat automatically). Falls back to a mailto if the database isn't connected.
export function WaitlistForm({ session, sessionName }: { session: string; sessionName: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error" | "fallback" | "failed">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) { setState("error"); return; }
    setState("sending");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: email.trim(), session }),
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
        <p className="font-bold text-[#0a0a0a] mb-1">You&apos;re on the waitlist.</p>
        <p className="text-sm text-[#555555] leading-relaxed">
          If a seat opens up for {sessionName}, we&apos;ll email {email}. Thanks for your interest.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-[#e0e0e0] rounded-sm p-6 bg-white max-w-lg">
      <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#e62b1e] mb-2">Sold out</p>
      <p className="font-bold text-[#0a0a0a] mb-1">{sessionName} is full.</p>
      <p className="text-sm text-[#555555] leading-relaxed mb-4">
        Join the waitlist and we&apos;ll email you if a seat opens up.
      </p>
      {state === "fallback" ? (
        <p className="text-sm text-[#555555]">
          Please email{" "}
          <a href={`mailto:${siteConfig.email}?subject=Waitlist ${encodeURIComponent(sessionName)}`} className="text-[#e62b1e] font-semibold hover:underline">
            {siteConfig.email}
          </a>{" "}
          to join the waitlist.
        </p>
      ) : (
        <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
          <label htmlFor={`waitlist-${session}`} className="sr-only">Email for the waitlist</label>
          <input
            id={`waitlist-${session}`}
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); if (state === "error") setState("idle"); }}
            placeholder="you@email.com"
            aria-invalid={state === "error"}
            className="flex-1 px-4 py-3 text-sm rounded-sm border border-[#e0e0e0] outline-none focus:border-[#e62b1e] transition-colors"
          />
          <button
            type="submit"
            disabled={state === "sending"}
            className="inline-flex items-center justify-center px-6 py-3 bg-[#e62b1e] text-white font-bold text-sm rounded-sm hover:bg-[#c9231a] transition-colors disabled:opacity-50"
          >
            {state === "sending" ? "Joining…" : "Join waitlist"}
          </button>
        </form>
      )}
      {state === "error" && (
        <p className="mt-3 text-xs text-[#c9231a] font-semibold" role="alert">Please enter a valid email address.</p>
      )}
      {state === "failed" && (
        <p className="mt-3 text-xs text-[#c9231a] font-semibold" role="alert">Something went wrong. Please try again in a moment.</p>
      )}
    </div>
  );
}
