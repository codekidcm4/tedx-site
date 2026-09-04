import { FadeIn } from "@/components/ui/FadeIn";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { youtubeChannelUrl } from "@/data/talks";

export function CTASection() {
  return (
    <section
      className="bg-[#e62b1e] py-20 md:py-28 relative overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Background noise texture */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")" }}
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12 relative">
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-white/60 mb-6">
              That&apos;s a wrap &middot; August 22, 2026 &middot; Gund Auditorium
            </p>
            <h2
              id="cta-heading"
              className="text-white font-extrabold mb-6"
              style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
            >
              Twelve ideas left the room. Now they&apos;re yours.
            </h2>
            <p className="text-white/80 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              Thank you to every speaker, every volunteer, and everyone who filled the seats. All
              twelve talks are free on YouTube. Watch one, then send it to the person it made you
              think of.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/talks"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#e62b1e] font-bold text-sm tracking-wide rounded-sm hover:bg-[#f0f0f0] transition-all duration-200 shadow-lg"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch the talks
              </Link>
              <a
                href={youtubeChannelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/40 text-white font-semibold text-sm tracking-wide rounded-sm hover:border-white hover:bg-white/10 transition-all duration-200"
              >
                Subscribe on YouTube
              </a>
            </div>

            <p className="text-white/70 text-xs mt-8">
              Press, partnerships, or a note for the organizers: {siteConfig.email}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
