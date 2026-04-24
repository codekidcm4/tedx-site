import type { Metadata } from "next";
import { SpeakerCard } from "@/components/ui/SpeakerCard";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";
import { CTASection } from "@/components/sections/CTASection";
import { adultSpeakers, studentSpeakers } from "@/data/speakers";

export const metadata: Metadata = {
  title: "Speakers",
  description:
    "Meet the TEDxHuntingValley speakers. Five adult speakers and five student speakers sharing the same stage on August 22, 2026.",
};

export default function SpeakersPage() {
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
                Speakers
              </span>
            </span>
            <h1
              className="text-white font-extrabold mb-6 max-w-3xl"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.03em", lineHeight: 1.0 }}
            >
              Ten voices. One stage. No asterisk.
            </h1>
            <p className="text-white/65 text-xl leading-relaxed max-w-2xl">
              Five adult speakers and five student speakers. Each one introduced the same way.
              Each one held to the same standard. Speakers are announced as selections are finalized.
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Equal stage callout */}
      <div className="bg-[#e62b1e] py-5">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
          <p className="text-white text-sm font-medium text-center">
            At TEDxHuntingValley, a student speaker is not introduced as a student. An idea is an idea.
          </p>
        </div>
      </div>

      {/* Adult speakers */}
      <section className="py-20 md:py-28 bg-white" aria-labelledby="adult-speakers-heading">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
          <FadeIn>
            <div className="mb-10 md:mb-14">
              <span className="inline-flex items-center gap-3 mb-4">
                <span className="inline-block w-8 h-0.5 bg-[#e62b1e]" aria-hidden="true" />
                <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#e62b1e]">
                  Speakers
                </span>
              </span>
              <h2
                id="adult-speakers-heading"
                className="font-extrabold text-[#0a0a0a]"
                style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
              >
                Adult Speakers
              </h2>
              <p className="text-[#555555] mt-3 max-w-xl leading-relaxed">
                Five speakers selected from across fields. Announcements coming as selections are confirmed.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-5">
            {adultSpeakers.map((speaker) => (
              <StaggerItem key={speaker.id}>
                <SpeakerCard speaker={speaker} className="w-full" />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Student speakers */}
      <section className="py-20 md:py-28 bg-[#f9f9f9]" aria-labelledby="student-speakers-heading">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
          <FadeIn>
            <div className="mb-10 md:mb-14">
              <span className="inline-flex items-center gap-3 mb-4">
                <span className="inline-block w-8 h-0.5 bg-[#e62b1e]" aria-hidden="true" />
                <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#e62b1e]">
                  Student Contest
                </span>
              </span>
              <h2
                id="student-speakers-heading"
                className="font-extrabold text-[#0a0a0a]"
                style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
              >
                Student Speakers
              </h2>
              <p className="text-[#555555] mt-3 max-w-xl leading-relaxed">
                Five student speakers selected from the greater Cleveland area through an open
                competition. Any high school student can apply. Selections announced in early June 2026.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-5">
            {studentSpeakers.map((speaker) => (
              <StaggerItem key={speaker.id}>
                <SpeakerCard speaker={speaker} className="w-full" />
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn delay={0.3}>
            <div className="mt-12 bg-white border border-[#e0e0e0] p-8 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="font-bold text-[#0a0a0a] text-lg mb-3">
                    The selection process
                  </h3>
                  <div className="space-y-3 text-[#555555] text-sm leading-relaxed">
                    <p>
                      Round 1 applications are evaluated entirely on the strength and clarity of
                      the idea. No GPA requirement, no prior speaking experience, no extracurricular
                      history.
                    </p>
                    <p>
                      Round 2 interviews take place at University School in May. Five speakers are
                      selected in early June and enter a structured talk development and coaching
                      program that runs through July.
                    </p>
                    <p>
                      By August 22, selected speakers have had months of real preparation, the same
                      kind of development process used for professional TEDx events worldwide.
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-[#e62b1e] text-white text-xs font-bold flex items-center justify-center">
                      1
                    </div>
                    <div>
                      <p className="font-semibold text-[#0a0a0a] text-sm">Round 1: Written Application</p>
                      <p className="text-[#9a9a9a] text-xs mt-0.5">Talk title, 200-word idea summary, 400-600 word excerpt, one recommendation letter</p>
                      <p className="text-[#e62b1e] text-xs font-bold mt-0.5">Deadline: May 11, 2026</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-[#0a0a0a] text-white text-xs font-bold flex items-center justify-center">
                      2
                    </div>
                    <div>
                      <p className="font-semibold text-[#0a0a0a] text-sm">Round 2: Interviews</p>
                      <p className="text-[#9a9a9a] text-xs mt-0.5">In-person at University School, May 2026</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-[#0a0a0a] text-white text-xs font-bold flex items-center justify-center">
                      3
                    </div>
                    <div>
                      <p className="font-semibold text-[#0a0a0a] text-sm">Selection and Coaching</p>
                      <p className="text-[#9a9a9a] text-xs mt-0.5">Five speakers selected early June, coaching through July</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-[#e62b1e] text-white text-xs font-bold flex items-center justify-center">
                      4
                    </div>
                    <div>
                      <p className="font-semibold text-[#0a0a0a] text-sm">August 22 &mdash; The Stage</p>
                      <p className="text-[#9a9a9a] text-xs mt-0.5">Gund Auditorium, University School</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <CTASection />
    </>
  );
}
