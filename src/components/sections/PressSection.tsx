import { FadeIn } from "@/components/ui/FadeIn";
import Link from "next/link";

export const pressItems = [
  {
    outlet: "Axios Cleveland",
    headline: "TEDx event is coming to Hunting Valley in August",
    quote:
      "It's the first fully licensed independent community TEDx in Cleveland in over a decade, and it's being organized by two high schoolers.",
    url: "https://www.axios.com/local/cleveland/2026/04/30/tedx-event-hunting-valley",
    date: "April 30, 2026",
  },
  {
    outlet: "Cleveland.com",
    headline:
      "Students revive Cleveland-area TEDx, open speaker applications to local teens",
    quote:
      "Two University School juniors are organizing TEDxHuntingValley — the first independent, community-led TEDx in Cleveland since 2015.",
    url: "https://www.cleveland.com/brunswicksun/2026/04/students-revive-cleveland-area-tedx-open-speaker-applications-to-local-teens.html",
    date: "April 2026",
  },
  {
    outlet: "Cleveland Jewish News",
    headline: "Applications deadline for TEDxHuntingValley: May 11",
    quote:
      "Two University School juniors are organizing TEDxHuntingValley, the first independent, community-led TED event in Cleveland since 2015.",
    url: "https://www.clevelandjewishnews.com/news/briefs/applications-deadline-for-tedxhunting-valley-may-11/article_5c7cdbbc-b807-48e9-8327-53f12fd29c3e.html",
    date: "April 2026",
  },
  {
    outlet: "WFMJ",
    headline: "Mahoning Valley students sought for TED event in Cleveland area",
    quote:
      "Two University School juniors are organizing TEDxHuntingValley — the first independent, community-led TEDx in Cleveland since 2015.",
    url: "https://www.wfmj.com/news/local-news/mahoning-valley-students-sought-for-ted-event-in-cleveland-area/article_94320327-cafc-4cc7-9f00-0920b055a921.html",
    date: "April 2026",
  },
];

export function PressSection() {
  return (
    <section className="py-16 md:py-20 bg-white border-y border-[#e8e8e8]" aria-labelledby="press-section-heading">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
        <FadeIn>
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-block w-8 h-0.5 bg-[#e62b1e]" aria-hidden="true" />
            <span id="press-section-heading" className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#9a9a9a]">
              In the press
            </span>
          </div>

          <div className="divide-y divide-[#e8e8e8]">
            {pressItems.map((item) => (
              <a
                key={item.outlet}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8 py-6 transition-colors duration-150"
              >
                <div className="md:col-span-3 flex md:flex-col md:justify-start gap-3 md:gap-1 items-baseline md:items-start">
                  <p className="text-[0.65rem] font-bold tracking-[0.14em] uppercase text-[#e62b1e] flex-shrink-0">
                    {item.outlet}
                  </p>
                  <p className="text-[0.65rem] text-[#b0b0b0]">{item.date}</p>
                </div>
                <div className="md:col-span-9">
                  <p className="text-sm font-semibold text-[#0a0a0a] leading-snug mb-1.5 group-hover:text-[#e62b1e] transition-colors duration-200">
                    {item.headline}
                  </p>
                  <p className="text-xs text-[#777777] leading-relaxed line-clamp-2 mb-3">
                    {item.quote}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[0.65rem] font-bold tracking-wide uppercase text-[#e62b1e]">
                    Read article
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </a>
            ))}
          </div>

          <div className="pt-2">
            <Link
              href="/press"
              className="inline-flex items-center gap-2 text-[0.65rem] font-bold tracking-wide uppercase text-[#9a9a9a] hover:text-[#e62b1e] transition-colors duration-200"
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
