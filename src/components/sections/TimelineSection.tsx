import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";
import { keyDates } from "@/data/site";

export function TimelineSection() {
  return (
    <section className="bg-[#f9f9f9] py-20 md:py-28" aria-labelledby="timeline-heading">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
        <FadeIn>
          <div className="mb-12 md:mb-16">
            <span className="inline-flex items-center gap-3 mb-4">
              <span className="inline-block w-8 h-0.5 bg-[#e62b1e]" aria-hidden="true" />
              <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#e62b1e]">
                Key Dates
              </span>
            </span>
            <h2
              id="timeline-heading"
              className="font-extrabold text-[#0a0a0a] max-w-xl"
              style={{ fontSize: "clamp(1.875rem, 4vw, 3rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
            >
              The road to August 22
            </h2>
          </div>
        </FadeIn>

        <StaggerContainer>
          <div className="space-y-0">
            {keyDates.map((item, i) => {
              const isLast = i === keyDates.length - 1;
              return (
                <StaggerItem key={i}>
                  <div className="flex items-start gap-6 md:gap-10 pb-8 relative">
                    {/* Left: vertical line and dot */}
                    <div className="flex flex-col items-center flex-shrink-0 w-5 pt-1">
                      <div
                        className={`w-3 h-3 rounded-full border-2 flex-shrink-0 ${
                          isLast
                            ? "bg-[#e62b1e] border-[#e62b1e]"
                            : "bg-white border-[#e62b1e]"
                        }`}
                        aria-hidden="true"
                      />
                      {!isLast && (
                        <div className="w-px flex-1 bg-[#e0e0e0] mt-2 min-h-[2rem]" aria-hidden="true" />
                      )}
                    </div>

                    {/* Right: content */}
                    <div className="pb-2">
                      <p
                        className={`text-[0.65rem] font-bold tracking-[0.15em] uppercase mb-0.5 ${
                          isLast ? "text-[#e62b1e]" : "text-[#9a9a9a]"
                        }`}
                      >
                        {item.date}
                      </p>
                      <p
                        className={`font-semibold text-sm md:text-base ${
                          isLast ? "text-[#e62b1e]" : "text-[#0a0a0a]"
                        }`}
                      >
                        {item.label}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
