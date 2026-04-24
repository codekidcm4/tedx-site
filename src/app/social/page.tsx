import type { Metadata } from "next";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";
// StaggerContainer and StaggerItem used in "What we post" section below
import { CTASection } from "@/components/sections/CTASection";
import { BeholdFeed } from "@/components/ui/BeholdFeed";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Social",
  description:
    "Follow TEDxHuntingValley on Instagram and X for updates, speaker announcements, and behind-the-scenes coverage.",
};


export default function SocialPage() {
  return (
    <>
      {/* Page header */}
      <div className="bg-[#0a0a0a] pt-32 pb-16 md:pt-40 md:pb-20 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#e62b1e]" aria-hidden="true" />
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
          <FadeIn>
            <span className="inline-flex items-center gap-3 mb-6">
              <span className="inline-block w-8 h-0.5 bg-[#e62b1e]" aria-hidden="true" />
              <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#e62b1e]">
                Follow Along
              </span>
            </span>
            <h1
              className="text-white font-extrabold mb-6 max-w-3xl"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.0,
              }}
            >
              {siteConfig.handle}
            </h1>
            <p className="text-white/65 text-xl leading-relaxed max-w-2xl">
              Speaker announcements, behind-the-scenes coverage, and updates as August 22
              approaches. Follow us on Instagram and X.
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Follow buttons */}
      <div className="bg-white border-b border-[#e0e0e0] py-6">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
          <FadeIn>
            <div className="flex flex-wrap gap-4 items-center">
              <p className="text-sm text-[#555555] font-medium">Find us on:</p>
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0a0a0a] text-white text-sm font-semibold rounded-sm hover:bg-[#222222] transition-colors duration-200"
                aria-label="Follow TEDxHuntingValley on Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
                Instagram
              </a>
              <a
                href={siteConfig.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#e0e0e0] text-[#0a0a0a] text-sm font-semibold rounded-sm hover:bg-[#0a0a0a] hover:text-white hover:border-[#0a0a0a] transition-all duration-200"
                aria-label="Follow TEDxHuntingValley on X"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Follow on X
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#e0e0e0] text-[#0a0a0a] text-sm font-semibold rounded-sm hover:border-[#0a0a0a] transition-all duration-200"
                aria-label="Email TEDxHuntingValley"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email
              </a>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Live Instagram feed via Behold */}
      <section className="py-20 md:py-28 bg-white" aria-labelledby="feed-heading">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
          <FadeIn>
            <div className="mb-12">
              <span className="inline-flex items-center gap-3 mb-4">
                <span className="inline-block w-8 h-0.5 bg-[#e62b1e]" aria-hidden="true" />
                <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#e62b1e]">
                  Latest Posts
                </span>
              </span>
              <h2
                id="feed-heading"
                className="font-extrabold text-[#0a0a0a]"
                style={{
                  fontSize: "clamp(1.875rem, 4vw, 3rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                }}
              >
                From the feed
              </h2>
            </div>
          </FadeIn>
          <BeholdFeed feedId="n7Q4k8P6hLA35PL6L83y" />
        </div>
      </section>

      {/* What to expect */}
      <section className="py-20 md:py-28 bg-[#f9f9f9]" aria-labelledby="expect-heading">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
          <FadeIn>
            <div className="mb-10">
              <span className="inline-flex items-center gap-3 mb-4">
                <span className="inline-block w-8 h-0.5 bg-[#e62b1e]" aria-hidden="true" />
                <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#e62b1e]">
                  What we post
                </span>
              </span>
              <h2
                id="expect-heading"
                className="font-extrabold text-[#0a0a0a] max-w-2xl"
                style={{
                  fontSize: "clamp(1.875rem, 4vw, 3rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                }}
              >
                Follow the journey from application to stage
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#e0e0e0]">
            {[
              {
                phase: "Now through May 11",
                label: "Applications",
                description:
                  "Speaker application updates, theme breakdowns, and tips for what we look for in a strong talk idea.",
              },
              {
                phase: "June through July",
                label: "Coaching",
                description:
                  "Behind-the-scenes coverage of the talk development process. How ideas become talks, how talks become something worth watching.",
              },
              {
                phase: "August 22 and after",
                label: "The Event",
                description:
                  "Live coverage of event day, speaker announcements, and talk links as they are published to the TEDx YouTube channel.",
              },
            ].map((item, i) => (
              <StaggerItem key={i}>
                <div className="bg-white p-8 md:p-10 group hover:bg-[#f9f9f9] transition-colors duration-200">
                  <p className="text-[0.6rem] font-bold tracking-[0.15em] uppercase text-[#e62b1e] mb-3">
                    {item.phase}
                  </p>
                  <h3 className="font-bold text-[#0a0a0a] text-lg mb-3">{item.label}</h3>
                  <p className="text-[#555555] text-sm leading-relaxed">{item.description}</p>
                  <div
                    className="mt-5 w-6 h-0.5 bg-[#e62b1e] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    aria-hidden="true"
                  />
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <CTASection />
    </>
  );
}
