import { FadeIn } from "@/components/ui/FadeIn";
import Link from "next/link";
import { speakers } from "@/data/speakers";
import { talks } from "@/data/talks";

export function ThemeSection() {
  const nameOf = (id: string) => speakers.find((s) => s.id === id)?.name ?? id;

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
                The theme came from one question: what is your why? Nobody ever answers with the
                trophy, the title, or the money. It is always something you would never see from the
                outside.
              </p>

              <p className="text-white/65 text-lg leading-relaxed mb-10">
                Twelve speakers took that question somewhere different: a lawn, a port, a prison
                kitchen, a gold-medal game, a gerrymandered map, six hundred letters. Something
                powerful was running in the background of every one of them. The talk&apos;s job was
                to make it visible.
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

          {/* Right: the twelve talks */}
          <FadeIn direction="left" delay={0.15}>
            <div>
              <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#9a9a9a] mb-6">
                Twelve talks, one theme
              </p>

              <ol className="space-y-px">
                {talks.map((talk) => (
                  <li key={talk.videoId}>
                    <Link
                      href={`/talks#${talk.speakerId}`}
                      className="flex items-baseline gap-4 bg-[#111111] px-5 py-4 border-l-2 border-transparent hover:border-[#e62b1e] transition-all duration-300 group"
                    >
                      <span className="text-[0.6rem] font-bold tabular-nums text-white/30 w-5 flex-shrink-0">
                        {String(talk.order).padStart(2, "0")}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-white font-semibold text-sm leading-snug group-hover:text-[#e62b1e] transition-colors duration-200">
                          {talk.title}
                        </span>
                        <span className="block text-white/45 text-xs mt-0.5">{nameOf(talk.speakerId)}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>

              <div className="mt-8">
                <Link
                  href="/talks"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-[#e62b1e] text-[#e62b1e] text-sm font-semibold rounded-sm hover:bg-[#e62b1e] hover:text-white transition-all duration-200"
                >
                  Watch all twelve
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
