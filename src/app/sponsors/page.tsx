import type { Metadata } from "next";
import { sponsorTiers, partners } from "@/data/sponsors";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "Become a community partner of TEDxHuntingValley. Support a not-for-profit, TED-licensed event bringing eleven voices to one stage on August 22, 2026.",
  alternates: { canonical: "/sponsors" },
};

export default function SponsorsPage() {
  return (
    <>
      <div className="bg-[#0a0a0a] pt-32 pb-16 md:pt-40 md:pb-20 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#e62b1e]" aria-hidden="true" />
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
          <span className="inline-flex items-center gap-3 mb-6">
            <span className="inline-block w-8 h-0.5 bg-[#e62b1e]" aria-hidden="true" />
            <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#e62b1e]">Partners</span>
          </span>
          <h1
            className="text-white font-extrabold mb-5 max-w-3xl"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.03em", lineHeight: 1.0 }}
          >
            Help put ideas on the stage.
          </h1>
          <p className="text-white/65 text-lg leading-relaxed max-w-2xl">
            TEDxHuntingValley is organized and run not for profit under license from TED. Community
            partners cover the real costs of the room, the production, and the students who take the
            stage, so tickets stay affordable and the ideas stay front and center.
          </p>
        </div>
      </div>

      {/* Tiers */}
      <section className="bg-white py-20 md:py-28" aria-labelledby="tiers-heading">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
          <div className="mb-10 md:mb-14">
            <span className="inline-flex items-center gap-3 mb-4">
              <span className="inline-block w-8 h-0.5 bg-[#e62b1e]" aria-hidden="true" />
              <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#e62b1e]">Ways to partner</span>
            </span>
            <h2 id="tiers-heading" className="font-extrabold text-[#0a0a0a]" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", letterSpacing: "-0.03em" }}>
              Partnership levels
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {sponsorTiers.map((tier) => (
              <div
                key={tier.id}
                className={`flex flex-col border rounded-sm p-6 ${tier.featured ? "border-[#e62b1e] ring-1 ring-[#e62b1e] bg-[#fdeceb]/40" : "border-[#e0e0e0] bg-white"}`}
              >
                {tier.featured && (
                  <span className="inline-block text-[0.55rem] font-bold tracking-[0.16em] uppercase text-[#e62b1e] mb-2">Most impact</span>
                )}
                <h3 className="font-bold text-[#0a0a0a] text-lg">{tier.name}</h3>
                <p className="text-2xl font-extrabold text-[#0a0a0a] mt-1">{tier.amount}</p>
                <p className="text-sm text-[#555555] mt-2 leading-relaxed">{tier.blurb}</p>
                <ul className="mt-4 space-y-2 flex-1">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex gap-2 text-sm text-[#333333]">
                      <span className="text-[#e62b1e] font-bold" aria-hidden="true">+</span>
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-xs text-[#9a9a9a] mt-6 max-w-2xl leading-relaxed">
            Reserved seats are within the venue&apos;s ~100-seat cap. Per TED rules, no partner presents
            or is the title of the event, and all support goes toward the cost of a not-for-profit event.
            In-kind partnerships (venue, catering, print, AV) are welcome too.
          </p>
        </div>
      </section>

      {/* Partners */}
      <section className="bg-[#f9f9f9] py-20 md:py-28" aria-labelledby="partners-heading">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
          <div className="mb-10">
            <span className="inline-flex items-center gap-3 mb-4">
              <span className="inline-block w-8 h-0.5 bg-[#e62b1e]" aria-hidden="true" />
              <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#e62b1e]">Our partners</span>
            </span>
            <h2 id="partners-heading" className="font-extrabold text-[#0a0a0a]" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", letterSpacing: "-0.03em" }}>
              Thank you
            </h2>
          </div>

          {partners.length === 0 ? (
            <p className="text-[#555555] max-w-xl leading-relaxed">
              Our first partners will be announced here soon. If you would like your organization to be
              among them, we would love to talk.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {partners.map((p) => (
                <div key={p.name} className="flex items-center justify-center border border-[#e0e0e0] bg-white rounded-sm p-6 h-24">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {p.logo ? <img src={p.logo} alt={p.name} className="max-h-12 max-w-full object-contain" /> : <span className="font-bold text-[#0a0a0a] text-center">{p.name}</span>}
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 border-t border-[#e0e0e0] pt-10">
            <h3 className="font-extrabold text-[#0a0a0a] text-xl mb-2">Become a partner</h3>
            <p className="text-[#555555] max-w-xl leading-relaxed mb-5">
              Tell us a little about your organization and the level you have in mind, and we will send
              a short partnership packet.
            </p>
            <a
              href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("TEDxHuntingValley partnership")}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#e62b1e] text-white font-bold text-sm rounded-sm hover:bg-[#c9231a] transition-colors"
            >
              Email us about partnering
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
