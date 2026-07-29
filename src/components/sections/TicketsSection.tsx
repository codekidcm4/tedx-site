import { FadeIn } from "@/components/ui/FadeIn";
import { NotifyForm } from "@/components/ui/NotifyForm";
import { siteConfig } from "@/data/site";
import Link from "next/link";

export function TicketsSection() {
  const liveUrl = siteConfig.ticketsUrl ?? siteConfig.interestFormUrl;
  const cta = siteConfig.ticketsUrl ? "Get tickets" : "Notify me";

  return (
    <section id="tickets" className="bg-[#0a0a0a] py-20 md:py-28 relative overflow-hidden scroll-mt-20" aria-labelledby="tickets-heading">
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#e62b1e]" aria-hidden="true" />
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <FadeIn direction="right">
            <div>
              <span className="inline-flex items-center gap-3 mb-6">
                <span className="inline-block w-2 h-2 rounded-full bg-[#e62b1e] animate-pulse" aria-hidden="true" />
                <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#e62b1e]">
                  Tickets {siteConfig.ticketsUrl ? "are live" : "coming soon"}
                </span>
              </span>
              <h2
                id="tickets-heading"
                className="text-white font-extrabold mb-6"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
              >
                Seating is intimate. <span className="text-[#e62b1e]">Be first in line.</span>
              </h2>
              <p className="text-white/65 text-base md:text-lg leading-relaxed mb-4 max-w-xl">
                Gund Auditorium is intentionally small, and TED licensing keeps the room that way. Demand
                will outpace the seats available.
              </p>
              <p className="text-white/65 text-base md:text-lg leading-relaxed max-w-xl">
                {siteConfig.ticketsUrl
                  ? "Seats are released in limited batches. Grab yours below before they are gone."
                  : "Join the interest list and we will alert you the moment seats are released, before they go public."}
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="left" delay={0.1}>
            <div className="bg-[#111111] border border-[#222222] p-8 md:p-10">
              <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-white/50 mb-3">
                {siteConfig.ticketsUrl ? "Reserve your seat" : "Join the seat interest list"}
              </p>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                {siteConfig.ticketsUrl
                  ? "One tap to the box office."
                  : "Drop your email and you will be the first to hear when tickets go live. No spam, just one heads-up when seats open."}
              </p>
              <NotifyForm
                subject="TEDxHuntingValley seat interest list"
                cta={cta}
                successMessage="You are on the list."
                configuredUrl={liveUrl}
                theme="dark"
              />
              <div className="mt-6 pt-6 border-t border-[#222222]">
                <Link
                  href="/tickets"
                  className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-[#e62b1e] transition-colors duration-200"
                >
                  See the seat map and choose your seats
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
