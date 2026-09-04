import Link from "next/link";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";
import { SpeakerHeadshot } from "@/components/ui/SpeakerHeadshot";
import { speakers } from "@/data/speakers";
import { talkForSpeaker } from "@/data/talks";

export function SpeakersPreview() {
  // The full twelve-voice lineup as a compact roster; each card jumps to that speaker's talk.
  return (
    <section className="bg-white py-20 md:py-28" aria-labelledby="speakers-preview-heading">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
            <div>
              <span className="inline-flex items-center gap-3 mb-4">
                <span className="inline-block w-8 h-0.5 bg-[#e62b1e]" aria-hidden="true" />
                <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#e62b1e]">
                  The Lineup
                </span>
              </span>
              <h2
                id="speakers-preview-heading"
                className="font-extrabold text-[#0a0a0a]"
                style={{ fontSize: "clamp(1.875rem, 4vw, 3rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
              >
                Twelve voices.
                <br />
                One stage.
              </h2>
            </div>
            <p className="text-[#555555] text-base leading-relaxed max-w-sm md:text-right">
              Six adult speakers. Six student speakers. No age qualifier, no asterisk. Every talk is
              now online.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 mb-12">
          {speakers.map((speaker) => {
            const talk = talkForSpeaker(speaker.id);
            return (
              <StaggerItem key={speaker.id} className="h-full">
                <Link
                  href={talk ? `/talks#${speaker.id}` : "/speakers"}
                  aria-label={talk ? `${speaker.name}: watch “${talk.title}”` : `${speaker.name}, view all speakers`}
                  className="group flex h-full flex-col items-center text-center gap-4 p-6 border border-[#e0e0e0] bg-white hover:border-[#e62b1e]/40 hover:shadow-md transition-all duration-300"
                >
                  <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-[#f0f0f0]">
                    <SpeakerHeadshot src={speaker.image} name={speaker.name} sizes="80px" initialsFontSize="1.35rem" />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <p className="font-bold text-[#0a0a0a] text-sm leading-snug">{speaker.name}</p>
                    <p className="text-[0.55rem] font-bold tracking-[0.14em] uppercase text-[#9a9a9a] mt-1.5">
                      {speaker.type === "student" ? "Student Speaker" : "Speaker"}
                    </p>
                    {talk && (
                      <p className="text-xs text-[#555555] italic leading-snug mt-3 line-clamp-2 group-hover:text-[#e62b1e] transition-colors duration-200">
                        &ldquo;{talk.title}&rdquo;
                      </p>
                    )}
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <FadeIn>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/talks"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0a0a0a] text-white font-bold text-sm tracking-wide rounded-sm hover:bg-[#e62b1e] transition-all duration-200"
            >
              Watch the talks
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/speakers"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[#0a0a0a] text-[#0a0a0a] font-bold text-sm tracking-wide rounded-sm hover:bg-[#0a0a0a] hover:text-white transition-all duration-200"
            >
              Read the bios
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
