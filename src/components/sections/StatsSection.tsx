"use client";

import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";
import { globalStats, localStats } from "@/data/stats";

export function StatsSection() {
  return (
    <section className="bg-white py-20 md:py-28 overflow-hidden" aria-labelledby="stats-heading">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
        {/* The Cleveland gap highlight */}
        <FadeIn>
          <div className="mb-16 md:mb-20">
            <span className="inline-flex items-center gap-3 mb-6">
              <span className="inline-block w-8 h-0.5 bg-[#e62b1e]" aria-hidden="true" />
              <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#e62b1e]">
                Why this matters
              </span>
            </span>
            <h2
              id="stats-heading"
              className="font-extrabold text-[#0a0a0a] mb-6 max-w-3xl"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
            >
              Cleveland hasn&apos;t had an independent community TEDx in{" "}
              <span className="text-[#e62b1e]">over a decade.</span>
            </h2>
            <p className="text-[#555555] text-lg leading-relaxed max-w-2xl">
              The last one was June 2015. More than ten years passed with no public ideas platform
              of this kind in one of the Midwest&apos;s most idea-rich cities. Two high school juniors
              noticed, and decided to stop waiting.
            </p>
          </div>
        </FadeIn>

        {/* Local stats highlight */}
        <div className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#e0e0e0]">
            {localStats.map((stat, i) => (
              <div
                key={stat.label}
                className="bg-white p-8 md:p-10 flex flex-col justify-between group hover:bg-[#f9f9f9] transition-colors duration-200"
              >
                <div>
                  <div
                    className="font-extrabold text-[#0a0a0a] leading-none mb-2"
                    style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "-0.04em" }}
                    aria-label={`${stat.value}${stat.suffix} ${stat.label}`}
                  >
                    {stat.numericValue > 0 ? (
                      <>
                        <AnimatedCounter
                          value={stat.numericValue}
                          suffix={stat.suffix}
                          duration={1800 + i * 100}
                        />
                      </>
                    ) : (
                      <span className="text-[#e62b1e]">
                        {stat.value}
                        {stat.suffix}
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-[0.7rem] font-bold tracking-[0.1em] uppercase text-[#0a0a0a] mb-1">
                    {stat.label}
                  </p>
                  {stat.description && (
                    <p className="text-xs text-[#9a9a9a] leading-relaxed">{stat.description}</p>
                  )}
                </div>
                <div className="mt-4 w-6 h-0.5 bg-[#e62b1e] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>

        {/* Global TEDx stats */}
        <FadeIn>
          <div className="border-t border-[#e0e0e0] pt-16">
            <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#9a9a9a] mb-8">
              The platform behind every talk
            </p>
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {globalStats.map((stat, i) => (
                <StaggerItem key={stat.label}>
                  <div>
                    <div
                      className="font-extrabold text-[#0a0a0a] leading-none mb-1"
                      style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", letterSpacing: "-0.03em" }}
                    >
                      <AnimatedCounter
                        value={stat.numericValue}
                        suffix={stat.suffix}
                        duration={1600 + i * 150}
                      />
                    </div>
                    <p className="text-xs font-semibold text-[#555555] tracking-wide mt-2">
                      {stat.label}
                    </p>
                    {stat.description && (
                      <p className="text-[0.7rem] text-[#9a9a9a] mt-1 leading-relaxed">
                        {stat.description}
                      </p>
                    )}
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
