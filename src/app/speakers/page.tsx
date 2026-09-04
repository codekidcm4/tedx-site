import type { Metadata } from "next";
import { SpeakerCard } from "@/components/ui/SpeakerCard";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";
import { CTASection } from "@/components/sections/CTASection";
import { adultSpeakers, studentSpeakers } from "@/data/speakers";
import { talkForSpeaker } from "@/data/talks";

export const metadata: Metadata = {
  title: "Speakers",
  description:
    "Meet the TEDxHuntingValley speakers. Six adult speakers and six student speakers who shared one stage on August 22, 2026. Every talk is now online.",
  alternates: { canonical: "/speakers" },
  openGraph: {
    title: "Speakers | TEDxHuntingValley",
    description:
      "Twelve voices, one stage, no age qualifier. Six adult speakers and six student speakers introduced the same way and held to the same standard on August 22, 2026.",
    url: "https://tedxhuntingvalley.com/speakers",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "TEDxHuntingValley speakers" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Speakers | TEDxHuntingValley",
    description: "Twelve voices, one stage, no age qualifier. Every talk is now online.",
    images: ["/og-image.jpg"],
  },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://tedxhuntingvalley.com" },
    { "@type": "ListItem", position: 2, name: "Speakers", item: "https://tedxhuntingvalley.com/speakers" },
  ],
};

export default function SpeakersPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
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
              Twelve voices. One stage. No asterisk.
            </h1>
            <p className="text-white/65 text-xl leading-relaxed max-w-2xl">
              Six adult speakers and six student speakers. Each one introduced the same way. Each one
              held to the same standard. On August 22, 2026, every one of them delivered.
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
                Six leaders from across Cleveland and beyond, who shared the same stage as our student speakers.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {adultSpeakers.map((speaker) => {
              const talk = talkForSpeaker(speaker.id);
              return (
                <StaggerItem key={speaker.id} className="h-full">
                  <SpeakerCard
                    speaker={speaker}
                    variant="full"
                    className="h-full"
                    watchHref={talk ? `/talks#${speaker.id}` : undefined}
                    watchDuration={talk?.duration}
                  />
                </StaggerItem>
              );
            })}
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
                  Student Speakers
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
                Six students from six schools across Greater Cleveland, selected through an open
                competition on the strength of the idea alone, and coached through the summer to the
                stage.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {studentSpeakers.map((speaker) => {
              const talk = talkForSpeaker(speaker.id);
              return (
                <StaggerItem key={speaker.id} className="h-full">
                  <SpeakerCard
                    speaker={speaker}
                    variant="full"
                    className="h-full"
                    watchHref={talk ? `/talks#${speaker.id}` : undefined}
                    watchDuration={talk?.duration}
                  />
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          <FadeIn delay={0.2}>
            <p className="mt-10 text-sm text-[#9a9a9a]">
              Thank you to every student across Greater Cleveland who applied to speak in 2026.
            </p>
          </FadeIn>
        </div>
      </section>

      <CTASection />
    </>
  );
}
