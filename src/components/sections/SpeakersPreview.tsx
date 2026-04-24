import Link from "next/link";
import { SpeakerCard } from "@/components/ui/SpeakerCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { speakers } from "@/data/speakers";

export function SpeakersPreview() {
  const previewSpeakers = speakers.slice(0, 4);

  return (
    <section className="bg-white py-20 md:py-28" aria-labelledby="speakers-preview-heading">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
            <div>
              <span className="inline-flex items-center gap-3 mb-4">
                <span className="inline-block w-8 h-0.5 bg-[#e62b1e]" aria-hidden="true" />
                <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#e62b1e]">
                  Speakers
                </span>
              </span>
              <h2
                id="speakers-preview-heading"
                className="font-extrabold text-[#0a0a0a]"
                style={{ fontSize: "clamp(1.875rem, 4vw, 3rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
              >
                Ten voices.
                <br />
                One stage.
              </h2>
            </div>
            <p className="text-[#555555] text-base leading-relaxed max-w-sm md:text-right">
              Five adult speakers. Five student speakers. No age qualifier, no asterisk.
              Speakers are announced as selections are finalized.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
          {previewSpeakers.map((speaker, i) => (
            <FadeIn key={speaker.id} delay={i * 0.08}>
              <SpeakerCard speaker={speaker} className="w-full" />
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div className="flex justify-center">
            <Link
              href="/speakers"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[#0a0a0a] text-[#0a0a0a] font-bold text-sm tracking-wide rounded-sm hover:bg-[#0a0a0a] hover:text-white transition-all duration-200"
            >
              View All Speakers
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
