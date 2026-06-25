import { FadeIn } from "@/components/ui/FadeIn";
import { siteConfig } from "@/data/site";

const ArrowLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 text-sm font-bold tracking-wide text-[#e62b1e] hover:underline"
  >
    {children}
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  </a>
);

export function WhatIsTedx() {
  return (
    <section className="bg-[#0a0a0a] py-20 md:py-28 relative overflow-hidden" aria-labelledby="what-is-tedx-home">
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#e62b1e]" aria-hidden="true" />
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* About TEDx: official boilerplate */}
          <FadeIn direction="right">
            <div>
              <span className="inline-flex items-center gap-3 mb-6">
                <span className="inline-block w-8 h-0.5 bg-[#e62b1e]" aria-hidden="true" />
                <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#e62b1e]">
                  About TEDx
                </span>
              </span>
              <h2
                id="what-is-tedx-home"
                className="text-white font-extrabold mb-6"
                style={{ fontSize: "clamp(1.875rem, 4vw, 3rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
              >
                What is TEDx?
              </h2>
              <p className="text-white/65 text-base md:text-lg leading-relaxed mb-8">
                In the spirit of ideas worth spreading, TED has created a program called TEDx. TEDx is a
                program of local, self-organized events that bring people together to share a TED-like
                experience. Our event is called TEDxHuntingValley, where x = independently organized TED
                event. At our TEDxHuntingValley event, TEDTalks video and live speakers will combine to
                spark deep discussion and connection in a small group. The TED Conference provides general
                guidance for the TEDx program, but individual TEDx events, including ours, are self-organized.
              </p>
              <ArrowLink href={siteConfig.tedxProgramUrl}>Explore the TEDx program</ArrowLink>
            </div>
          </FadeIn>

          {/* About TED */}
          <FadeIn direction="left" delay={0.1}>
            <div className="bg-[#111111] border border-[#222222] p-8 md:p-10">
              <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-white/50 mb-5">
                About TED
              </p>
              <p className="text-white/65 text-sm md:text-base leading-relaxed mb-6">
                TED is a nonprofit organization devoted to ideas worth spreading, usually in the form of
                short, powerful talks (18 minutes or fewer) delivered by today&apos;s leading thinkers and doers. Many of these talks
                are given at TED conferences, intimate TED salons, and thousands of independently organized
                TEDx events around the world. Videos of these talks are made available, free, on TED.com and
                other platforms.
              </p>
              <ArrowLink href={siteConfig.tedUrl}>Visit TED.com</ArrowLink>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
