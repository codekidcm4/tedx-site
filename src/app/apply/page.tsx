import type { Metadata } from "next";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";
import { CountdownTimer } from "@/components/ui/CountdownTimer";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Apply to Speak",
  description:
    "Apply to be a student speaker at TEDxHuntingValley. Any Cleveland-area high school student can apply. No GPA or experience required. Deadline: May 11, 2026.",
};

const requirements = [
  {
    item: "Talk title",
    detail: "A clear, specific title for your proposed talk.",
  },
  {
    item: "200-word core idea summary",
    detail: "What is the idea? What does the audience need to understand, believe, or feel differently by the end?",
  },
  {
    item: "400-600 word talk excerpt",
    detail: "A section of your proposed talk, written the way you would actually say it on stage.",
  },
  {
    item: "One recommendation letter",
    detail: "From a non-related adult who can speak to your ability and the quality of your idea. Not a parent or guardian.",
  },
];

export default function ApplyPage() {
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
                Student Speaker Contest
              </span>
            </span>
            <h1
              className="text-white font-extrabold mb-6 max-w-3xl"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.03em", lineHeight: 1.0 }}
            >
              Apply to Speak
            </h1>
            <p className="text-white/65 text-xl leading-relaxed max-w-2xl">
              Any high school student in the greater Cleveland area can apply. No GPA requirement.
              No prior speaking experience. One thing gets judged: the strength of your idea.
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Deadline countdown banner */}
      <div className="bg-[#e62b1e] py-5">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-8">
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" aria-hidden="true" />
              <p className="text-white text-sm font-bold tracking-wide uppercase">
                Applications close in
              </p>
            </div>
            <CountdownTimer targetDate="2026-05-11T23:59:00" variant="banner" expiredMessage="Applications closed — May 11 deadline has passed." />
            <p className="text-white/70 text-xs sm:ml-auto flex-shrink-0">Hard deadline · No extensions</p>
          </div>
        </div>
      </div>

      {/* Application overview */}
      <section className="py-20 md:py-28 bg-white" aria-labelledby="application-overview">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
            <FadeIn direction="right">
              <div>
                <span className="inline-flex items-center gap-3 mb-6">
                  <span className="inline-block w-8 h-0.5 bg-[#e62b1e]" aria-hidden="true" />
                  <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#e62b1e]">
                    How to Apply
                  </span>
                </span>
                <h2
                  id="application-overview"
                  className="font-extrabold text-[#0a0a0a] mb-6"
                  style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
                >
                  Four things. One email.
                </h2>
                <p className="text-[#555555] leading-relaxed mb-8">
                  The Round 1 application has four parts. Send everything to{" "}
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-[#e62b1e] font-semibold hover:underline"
                  >
                    {siteConfig.email}
                  </a>{" "}
                  before May 11 at 11:59 PM. There is no portal, no form, and no fee. Your
                  application is evaluated entirely on the quality of what you submit.
                </p>

                <div className="space-y-px mb-8">
                  {requirements.map((req, i) => (
                    <div
                      key={i}
                      className="bg-[#f9f9f9] p-6 border-l-4 border-[#e0e0e0] hover:border-[#e62b1e] transition-colors duration-200"
                    >
                      <div className="flex items-start gap-4">
                        <span
                          className="flex-shrink-0 text-[#e62b1e] text-xs font-bold w-5 mt-0.5"
                          aria-hidden="true"
                        >
                          0{i + 1}
                        </span>
                        <div>
                          <p className="font-bold text-[#0a0a0a] text-sm mb-1">{req.item}</p>
                          <p className="text-[#9a9a9a] text-xs leading-relaxed">{req.detail}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <a
                  href={`mailto:${siteConfig.email}?subject=TEDxHuntingValley Student Speaker Application`}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#e62b1e] text-white font-bold text-sm rounded-sm hover:bg-[#c9231a] transition-colors duration-200 shadow-sm"
                >
                  Send Your Application
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.15}>
              <div>
                <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#9a9a9a] mb-6">
                  Eligibility
                </p>
                <div className="space-y-4 mb-10">
                  {[
                    { check: true, label: "Any high school student in the greater Cleveland area" },
                    { check: true, label: "Any grade level" },
                    { check: true, label: "Any school: public, private, or homeschool" },
                    { check: false, label: "No minimum GPA required" },
                    { check: false, label: "No prior speaking experience required" },
                    { check: false, label: "No extracurricular history required" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div
                        className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                          item.check ? "bg-[#e62b1e]" : "bg-[#0a0a0a]"
                        }`}
                        aria-hidden="true"
                      >
                        {item.check ? (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                      </div>
                      <p className="text-[#555555] text-sm leading-relaxed">{item.label}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-[#f9f9f9] border border-[#e0e0e0] p-6">
                  <h3 className="font-bold text-[#0a0a0a] text-sm mb-3">What happens after you apply</h3>
                  <div className="space-y-3">
                    {[
                      { phase: "Round 2 interviews", timing: "May 2026, at University School" },
                      { phase: "Final selection", timing: "Early June 2026" },
                      { phase: "Talk coaching begins", timing: "June 2026" },
                      { phase: "Coaching concludes", timing: "July 2026" },
                      { phase: "TEDxHuntingValley", timing: "August 22, 2026" },
                      { phase: "Talk published to YouTube", timing: "After August 22" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-xs py-2 border-b border-[#e0e0e0] last:border-0">
                        <span className="font-semibold text-[#0a0a0a]">{item.phase}</span>
                        <span className="text-[#9a9a9a]">{item.timing}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* PDF Embed */}
      <section className="py-20 md:py-28 bg-[#f9f9f9]" aria-labelledby="pdf-heading">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
          <FadeIn>
            <div className="mb-8">
              <span className="inline-flex items-center gap-3 mb-4">
                <span className="inline-block w-8 h-0.5 bg-[#e62b1e]" aria-hidden="true" />
                <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#e62b1e]">
                  Application Document
                </span>
              </span>
              <h2
                id="pdf-heading"
                className="font-extrabold text-[#0a0a0a] mb-4"
                style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
              >
                Full Application Guidelines
              </h2>
              <p className="text-[#555555] max-w-xl leading-relaxed mb-6">
                The full application document is below. Read it carefully before submitting. It
                contains everything you need to know about the process, judging criteria, and
                what we are looking for.
              </p>
              <a
                href="/application.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0a0a0a] text-white text-sm font-semibold rounded-sm hover:bg-[#222222] transition-colors duration-200"
                aria-label="Download application PDF"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download PDF
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="bg-white border border-[#e0e0e0] overflow-hidden">
              <iframe
                src="/application.pdf"
                className="w-full"
                style={{ height: "80vh", minHeight: "600px" }}
                title="TEDxHuntingValley Student Speaker Application"
                aria-label="Student speaker application PDF document"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 bg-white" aria-labelledby="faq-heading">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
          <FadeIn>
            <div className="mb-10">
              <span className="inline-flex items-center gap-3 mb-4">
                <span className="inline-block w-8 h-0.5 bg-[#e62b1e]" aria-hidden="true" />
                <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#e62b1e]">
                  FAQ
                </span>
              </span>
              <h2
                id="faq-heading"
                className="font-extrabold text-[#0a0a0a]"
                style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
              >
                Common questions
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className="max-w-3xl space-y-px">
            {[
              {
                q: "I have never given a speech before. Can I still apply?",
                a: "Yes. Prior speaking experience is not part of the evaluation. Round 1 is a written application. If you are selected, you spend June and July in a structured coaching program designed specifically to prepare you. By August 22, you will have had months of real preparation.",
              },
              {
                q: "Does my GPA matter?",
                a: "No. The application has no academic requirements. The only thing we evaluate is the quality and clarity of your idea.",
              },
              {
                q: "Do I have to go to University School to apply?",
                a: "No. Any high school student in the greater Cleveland area is eligible, regardless of which school they attend. Public, private, or homeschool.",
              },
              {
                q: "What is the talk about?",
                a: "Your talk must connect to the theme: \"The Invisible Engine: The Forces We Forget.\" The theme works across biology, economics, psychology, technology, and social systems. The question is: what hidden force do you want to make visible?",
              },
              {
                q: "Is there a fee to apply?",
                a: "No. The application is free.",
              },
              {
                q: "Who will read my application?",
                a: "Charlie Martin and Jack Nelson, the event's co-organizers, along with Dr. Tyler Yoder, the licensed organizer. Applications are evaluated on idea quality, clarity, and fit with the theme.",
              },
            ].map((item, i) => (
              <StaggerItem key={i}>
                <details className="group bg-[#f9f9f9] border border-[#e0e0e0]">
                  <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-[#0a0a0a] text-sm list-none hover:bg-[#f0f0f0] transition-colors duration-200">
                    {item.q}
                    <svg
                      className="w-4 h-4 flex-shrink-0 ml-4 text-[#9a9a9a] group-open:rotate-180 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-[#555555] text-sm leading-relaxed">{item.a}</p>
                  </div>
                </details>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn delay={0.3}>
            <div className="mt-12 p-8 bg-[#f9f9f9] border border-[#e0e0e0] max-w-3xl">
              <p className="text-[#555555] text-sm leading-relaxed">
                Have a question not covered here? Email us directly at{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-[#e62b1e] font-semibold hover:underline"
                >
                  {siteConfig.email}
                </a>
                . We respond to every message.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
