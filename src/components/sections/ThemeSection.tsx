"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import Link from "next/link";

const themeExamples = [
  {
    title: "The gut-brain axis",
    description:
      "How the microbiome shapes mood, cognition, and identity in ways medicine is only beginning to map.",
  },
  {
    title: "Algorithmic redlining",
    description:
      "How recommendation systems replicate and amplify historical housing discrimination in ways their designers never intended.",
  },
  {
    title: "The compound effect of small advantages",
    description:
      "Why a 1% edge, repeated daily, produces outcomes that look like talent, and why it matters who starts with it.",
  },
  {
    title: "Institutional memory",
    description:
      "How organizations forget what they know, and the hidden mechanisms that determine what gets remembered and what gets erased.",
  },
];

export function ThemeSection() {
  return (
    <section
      className="bg-[#0a0a0a] py-20 md:py-28 overflow-hidden relative"
      aria-labelledby="theme-heading"
    >
      {/* Accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#e62b1e]" aria-hidden="true" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Left: theme intro */}
          <FadeIn direction="right">
            <div>
              <span className="inline-flex items-center gap-3 mb-6">
                <span className="inline-block w-8 h-0.5 bg-[#e62b1e]" aria-hidden="true" />
                <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#e62b1e]">
                  2026 Theme
                </span>
              </span>

              <h2
                id="theme-heading"
                className="text-white font-extrabold mb-6"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
              >
                The Invisible Engine:{" "}
                <br />
                <span className="text-[#e62b1e]">The Forces We Forget</span>
              </h2>

              <p className="text-white/65 text-lg leading-relaxed mb-6">
                The most powerful forces in our lives are the ones we never consciously
                acknowledge. The algorithm quietly narrowing what you think is possible. Gut
                bacteria influencing your mood in ways your brain does not control. Compound
                interest running silently behind every financial decision.
              </p>

              <p className="text-white/65 text-lg leading-relaxed mb-10">
                Something powerful is running in the background of everything. The talk&apos;s job
                is to make it visible.
              </p>

              <p className="text-white/40 text-sm leading-relaxed italic border-l-2 border-[#e62b1e]/50 pl-4">
                &ldquo;A high schooler&apos;s idea is held to the exact same standard as anyone
                else&apos;s.&rdquo;
                <span className="block mt-2 text-white/30 not-italic text-xs">
                  Charlie Martin, co-organizer
                </span>
              </p>
            </div>
          </FadeIn>

          {/* Right: example talks */}
          <FadeIn direction="left" delay={0.15}>
            <div>
              <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#9a9a9a] mb-6">
                Example talks this theme could generate
              </p>

              <div className="space-y-px">
                {themeExamples.map((example, i) => (
                  <div
                    key={i}
                    className="bg-[#111111] p-6 border-l-2 border-transparent hover:border-[#e62b1e] transition-all duration-300 group"
                  >
                    <h3 className="text-white font-semibold text-sm mb-2 group-hover:text-[#e62b1e] transition-colors duration-200">
                      {example.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed">
                      {example.description}
                    </p>
                  </div>
                ))}
              </div>

              <p className="text-white/30 text-xs mt-6 leading-relaxed">
                The theme is broad by design. It works across biology, economics, psychology,
                technology, and social systems. The connecting thread is always the same: what&apos;s
                the invisible force, and why does it matter that most people never see it?
              </p>

              <div className="mt-8">
                <Link
                  href="/apply"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-[#e62b1e] text-[#e62b1e] text-sm font-semibold rounded-sm hover:bg-[#e62b1e] hover:text-white transition-all duration-200"
                >
                  Have an idea? Apply to speak
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
