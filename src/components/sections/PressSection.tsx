import { FadeIn } from "@/components/ui/FadeIn";
import Link from "next/link";

const pressItems = [
  {
    outlet: "WFMJ",
    location: "Youngstown, OH",
    headline:
      "Mahoning Valley students sought for TED event in Cleveland area",
    quote:
      "Two University School juniors are organizing TEDxHuntingValley — the first independent, community-led TEDx in Cleveland since 2015.",
    url: "https://www.wfmj.com/news/local-news/mahoning-valley-students-sought-for-ted-event-in-cleveland-area/article_94320327-cafc-4cc7-9f00-0920b055a921.html",
    date: "April 2026",
  },
];

export function PressSection() {
  return (
    <section className="py-16 md:py-20 bg-[#f9f9f9]" aria-labelledby="press-heading">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16">
            {/* Label */}
            <div className="flex-shrink-0">
              <span className="inline-flex items-center gap-3">
                <span className="inline-block w-8 h-0.5 bg-[#e62b1e]" aria-hidden="true" />
                <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#9a9a9a]">
                  In the press
                </span>
              </span>
            </div>

            {/* Press items */}
            <div className="flex flex-col sm:flex-row gap-6 flex-1">
              {pressItems.map((item) => (
                <a
                  key={item.outlet}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex-1 bg-white border border-[#e0e0e0] hover:border-[#e62b1e]/40 hover:shadow-sm transition-all duration-200 p-6"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <span className="text-xs font-bold tracking-wider uppercase text-[#e62b1e]">
                        {item.outlet}
                      </span>
                      <span className="text-xs text-[#9a9a9a] ml-2">{item.location}</span>
                    </div>
                    <span className="text-xs text-[#9a9a9a] flex-shrink-0">{item.date}</span>
                  </div>
                  <p className="text-sm font-semibold text-[#0a0a0a] leading-snug mb-2 group-hover:text-[#e62b1e] transition-colors duration-200">
                    {item.headline}
                  </p>
                  <p className="text-xs text-[#555555] leading-relaxed line-clamp-2">
                    {item.quote}
                  </p>
                  <div className="flex items-center gap-1 mt-3 text-xs font-semibold text-[#e62b1e]">
                    Read article
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div className="mt-6 flex-shrink-0">
            <Link
              href="/press"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#e62b1e] hover:underline"
            >
              Full press kit &amp; media contacts
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
