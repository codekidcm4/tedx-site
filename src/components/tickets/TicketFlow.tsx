"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ticketConfig,
  sampleSections,
  sampleSold,
  totalSeats,
  formatPrice,
  sessionById,
} from "@/data/tickets";
import type { SessionId } from "@/data/tickets";
import { SeatMap } from "@/components/tickets/SeatMap";
import { StripePayment, stripeConfigured } from "@/components/tickets/StripePayment";
import { WaitlistForm } from "@/components/tickets/WaitlistForm";
import { verifyPresaleCode } from "@/app/tickets/actions";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function seatLabel(id: string): string {
  const [section, rest] = id.split("-");
  const names: Record<string, string> = { L: "Left", C: "Center", R: "Right" };
  return `${names[section] ?? section} ${rest}`;
}

function Gate({ onUnlock }: { onUnlock: () => void }) {
  const [code, setCode] = useState("");
  const [state, setState] = useState<"idle" | "checking" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("checking");
    try {
      const res = await verifyPresaleCode(code);
      if (res.ok) onUnlock();
      else setState("error");
    } catch {
      setState("error");
    }
  }

  return (
    <div className="max-w-md mx-auto text-center">
      <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-[#e62b1e]/30 bg-[#e62b1e]/10">
        <span className="w-2 h-2 rounded-full bg-[#e62b1e] animate-pulse" aria-hidden="true" />
        <span className="text-[0.6rem] font-bold tracking-[0.16em] uppercase text-[#e62b1e]">Pre-sale</span>
      </div>
      <h2 className="font-extrabold text-[#0a0a0a] mb-3" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", letterSpacing: "-0.02em" }}>
        Tickets aren&apos;t public yet.
      </h2>
      <p className="text-[#555555] leading-relaxed mb-8">
        Seating at Gund Auditorium is capped at 100, so tickets open first to our pre-sale list.
        Pre-sale buyers get first pick of every seat. Enter your code to choose seats, or join the
        list below and we will send you one.
      </p>
      <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 justify-center">
        <label htmlFor="presale-code" className="sr-only">Pre-sale code</label>
        <input
          id="presale-code"
          value={code}
          onChange={(e) => { setCode(e.target.value); setState("idle"); }}
          placeholder="Enter pre-sale code"
          className="flex-1 px-4 py-3 text-sm rounded-sm border border-[#e0e0e0] outline-none focus:border-[#e62b1e] transition-colors"
          aria-invalid={state === "error"}
        />
        <button
          type="submit"
          disabled={state === "checking" || code.trim().length === 0}
          className="inline-flex items-center justify-center px-6 py-3 bg-[#e62b1e] text-white font-bold text-sm rounded-sm hover:bg-[#c9231a] transition-colors disabled:opacity-50"
        >
          {state === "checking" ? "Checking…" : "Unlock"}
        </button>
      </form>
      {state === "error" && (
        <p className="mt-3 text-xs text-[#c9231a] font-semibold" role="alert">
          That code didn&apos;t work. Check it and try again.
        </p>
      )}
      <p className="mt-8 text-xs text-[#6b6b6b]">
        No code yet?{" "}
        <Link href="/#tickets" className="text-[#e62b1e] font-semibold hover:underline">Join the interest list</Link>{" "}
        and we&apos;ll send one when the pre-sale opens.
      </p>
    </div>
  );
}

function LegendDot({ className, label, dot }: { className: string; label: string; dot?: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`relative inline-block w-3.5 h-3.5 rounded-[3px] ${className}`} aria-hidden="true">
        {dot && <span className="absolute inset-0 m-auto w-1.5 h-1.5 rounded-full" style={{ background: dot }} />}
      </span>
      <span className="text-xs text-[#555555]">{label}</span>
    </span>
  );
}

