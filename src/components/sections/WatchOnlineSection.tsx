import { FadeIn } from "@/components/ui/FadeIn";
import { NotifyForm } from "@/components/ui/NotifyForm";
import { siteConfig } from "@/data/site";

export function WatchOnlineSection() {
  return (
    <section id="watch" className="bg-white py-20 md:py-28 scroll-mt-20" aria-labelledby="watch-heading">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-start">
          <FadeIn direction="right">
            <div>
              <span className="inline-flex items-center gap-3 mb-6">
                <span className="inline-block w-8 h-0.5 bg-[#e62b1e]" aria-hidden="true" />
                <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#e62b1e]">
                  Watch online
                </span>
              </span>
              <h2
                id="watch-heading"
                className="font-extrabold text-[#0a0a0a] mb-6"
                style={{ fontSize: "clamp(1.875rem, 4vw, 3rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
              >
                Can&apos;t get a seat? Watch from anywhere.
              </h2>
              <p className="text-[#555555] text-base md:text-lg leading-relaxed mb-4 max-w-xl">
                Every talk from our stage is filmed and published to the TEDx YouTube channel after the event,
                where it reaches a global audience for free, forever.
              </p>
              <p className="text-[#555555] text-base md:text-lg leading-relaxed max-w-xl">
                Sign up and we will email you the moment the talks go live, so you never have to hunt for the link.
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="left" delay={0.1}>
            <div className="bg-[#f9f9f9] border border-[#e0e0e0] p-8 md:p-10">
              {/* Livestream: flips live automatically once siteConfig.livestreamUrl is set. */}
              {siteConfig.livestreamUrl ? (
                <a
                  href={siteConfig.livestreamUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 mb-8 bg-[#e62b1e] text-white text-sm font-bold rounded-sm hover:bg-[#c9231a] transition-colors duration-200"
                >
                  Watch the livestream
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              ) : (
                <div className="flex items-center gap-3 mb-8 p-4 bg-white border border-[#e0e0e0]">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#9a9a9a]" aria-hidden="true" />
                  <p className="text-[#555555] text-sm font-medium">Livestream details coming soon.</p>
                </div>
              )}

              <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#9a9a9a] mb-3">
                Notify me when the talks publish
              </p>
              <p className="text-[#555555] text-sm leading-relaxed mb-6">
                One email when the talks go up on YouTube. That is it.
              </p>
              <NotifyForm
                subject="TEDxHuntingValley watch online list"
                cta="Notify me"
                successMessage="You are on the list."
                configuredUrl={siteConfig.watchNotifyUrl}
                theme="light"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
