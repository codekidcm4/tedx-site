import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";
import { CountdownTimer } from "@/components/ui/CountdownTimer";
import Link from "next/link";
import { siteConfig } from "@/data/site";

const requirements = [
  {
    item: "Talk title",
    detail: "A clear, specific title for your proposed talk.",
  },
  {
    item: "200-word core idea summary",
    detail:
      "What is the idea? What does the audience need to understand, believe, or feel differently by the end?",
  },
  {
    item: "400-600 word talk excerpt",
    detail: "A section of your proposed talk, written the way you would actually say it on stage.",
  },
  {
    item: "One recommendation letter",
    detail:
      "From a non-related adult who can speak to your ability and the quality of your idea. Not a parent or guardian.",
  },
];

export function HomeApplySection() {
  return (
    <section
      id="apply-now"
      className="bg-[#0a0a0a] relative overflow-hidden"
      aria-labelledby="home-apply-heading"
    >
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#e62b1e]" aria-hidden="true" />

      {/* Rolling deadline banner */}
      <div className="bg-[#e62b1e] py-5">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-8">
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" aria-hidden="true" />
              <p className="text-white text-sm font-bold tracking-wide uppercase">
                Rolling deadline closes in
              </p>
            </div>
            <CountdownTimer
              targetDate="2026-05-25T23:59:00"
              variant="banner"
              expiredMessage="Applications closed. The May 25 rolling deadline has passed."
            />
            <p className="text-white/80 text-xs sm:ml-auto flex-shrink-0">
              Rolling reviews &middot; Apply any time before close
            </p>
          </div>
        </div>
      </div>

      {/* Apply inline */}
      <div className="py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-start">
            <FadeIn direction="right">
              <div>
                <span className="inline-flex items-center gap-3 mb-6">
                  <span className="inline-block w-8 h-0.5 bg-[#e62b1e]" aria-hidden="true" />
                  <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#e62b1e]">
                    Open Application
                  </span>
                </span>
                <h2
                  id="home-apply-heading"
                  className="text-white font-extrabold mb-6"
                  style={{
                    fontSize: "clamp(1.875rem, 4vw, 3rem)",
                    letterSpacing: "-0.03em",
                    lineHeight: 1.05,
                  }}
                >
                  Four things. One email. Apply right here.
                </h2>
                <p className="text-white/65 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
                  Any high school student in the greater Cleveland area can apply. No GPA, no
                  prior speaking experience, no portal, no fee. Send everything to{" "}
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-[#e62b1e] font-semibold hover:underline"
                  >
                    {siteConfig.email}
                  </a>{" "}
                  any time before May 25 at 11:59 PM. Reviews are rolling, so earlier
                  submissions get reviewed earlier.
                </p>

                <div className="flex flex-wrap gap-4">
                  <a
                    href={`mailto:${siteConfig.email}?subject=TEDxHuntingValley Student Speaker Application`}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-[#e62b1e] text-white font-bold text-sm rounded-sm hover:bg-[#c9231a] transition-colors duration-200 shadow-sm"
                  >
                    Send Your Application
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                  <a
                    href="/application.pdf"
                    download
                    className="inline-flex items-center gap-2 px-6 py-4 border border-white/30 text-white text-sm font-semibold rounded-sm hover:bg-white/10 transition-colors duration-200"
                    aria-label="Download the full application packet PDF"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Download PDF
                  </a>
                  <Link
                    href="/apply"
                    className="inline-flex items-center gap-2 px-6 py-4 text-white/70 text-sm font-semibold hover:text-white transition-colors duration-200"
                  >
                    Full guidelines
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.15}>
              <div>
                <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-white/50 mb-6">
                  What to send
                </p>
                <StaggerContainer className="space-y-px">
                  {requirements.map((req, i) => (
                    <StaggerItem key={i}>
                      <div className="bg-[#111111] p-6 border-l-4 border-[#222222] hover:border-[#e62b1e] transition-colors duration-200">
                        <div className="flex items-start gap-4">
                          <span
                            className="flex-shrink-0 text-[#e62b1e] text-xs font-bold w-5 mt-0.5"
                            aria-hidden="true"
                          >
                            0{i + 1}
                          </span>
                          <div>
                            <p className="font-bold text-white text-sm mb-1">{req.item}</p>
                            <p className="text-white/60 text-xs leading-relaxed">{req.detail}</p>
                          </div>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>

                <p className="text-white/50 text-xs mt-6 leading-relaxed">
                  Theme: &ldquo;The Invisible Engine: The Forces We Forget.&rdquo; The bar has not
                  moved. The window did.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
