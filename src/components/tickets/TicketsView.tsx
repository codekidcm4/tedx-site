"use client";

import Link from "next/link";
import { TicketFlow } from "@/components/tickets/TicketFlow";
import { useEventPhase } from "@/lib/eventPhaseClient";
import { siteConfig } from "@/data/site";

// The whole tickets page, phase-aware. Before/at the event it shows the seat-picking flow; once the
// event has passed it flips to a closed / watch-the-talks state (no code change needed on the day;
// set NEXT_PUBLIC_EVENT_PHASE=post to lock it immediately).
export function TicketsView() {
  const phase = useEventPhase();
  const isPost = phase === "post";

  return (
    <>
      <div className="bg-[#0a0a0a] pt-32 pb-14 md:pt-40 md:pb-16 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#e62b1e]" aria-hidden="true" />
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
          <span className="inline-flex items-center gap-3 mb-6">
            <span className="inline-block w-8 h-0.5 bg-[#e62b1e]" aria-hidden="true" />
            <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#e62b1e]">
              {isPost ? "Thank you" : "Tickets"}
            </span>
          </span>
          <h1
            className="text-white font-extrabold mb-5 max-w-3xl"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.03em", lineHeight: 1.0 }}
          >
            {isPost ? "That's a wrap." : "Reserve your seat."}
          </h1>
          <p className="text-white/65 text-lg leading-relaxed max-w-2xl">
            {isPost
              ? "TEDxHuntingValley 2026 has ended. Thank you to everyone who joined us at Gund Auditorium."
              : `August 22, 2026 at ${siteConfig.venueName}, ${siteConfig.school}. Two sessions, intimate seating, twelve voices on one stage.`}
          </p>
        </div>
      </div>

      <section className="bg-white py-16 md:py-24" aria-label="Ticket selection">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
          {isPost ? (
            <div className="max-w-lg">
              <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#6b6b6b] mb-4">Tickets are closed</p>
              <p className="text-[#333333] leading-relaxed mb-6">
                Every talk will be published to the TEDx YouTube channel. In the meantime, meet the
                speakers who took the stage, or explore the press and media coverage.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/speakers" className="inline-flex items-center gap-2 px-6 py-3 bg-[#e62b1e] text-white font-bold text-sm rounded-sm hover:bg-[#c9231a] transition-colors">
                  Meet the speakers
                </Link>
                <Link href="/media" className="inline-flex items-center gap-2 px-6 py-3 border border-[#e0e0e0] text-[#0a0a0a] font-semibold text-sm rounded-sm hover:border-[#0a0a0a] transition-colors">
                  Watch &amp; media
                </Link>
              </div>
            </div>
          ) : (
            <TicketFlow />
          )}
        </div>
      </section>
    </>
  );
}
