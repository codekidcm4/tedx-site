import Link from "next/link";

// Outlets that have covered the event. The detailed press cards live lower on the page and on
// /press; this top-of-page strip is about instant credibility for a first-time visitor.
const outlets = [
  "Cleveland.com",
  "WKYC 3News",
  "Axios Cleveland",
  "Signal Cleveland",
  "Akron Beacon Journal",
  "Canton Repository",
  "Cleveland Jewish News",
  "WFMJ",
];

export function MediaBar() {
  return (
    <section className="bg-white border-b border-[#e8e8e8]" aria-label="Press coverage">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12 py-6">
        <Link
          href="/press"
          className="group flex flex-col sm:flex-row sm:items-center gap-x-8 gap-y-3"
          aria-label={`As seen in ${outlets.slice(0, -1).join(", ")}, and ${outlets[outlets.length - 1]}. View press coverage.`}
        >
          <span className="text-[0.6rem] font-bold tracking-[0.18em] uppercase text-[#9a9a9a] flex-shrink-0">
            As seen in
          </span>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {outlets.map((outlet) => (
              <span
                key={outlet}
                className="text-sm font-bold tracking-tight text-[#555555] group-hover:text-[#0a0a0a] transition-colors duration-200"
              >
                {outlet}
              </span>
            ))}
            <span className="inline-flex items-center gap-1 text-[0.6rem] font-bold tracking-wide uppercase text-[#e62b1e]">
              Read the coverage
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
