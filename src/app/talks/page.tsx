import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";
import { FullEventPlayer } from "@/components/ui/FullEventPlayer";
import { TalkCard } from "@/components/ui/TalkCard";
import { speakers } from "@/data/speakers";
import { siteConfig } from "@/data/site";
import {
  fullEvent,
  sessionOneTalks,
  sessionTwoTalks,
  talks,
  talksPublishedOn,
  thumbUrl,
  watchUrl,
  youtubeChannelUrl,
} from "@/data/talks";

export const metadata: Metadata = {
  title: "Watch the talks",
  description:
    "All twelve talks from TEDxHuntingValley 2026, plus the complete event recording. Six student speakers and six adult speakers on one stage at Gund Auditorium, University School, August 22, 2026.",
  alternates: { canonical: "/talks" },
  openGraph: {
    title: "Watch the talks | TEDxHuntingValley",
    description:
      "Every talk from The Invisible Engine: The Forces We Forget. Twelve voices, one stage, free on YouTube forever.",
    url: "https://tedxhuntingvalley.com/talks",
    type: "website",
    images: [{ url: thumbUrl(fullEvent.videoId), width: 1280, height: 720, alt: "TEDxHuntingValley 2026 on stage at Gund Auditorium" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Watch the talks | TEDxHuntingValley",
    description: "All twelve talks from TEDxHuntingValley 2026, free on YouTube.",
    images: [thumbUrl(fullEvent.videoId)],
  },
};

const speakerName = (id: string) => speakers.find((s) => s.id === id)?.name ?? id;

const videoJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "TEDxHuntingValley 2026 talks",
  itemListElement: [
    {
      "@type": "VideoObject",
      position: 0,
      name: fullEvent.title,
      description: fullEvent.description,
      thumbnailUrl: thumbUrl(fullEvent.videoId),
      uploadDate: talksPublishedOn,
      duration: fullEvent.durationISO,
      contentUrl: watchUrl(fullEvent.videoId),
      embedUrl: `https://www.youtube-nocookie.com/embed/${fullEvent.videoId}`,
    },
    ...talks.map((t) => ({
      "@type": "VideoObject",
      position: t.order,
      name: `${t.title} | ${speakerName(t.speakerId)} | TEDxHuntingValley`,
      description: t.blurb,
      thumbnailUrl: thumbUrl(t.videoId),
      uploadDate: talksPublishedOn,
      duration: t.durationISO,
      contentUrl: watchUrl(t.videoId),
      embedUrl: `https://www.youtube-nocookie.com/embed/${t.videoId}`,
    })),
  ],
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://tedxhuntingvalley.com" },
    { "@type": "ListItem", position: 2, name: "Talks", item: "https://tedxhuntingvalley.com/talks" },
  ],
};

export default function TalksPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      {/* Page header */}
      <div className="bg-[#0a0a0a] pt-32 pb-12 md:pt-40 md:pb-16 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#e62b1e]" aria-hidden="true" />
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
          <FadeIn>
            <span className="inline-flex items-center gap-3 mb-6">
              <span className="inline-block w-8 h-0.5 bg-[#e62b1e]" aria-hidden="true" />
              <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#e62b1e]">
                Watch
              </span>
            </span>
            <h1
              className="text-white font-extrabold mb-6 max-w-3xl"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.03em", lineHeight: 1.0 }}
            >
              Twelve talks. One afternoon. Now yours.
            </h1>
            <p className="text-white/65 text-xl leading-relaxed max-w-2xl">
              Everything from the stage at Gund Auditorium on August 22, 2026, published to the
              TEDxHuntingValley YouTube channel. Six student talks, six adult talks, and the complete
              recording with every introduction and Q&amp;A.
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Full event with chapters */}
      <section className="bg-[#0a0a0a] pb-20 md:pb-28" aria-labelledby="full-event-heading">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
          <FadeIn>
            <div className="flex flex-wrap items-baseline justify-between gap-3 mb-6">
              <h2 id="full-event-heading" className="text-white font-extrabold text-xl md:text-2xl" style={{ letterSpacing: "-0.02em" }}>
                The complete event
              </h2>
              <p className="text-white/40 text-xs">
                {fullEvent.duration} &middot; Pick a chapter to jump straight to it
              </p>
            </div>
            <FullEventPlayer />
          </FadeIn>
        </div>
      </section>

      {/* Session 1 */}
      <section className="py-20 md:py-28 bg-white" aria-labelledby="session-one-heading">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
          <FadeIn>
            <div className="mb-10 md:mb-12">
              <span className="inline-flex items-center gap-3 mb-4">
                <span className="inline-block w-8 h-0.5 bg-[#e62b1e]" aria-hidden="true" />
                <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#e62b1e]">
                  Session 1
                </span>
              </span>
              <h2
                id="session-one-heading"
                className="font-extrabold text-[#0a0a0a]"
                style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
              >
                The student speakers
              </h2>
              <p className="text-[#555555] mt-3 max-w-xl leading-relaxed">
                Six students from six schools across Greater Cleveland, selected through an open
                competition on the strength of the idea alone, and introduced exactly the way every
                adult was.
              </p>
            </div>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {sessionOneTalks.map((talk) => (
              <StaggerItem key={talk.videoId} className="h-full">
                <TalkCard talk={talk} showBlurb className="h-full" />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Session 2 */}
      <section className="py-20 md:py-28 bg-[#f9f9f9]" aria-labelledby="session-two-heading">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
          <FadeIn>
            <div className="mb-10 md:mb-12">
              <span className="inline-flex items-center gap-3 mb-4">
                <span className="inline-block w-8 h-0.5 bg-[#e62b1e]" aria-hidden="true" />
                <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#e62b1e]">
                  Session 2
                </span>
              </span>
              <h2
                id="session-two-heading"
                className="font-extrabold text-[#0a0a0a]"
                style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
              >
                The adult speakers
              </h2>
              <p className="text-[#555555] mt-3 max-w-xl leading-relaxed">
                Six leaders from Cleveland sports, law, business, hospitality, and the port, sharing
                the same stage and the same standard as the students who went first.
              </p>
            </div>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {sessionTwoTalks.map((talk) => (
              <StaggerItem key={talk.videoId} className="h-full">
                <TalkCard talk={talk} showBlurb className="h-full" />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Share / subscribe */}
      <section className="py-20 md:py-28 bg-[#e62b1e] relative overflow-hidden" aria-labelledby="share-heading">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12 relative">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-white/60 mb-6">
                Ideas worth spreading
              </p>
              <h2
                id="share-heading"
                className="text-white font-extrabold mb-6"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
              >
                The best thing you can do with a good idea is pass it on.
              </h2>
              <p className="text-white/80 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
                Every one of these talks is free to watch and share. Send one to the person it made
                you think of, and subscribe so you never miss what comes next.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={youtubeChannelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#e62b1e] font-bold text-sm tracking-wide rounded-sm hover:bg-[#f0f0f0] transition-all duration-200 shadow-lg"
                >
                  Subscribe on YouTube
                </a>
                <Link
                  href="/speakers"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/40 text-white font-semibold text-sm tracking-wide rounded-sm hover:border-white hover:bg-white/10 transition-all duration-200"
                >
                  Meet the speakers
                </Link>
              </div>
              <p className="text-white/70 text-xs mt-8">
                Questions, press, or a speaker you would like to reach? {siteConfig.email}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
