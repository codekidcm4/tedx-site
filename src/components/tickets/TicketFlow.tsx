"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ticketConfig,
  sampleSections,
  sampleSold,
  formatPrice,
  sessionById,
} from "@/data/tickets";
import type { SessionId } from "@/data/tickets";
import { SeatMap } from "@/components/tickets/SeatMap";
import { verifyPresaleCode } from "@/app/tickets/actions";

function seatLabel(id: string): string {
  // id like "C-A12" -> "Center · A12" style short label
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
    const res = await verifyPresaleCode(code);
    if (res.ok) onUnlock();
    else setState("error");
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
        Seating at Gund Auditorium is intimate, so tickets open first to our pre-sale list. Enter your
        pre-sale code to choose your seats, or join the list below and we will send you a code.
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
        <p className="mt-3 text-xs text-[#e62b1e] font-semibold" role="alert">
          That code didn&apos;t work. Check it and try again.
        </p>
      )}
      <p className="mt-8 text-xs text-[#9a9a9a]">
        No code yet?{" "}
        <Link href="/#tickets" className="text-[#e62b1e] font-semibold hover:underline">Join the interest list</Link>{" "}
        and we&apos;ll send one when the pre-sale opens.
      </p>
    </div>
  );
}

function LegendDot({ className, label }: { className: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`inline-block w-3.5 h-3.5 rounded-[3px] ${className}`} aria-hidden="true" />
      <span className="text-xs text-[#555555]">{label}</span>
    </span>
  );
}

export function TicketFlow() {
  const [unlocked, setUnlocked] = useState(!ticketConfig.presaleActive);
  const [sessionId, setSessionId] = useState<SessionId | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const soldSet = useMemo(() => new Set(sessionId ? sampleSold[sessionId] : []), [sessionId]);
  const selectedSet = useMemo(() => new Set(selected), [selected]);
  const price = sessionId ? sessionById(sessionId).price : 0;
  const total = selected.length * price;
  const maxReached = selected.length >= ticketConfig.maxPerOrder;

  function pickSession(id: SessionId) {
    setSessionId(id);
    setSelected([]);
    setCheckoutOpen(false);
  }
  function toggleSeat(id: string) {
    setCheckoutOpen(false);
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((s) => s !== id)
        : prev.length < ticketConfig.maxPerOrder
        ? [...prev, id]
        : prev
    );
  }

  if (!unlocked) return <Gate onUnlock={() => setUnlocked(true)} />;

  return (
    <div>
      {/* Session selection */}
      <fieldset>
        <legend className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#9a9a9a] mb-4">
          1 · Choose a session
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-12">
          {ticketConfig.sessions.map((s) => {
            const active = sessionId === s.id;
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
              </button>
            );
          })}
        </div>
      </fieldset>

      {sessionId && (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
          {/* Seat map */}
          <div>
            <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#9a9a9a] mb-4">
              2 · Pick your seats (up to {ticketConfig.maxPerOrder})
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 mb-5">
              <LegendDot className="bg-white border border-[#c4c4c4]" label="Available" />
              <LegendDot className="bg-[#e62b1e]" label="Selected" />
              <LegendDot className="bg-[#dcdcdc]" label="Taken" />
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
            <p className="text-xs text-[#9a9a9a] mt-3">
              Sample layout shown. The exact Gund Auditorium seat map goes in once the seating chart
              is finalized. Scroll sideways on the map if it runs off the screen.
            </p>
          </div>

          {/* Order summary */}
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="border border-[#e0e0e0] rounded-sm p-6 bg-white">
              <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#9a9a9a] mb-4">
                Your order
              </p>
              <p className="font-bold text-[#0a0a0a]">{sessionById(sessionId).name}</p>
              <p className="text-xs text-[#777777] mb-4">{sessionById(sessionId).detail}</p>

              {selected.length === 0 ? (
                <p className="text-sm text-[#9a9a9a] py-4 border-t border-[#f0f0f0]">
                  Select up to {ticketConfig.maxPerOrder} seats to continue.
                </p>
              ) : (
                <ul className="border-t border-[#f0f0f0] divide-y divide-[#f0f0f0] mb-4">
                  {selected.map((id) => (
                    <li key={id} className="flex items-center justify-between py-2.5 text-sm">
                      <span className="text-[#0a0a0a] font-medium">Seat {seatLabel(id)}</span>
                      <button
                        type="button"
                        onClick={() => toggleSeat(id)}
                        className="text-[#9a9a9a] hover:text-[#e62b1e] text-xs font-semibold"
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
                onClick={() => setCheckoutOpen(true)}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#e62b1e] text-white font-bold text-sm rounded-sm hover:bg-[#c9231a] transition-colors disabled:opacity-40"
              >
                Continue to checkout
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <p className="text-[0.65rem] text-[#9a9a9a] mt-3 leading-relaxed">
                Limit {ticketConfig.maxPerOrder} tickets per order. Seats are held for you at checkout.
              </p>

              {checkoutOpen && (
                <div className="mt-5 p-4 rounded-sm bg-[#0a0a0a] text-white" role="status">
                  <p className="text-[0.6rem] font-bold tracking-[0.16em] uppercase text-[#e62b1e] mb-2">
                    Test mode
                  </p>
                  <p className="text-sm text-white/80 leading-relaxed">
                    This is where secure card payment (Stripe) drops in. Your {selected.length}-seat
                    order for {formatPrice(total)} would be charged here, then your tickets email with a
                    QR code for each seat. Payment goes live once Stripe is connected.
                  </p>
                </div>
              )}
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
