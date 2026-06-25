import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

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
          We couldn&apos;t find what you were looking for. The page may have moved, or the link may be
          out of date. Let&apos;s get you back on track.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#e62b1e] text-white font-bold text-sm tracking-wide rounded-sm hover:bg-[#c9231a] transition-colors duration-200"
          >
            Back to home
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href="/speakers"
            className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-white font-semibold text-sm tracking-wide rounded-sm hover:bg-white/10 transition-colors duration-200"
          >
            Meet the speakers
          </Link>
        </div>
      </div>
    </section>
  );
}
