import { FadeIn } from "@/components/ui/FadeIn";
import Link from "next/link";
import { siteConfig } from "@/data/site";

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
              Student Speaker Contest
            </p>
            <h2
              id="cta-heading"
              className="text-white font-extrabold mb-6"
              style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
            >
              Any Cleveland-area high schooler can apply.
            </h2>
            <p className="text-white/80 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              No GPA requirement. No prior speaking experience. No extracurricular list to submit.
              Your application is evaluated entirely on the strength and clarity of your idea.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/apply"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#e62b1e] font-bold text-sm tracking-wide rounded-sm hover:bg-[#f0f0f0] transition-all duration-200 shadow-lg"
              >
                View the Application
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/40 text-white font-semibold text-sm tracking-wide rounded-sm hover:border-white hover:bg-white/10 transition-all duration-200"
              >
                Ask a Question
              </a>
            </div>

            <p className="text-white/50 text-xs mt-8">
              Deadline: May 11, 2026 at 11:59 PM &mdash; Applications to {siteConfig.email}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
