import Link from "next/link";
import type { Metadata } from "next";
import { youtubeChannelUrl } from "@/data/talks";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

// Old ticket, check-in, and application links all end up here; send people to the talks.
export default function NotFound() {
  return (
    <section className="bg-[#0a0a0a] min-h-[70vh] flex items-center relative overflow-hidden" aria-labelledby="notfound-heading">
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#e62b1e]" aria-hidden="true" />
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12 py-24 w-full">
        <span className="inline-flex items-center gap-3 mb-6">
          <span className="inline-block w-8 h-0.5 bg-[#e62b1e]" aria-hidden="true" />
          <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#e62b1e]">
            Error 404
          </span>
        </span>
        <h1
          id="notfound-heading"
          className="text-white font-extrabold mb-6 max-w-2xl"
          style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", letterSpacing: "-0.03em", lineHeight: 1.0 }}
        >
          This page took an <span className="text-[#e62b1e]">invisible</span> turn.
        </h1>
        <p className="text-white/65 text-lg leading-relaxed max-w-xl mb-10">
          TEDxHuntingValley 2026 has happened, and pages from before the event, like tickets and
          check-in, have been retired. The good news: every talk from the stage is online.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/talks"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#e62b1e] text-white font-bold text-sm tracking-wide rounded-sm hover:bg-[#c9231a] transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
            Watch the talks
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-white font-semibold text-sm tracking-wide rounded-sm hover:bg-white/10 transition-colors duration-200"
          >
            Back to home
          </Link>
          <a
            href={youtubeChannelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 text-white/70 font-semibold text-sm tracking-wide hover:text-white transition-colors duration-200"
          >
            YouTube channel &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
