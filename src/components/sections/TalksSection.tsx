import Link from "next/link";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";
import { YouTubeEmbed } from "@/components/ui/YouTubeEmbed";
import { TalkCard } from "@/components/ui/TalkCard";
import { fullEvent, sessionOneTalks, sessionTwoTalks, youtubeChannelUrl } from "@/data/talks";

// Home-page watch hub: the complete recording up top, then every talk as a click-to-play card.
export function TalksSection() {
  return (
    <section id="watch" className="bg-[#0a0a0a] py-20 md:py-28 relative overflow-hidden scroll-mt-20" aria-labelledby="talks-heading">
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#e62b1e]" aria-hidden="true" />
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-12">
            <div>
              <span className="inline-flex items-center gap-3 mb-4">
                <span className="inline-block w-2 h-2 rounded-full bg-[#e62b1e] animate-pulse" aria-hidden="true" />
                <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#e62b1e]">
                  Now streaming
                </span>
              </span>
              <h2
                id="talks-heading"
                className="text-white font-extrabold"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
              >
                Every talk. <span className="text-[#e62b1e]">Free, forever.</span>
              </h2>
            </div>
            <p className="text-white/60 text-base leading-relaxed max-w-sm md:text-right">
              All twelve talks from August 22 are on the TEDxHuntingValley YouTube channel. Press play
              on any of them, or watch the whole day start to finish.
            </p>
          </div>
        </FadeIn>

        {/* The complete event */}
        <FadeIn delay={0.05}>
          <div className="mb-14 md:mb-20">
            <YouTubeEmbed
              videoId={fullEvent.videoId}
              title={fullEvent.title}
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="border border-[#222222]"
            />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4">
              <p className="text-white/80 text-sm">
                <span className="font-bold text-white">The complete event</span>
                <span className="text-white/40"> &middot; {fullEvent.duration}</span>
                <span className="text-white/60"> &middot; {fullEvent.description}</span>
              </p>
              <Link
                href="/talks"
                className="inline-flex items-center gap-1.5 text-[0.65rem] font-bold tracking-wide uppercase text-[#e62b1e] hover:underline flex-shrink-0"
              >
                Jump to any chapter
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </FadeIn>

        {/* Session 1 */}
        <FadeIn>
          <div className="flex items-baseline gap-4 mb-6">
            <h3 className="text-white font-extrabold text-xl md:text-2xl" style={{ letterSpacing: "-0.02em" }}>
              Session 1
            </h3>
            <span className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-white/40">Student speakers</span>
          </div>
        </FadeIn>
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-14">
          {sessionOneTalks.map((talk) => (
            <StaggerItem key={talk.videoId} className="h-full">
              <TalkCard talk={talk} className="h-full" />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Session 2 */}
        <FadeIn>
          <div className="flex items-baseline gap-4 mb-6">
            <h3 className="text-white font-extrabold text-xl md:text-2xl" style={{ letterSpacing: "-0.02em" }}>
              Session 2
            </h3>
            <span className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-white/40">Adult speakers</span>
          </div>
        </FadeIn>
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-12">
          {sessionTwoTalks.map((talk) => (
            <StaggerItem key={talk.videoId} className="h-full">
              <TalkCard talk={talk} className="h-full" />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/talks"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#e62b1e] text-white font-bold text-sm tracking-wide rounded-sm hover:bg-[#c9231a] transition-colors duration-200"
            >
              Browse all talks with summaries
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <a
              href={youtubeChannelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/30 text-white font-semibold text-sm tracking-wide rounded-sm hover:bg-white/10 transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
              </svg>
              Subscribe on YouTube
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
