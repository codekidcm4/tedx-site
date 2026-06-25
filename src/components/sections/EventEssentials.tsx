import { FadeIn } from "@/components/ui/FadeIn";
import { CountdownTimer } from "@/components/ui/CountdownTimer";
import { AddToCalendar } from "@/components/ui/AddToCalendar";
import { siteConfig } from "@/data/site";

function Detail({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <dt className="text-[0.6rem] font-bold tracking-[0.14em] uppercase text-[#9a9a9a] mb-0.5">{label}</dt>
      <dd className="text-[#0a0a0a] text-sm font-semibold whitespace-pre-line">{value}</dd>
    </div>
  );
}

export function EventEssentials() {
  return (
    <section className="bg-white py-16 md:py-24 border-b border-[#e8e8e8]" aria-labelledby="essentials-heading">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
        <FadeIn>
          <div className="flex items-center gap-3 mb-8">
            <span className="inline-block w-8 h-0.5 bg-[#e62b1e]" aria-hidden="true" />
            <span id="essentials-heading" className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#e62b1e]">
              Event essentials
            </span>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Left: the facts + calendar + countdown */}
          <FadeIn direction="right">
            <div>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-6 mb-8">
                <Detail label="Date" value="August 22, 2026" />
                <Detail label="Doors open" value={siteConfig.doorsOpen ?? "Time to be announced"} />
                <Detail label="Talks begin" value={siteConfig.startTime ?? "Time to be announced"} />
                <Detail label="Venue" value={`${siteConfig.venueName}\n${siteConfig.school}`} />
                <div className="col-span-2">
                  <Detail label="Address" value={`${siteConfig.streetAddress}\n${siteConfig.city}, ${siteConfig.state} ${siteConfig.zip}`} />
                </div>
              </dl>

              <div className="mb-10">
                <p className="text-[0.6rem] font-bold tracking-[0.14em] uppercase text-[#9a9a9a] mb-3">
                  Save the date
                </p>
                <AddToCalendar theme="light" />
              </div>

              <div>
                <p className="text-[0.6rem] font-bold tracking-[0.14em] uppercase text-[#9a9a9a] mb-3">
                  Countdown to August 22
                </p>
                <CountdownTimer targetDate={siteConfig.startDateTimeISO} variant="block" expiredMessage="Today is the day." />
              </div>
            </div>
          </FadeIn>

          {/* Right: map + directions/parking */}
          <FadeIn direction="left" delay={0.1}>
            <div>
              <div className="relative w-full aspect-[4/3] overflow-hidden border border-[#e0e0e0] bg-[#f0f0f0]">
                <iframe
                  src={siteConfig.mapEmbedUrl}
                  title="Map to Gund Auditorium, University School, Hunting Valley, Ohio"
                  className="absolute inset-0 w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ border: 0 }}
                />
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <a
                  href={siteConfig.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#e62b1e] hover:underline"
                >
                  Open in Google Maps
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
              <div className="mt-5 bg-[#f9f9f9] border border-[#e0e0e0] p-5">
                <p className="text-[0.6rem] font-bold tracking-[0.14em] uppercase text-[#9a9a9a] mb-2">
                  Directions & parking
                </p>
                <p className="text-[#555555] text-sm leading-relaxed">
                  Gund Auditorium sits on the University School campus in Hunting Valley, about a 30-minute drive
                  east of downtown Cleveland. Free on-site parking is planned on campus, with the exact lot and
                  entrance directions shared ahead of the event. Watch for volunteer and signage guidance to the
                  lot nearest Gund Auditorium on event day.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