/** Small live "seats left" pill. */
function SeatsLeft({ remaining, total }: { remaining: number; total: number }) {
  const low = remaining > 0 && remaining <= 12;
  const sold = remaining <= 0;
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
        sold ? "text-[#c9231a]" : low ? "text-[#b45309]" : "text-[#555555]"
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${sold ? "bg-[#c9231a]" : low ? "bg-[#b45309]" : "bg-[#16794a]"}`} aria-hidden="true" />
      {sold ? "Sold out" : `${remaining} of ${total} seats left`}
    </span>
  );
}

function OrderReview({ sessionId, selected, price, total }: { sessionId: SessionId; selected: string[]; price: number; total: number }) {
  return (
    <div className="border border-[#e0e0e0] rounded-sm p-6 bg-white">
      <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#6b6b6b] mb-4">Your order</p>
      <p className="font-bold text-[#0a0a0a]">{sessionById(sessionId).name}</p>
      <p className="text-xs text-[#777777] mb-4">{sessionById(sessionId).detail}</p>
      <ul className="border-t border-[#f0f0f0] divide-y divide-[#f0f0f0] mb-4">
        {selected.map((id) => (
          <li key={id} className="flex items-center justify-between py-2.5 text-sm">
            <span className="text-[#0a0a0a] font-medium">Seat {seatLabel(id)}</span>
            <span className="text-[#555555]">{formatPrice(price)}</span>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between border-t border-[#e0e0e0] pt-4">
        <span className="text-sm font-semibold text-[#0a0a0a]">Total</span>
        <span className="text-xl font-extrabold text-[#0a0a0a]">{formatPrice(total)}</span>
      </div>
    </div>
  );
}

export function TicketFlow() {
  const [unlocked, setUnlocked] = useState(!ticketConfig.presaleActive);
  const [sessionId, setSessionId] = useState<SessionId | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [step, setStep] = useState<"select" | "details">("select");
  const [substep, setSubstep] = useState<"info" | "payment">("info");
  const [names, setNames] = useState<Record<string, string>>({});
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [paid, setPaid] = useState(false);
  const [taken, setTaken] = useState<string[]>([]);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [summary, setSummary] = useState<Record<string, { remaining: number; total: number }>>({});

  // Live availability across all sessions, for the session cards. Refreshes every 25s.
  useEffect(() => {
    let active = true;
    const load = () =>
      fetch("/api/seats?summary")
        .then((r) => r.json())
        .then((d) => { if (active && d.sessions) setSummary(d.sessions); })
        .catch(() => {});
    load();
    const t = setInterval(load, 25000);
    return () => { active = false; clearInterval(t); };
  }, []);

  // Live availability for the chosen session (seat map + counter). Refreshes every 20s.
  useEffect(() => {
    if (!sessionId) { setTaken([]); setRemaining(null); return; }
    setTaken([]); setRemaining(null); // clear the previous session's data so it can't flash
    let active = true;
    const load = () =>
      fetch(`/api/seats?session=${sessionId}`)
        .then((r) => r.json())
        .then((d) => {
          if (!active) return;
          if (Array.isArray(d.taken)) setTaken(d.taken);
          if (typeof d.remaining === "number") setRemaining(d.remaining);
        })
        .catch(() => {});
    load();
    const t = setInterval(load, 20000);
    return () => { active = false; clearInterval(t); };
  }, [sessionId]);

  const soldSet = useMemo(
    () => new Set([...(sessionId ? sampleSold[sessionId] : []), ...taken]),
    [sessionId, taken]
  );
  const selectedSet = useMemo(() => new Set(selected), [selected]);
  const price = sessionId ? sessionById(sessionId).price : 0;
  const total = selected.length * price;
  const maxReached = selected.length >= ticketConfig.maxPerOrder;
  const soldOut = remaining !== null && remaining <= 0;

  function resetToSeats() {
    setStep("select");
    setSubstep("info");
    setPaid(false);
    setFormError(null);
  }
  function pickSession(id: SessionId) {
    if (id === sessionId) return; // re-clicking the active session must not wipe the selection
    setSessionId(id);
    setSelected([]);
    resetToSeats();
  }
  function toggleSeat(id: string) {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((s) => s !== id)
        : prev.length < ticketConfig.maxPerOrder
        ? [...prev, id]
        : prev
    );
  }
  function submitDetails() {
    for (const id of selected) {
      if (!(names[id] && names[id].trim())) {
        setFormError("Please add a name for each ticket.");
        return;
      }
    }
    if (!EMAIL_RE.test(email.trim())) {
      setFormError("Please enter a valid email for your tickets.");
      return;
    }
    setFormError(null);
    if (stripeConfigured) setSubstep("payment");
    else setPaid(true); // no Stripe keys on this deploy: show the preview confirmation
  }

  if (!unlocked) return <Gate onUnlock={() => setUnlocked(true)} />;

  // ── Step 3: details → payment ──
  if (step === "details" && sessionId) {
    return (
      <div>
        <button
          type="button"
          onClick={() => {
            if (substep === "payment") { setSubstep("info"); return; }
            resetToSeats();
          }}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#555555] hover:text-[#e62b1e] transition-colors mb-8"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          {substep === "payment" ? "Back to details" : "Back to seats"}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
          <div>
            {paid ? (
              <>
                <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#6b6b6b] mb-4">Confirmation</p>
                <div className="max-w-lg border border-[#e0e0e0] rounded-sm p-6 bg-[#f9f9f9]">
                  <div className="inline-flex items-center gap-2 mb-3 px-2.5 py-1 rounded-full bg-[#0a0a0a]">
                    <span className="text-[0.55rem] font-bold tracking-[0.16em] uppercase text-[#e62b1e]">Test mode</span>
                  </div>
                  <p className="font-bold text-[#0a0a0a] mb-2">
                    {stripeConfigured ? "Payment received." : "Your details look good."}
                  </p>
                  <p className="text-sm text-[#555555] leading-relaxed">
                    {stripeConfigured
                      ? "In test mode no real charge is made. The final step (emailing a QR code per seat and reserving the seats) connects with the database next."
                      : "Once Stripe is connected, this step charges the card and emails your tickets."}{" "}
                    Your {selected.length} ticket{selected.length > 1 ? "s" : ""} would go to{" "}
                    <span className="font-semibold text-[#0a0a0a]">{email}</span>.
                  </p>
                </div>
              </>
            ) : substep === "payment" ? (
              <>
                <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#6b6b6b] mb-1">4 · Payment</p>
                <p className="text-xs text-[#6b6b6b] mb-4">Your seats are held while you finish checkout. A hold releases automatically after about 15 minutes.</p>
                <StripePayment
                  sessionId={sessionId}
                  seats={selected}
                  email={email}
                  names={names}
                  amount={total}
                  onSuccess={() => setPaid(true)}
                />
              </>
            ) : (
              <>
                <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#6b6b6b] mb-4">3 · Your details</p>
                <form onSubmit={(e) => { e.preventDefault(); submitDetails(); }}>
                  <div className="space-y-5 max-w-lg">
                    {selected.map((id, i) => (
                      <div key={id}>
                        <label htmlFor={`name-${id}`} className="block text-sm font-semibold text-[#0a0a0a] mb-1.5">
                          Ticket {i + 1} · Seat {seatLabel(id)} · full name
                        </label>
                        <input
                          id={`name-${id}`}
                          value={names[id] ?? ""}
                          onChange={(e) => { setNames((p) => ({ ...p, [id]: e.target.value })); setFormError(null); }}
                          placeholder="First and last name"
                          autoComplete="name"
                          aria-invalid={!!formError}
                          aria-describedby={formError ? "details-error" : undefined}
                          className="w-full px-4 py-3 text-sm rounded-sm border border-[#e0e0e0] outline-none focus:border-[#e62b1e] transition-colors"
                        />
                      </div>
                    ))}
                    <div>
                      <label htmlFor="purchaser-email" className="block text-sm font-semibold text-[#0a0a0a] mb-1.5">Email</label>
                      <input
                        id="purchaser-email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setFormError(null); }}
                        placeholder="you@email.com"
                        aria-invalid={!!formError}
                        aria-describedby={formError ? "details-error" : undefined}
                        className="w-full px-4 py-3 text-sm rounded-sm border border-[#e0e0e0] outline-none focus:border-[#e62b1e] transition-colors"
                      />
                      <p className="text-xs text-[#6b6b6b] mt-1.5">Your tickets, one QR code per seat, are sent here.</p>
                    </div>
                  </div>
                  {formError && <p id="details-error" className="mt-4 text-xs text-[#c9231a] font-semibold" role="alert">{formError}</p>}
                  <button
                    type="submit"
                    className="mt-7 inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#e62b1e] text-white font-bold text-sm rounded-sm hover:bg-[#c9231a] transition-colors"
                  >
                    {stripeConfigured ? "Continue to payment" : `Pay ${formatPrice(total)}`}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                  <p className="text-[0.65rem] text-[#6b6b6b] mt-3 leading-relaxed max-w-lg">
                    Secure card payment by Stripe. One order, up to {ticketConfig.maxPerOrder} tickets.
                  </p>
                </form>
              </>
            )}
          </div>

          <aside className="lg:sticky lg:top-24 h-fit">
            <OrderReview sessionId={sessionId} selected={selected} price={price} total={total} />
          </aside>
        </div>
      </div>
    );
  }

  // ── Steps 1 & 2: choose session + seats ──
  return (
    <div>
      <fieldset>
        <legend className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#6b6b6b] mb-4">
          1 · Choose a session
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-12">
          {ticketConfig.sessions.map((s) => {
            const active = sessionId === s.id;
            const info = summary[s.id];
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => pickSession(s.id)}
                aria-pressed={active}
                className={`text-left p-5 border rounded-sm transition-all duration-200 ${
                  active
                    ? "border-[#e62b1e] bg-[#fdeceb] ring-1 ring-[#e62b1e]"
                    : "border-[#e0e0e0] hover:border-[#0a0a0a] bg-white"
                }`}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-bold text-[#0a0a0a]">{s.name}</span>
                  <span className="font-extrabold text-[#e62b1e]">{formatPrice(s.price)}</span>
                </div>
                <p className="text-xs text-[#777777] mt-1">{s.detail}</p>
                {info && (
                  <p className="mt-2">
                    <SeatsLeft remaining={info.remaining} total={info.total} />
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </fieldset>

      {sessionId && (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#6b6b6b]">
                2 · Pick your seats (up to {ticketConfig.maxPerOrder})
              </p>
              {remaining !== null && <SeatsLeft remaining={remaining} total={totalSeats} />}
            </div>

            {soldOut ? (
              <WaitlistForm session={sessionId} sessionName={sessionById(sessionId).name} />
            ) : (
              <>
                <div className="flex flex-wrap gap-x-5 gap-y-2 mb-5">
                  <LegendDot className="bg-white border border-[#767676]" label="Available" />
                  <LegendDot className="bg-[#e62b1e]" label="Selected" />
                  <LegendDot className="bg-[#d0d0d0] border border-[#a8a8a8]" label="Taken" />
                </div>
                <div className="border border-[#e8e8e8] rounded-sm p-4 bg-[#fbfbfb]">
                  <SeatMap
                    sections={sampleSections}
                    soldSet={soldSet}
                    selectedSet={selectedSet}
                    maxReached={maxReached}
                    onToggle={toggleSeat}
                  />
                </div>
                <p className="text-xs text-[#6b6b6b] mt-3">
                  Modeled on the Gund Auditorium layout (Center section plus front wing seats). Scroll
                  sideways on the map if it runs off the screen.
                </p>
              </>
            )}
          </div>

          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="border border-[#e0e0e0] rounded-sm p-6 bg-white">
              <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#6b6b6b] mb-4">Your order</p>
              <p className="font-bold text-[#0a0a0a]">{sessionById(sessionId).name}</p>
              <p className="text-xs text-[#777777] mb-4">{sessionById(sessionId).detail}</p>

              {selected.length === 0 ? (
                <p className="text-sm text-[#6b6b6b] py-4 border-t border-[#f0f0f0]">
                  {soldOut ? "This session is sold out. Join the waitlist on the left." : `Select up to ${ticketConfig.maxPerOrder} seats to continue.`}
                </p>
              ) : (
                <ul className="border-t border-[#f0f0f0] divide-y divide-[#f0f0f0] mb-4">
                  {selected.map((id) => (
                    <li key={id} className="flex items-center justify-between py-2.5 text-sm">
                      <span className="text-[#0a0a0a] font-medium">Seat {seatLabel(id)}</span>
                      <button
                        type="button"
                        onClick={() => toggleSeat(id)}
                        className="text-[#6b6b6b] hover:text-[#e62b1e] text-xs font-semibold"
                        aria-label={`Remove seat ${seatLabel(id)}`}
                      >
                        {formatPrice(price)} · Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex items-center justify-between border-t border-[#e0e0e0] pt-4 mb-5">
                <span className="text-sm font-semibold text-[#0a0a0a]">Total</span>
                <span className="text-xl font-extrabold text-[#0a0a0a]">{formatPrice(total)}</span>
              </div>

              <button
                type="button"
                disabled={selected.length === 0}
                onClick={() => { setStep("details"); setSubstep("info"); }}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#e62b1e] text-white font-bold text-sm rounded-sm hover:bg-[#c9231a] transition-colors disabled:opacity-40"
              >
                Continue to checkout
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <p className="text-[0.65rem] text-[#6b6b6b] mt-3 leading-relaxed">
                Limit {ticketConfig.maxPerOrder} tickets per order. Seats are held for you at checkout.
              </p>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
