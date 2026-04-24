import type { Metadata } from "next";
import { FadeIn } from "@/components/ui/FadeIn";
import { siteConfig } from "@/data/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Media",
  description:
    "Press resources, media kit, and event coverage for TEDxHuntingValley. Talks published to the TEDx YouTube channel after August 22, 2026.",
};

export default function MediaPage() {
  return (
    <>
      {/* Page header */}
      <div className="bg-[#0a0a0a] pt-32 pb-16 md:pt-40 md:pb-20 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#e62b1e]" aria-hidden="true" />
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
          <FadeIn>
            <span className="inline-flex items-center gap-3 mb-6">
              <span className="inline-block w-8 h-0.5 bg-[#e62b1e]" aria-hidden="true" />
              <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#e62b1e]">
                Media
              </span>
            </span>
            <h1
              className="text-white font-extrabold mb-6 max-w-3xl"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.03em", lineHeight: 1.0 }}
            >
              Press and Media
            </h1>
            <p className="text-white/65 text-xl leading-relaxed max-w-2xl">
              Resources for journalists, press, and anyone covering TEDxHuntingValley. Event talks
              will be published to the TEDx YouTube channel after August 22, 2026.
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Coming soon / TBD */}
      <section className="py-20 md:py-28 bg-white" aria-labelledby="media-heading">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-start">
            <FadeIn direction="right">
              <div>
                <span className="inline-flex items-center gap-3 mb-6">
                  <span className="inline-block w-8 h-0.5 bg-[#e62b1e]" aria-hidden="true" />
                  <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#e62b1e]">
                    Event Coverage
                  </span>
                </span>
                <h2
                  id="media-heading"
                  className="font-extrabold text-[#0a0a0a] mb-6"
                  style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
                >
                  Talks coming after August 22
                </h2>
                <div className="space-y-5 text-[#555555] leading-relaxed">
                  <p>
                    Every talk from TEDxHuntingValley will be filmed and published to the TEDx
                    YouTube channel after the event. The channel has over 44 million subscribers
                    and more than 8 billion total views across 241,000 published talks.
                  </p>
                  <p>
                    Event photography will also be released after August 22. Press credentials for
                    event day coverage are available. Contact us to request access.
                  </p>
                </div>

                <div className="mt-8 p-6 bg-[#f9f9f9] border border-[#e0e0e0]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-2 h-2 bg-[#9a9a9a] rounded-full" aria-hidden="true" />
                    <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#9a9a9a]">
                      Media status
                    </p>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: "Talk recordings", status: "Available after August 22, 2026" },
                      { label: "Event photography", status: "Available after August 22, 2026" },
                      { label: "Speaker bios and summaries", status: "Available in early June 2026" },
                      { label: "Press credentials", status: "Contact us to request" },
                      { label: "Organizer interviews", status: "Available now" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between text-xs py-2 border-b border-[#e0e0e0] last:border-0"
                      >
                        <span className="font-semibold text-[#0a0a0a]">{item.label}</span>
                        <span className="text-[#9a9a9a]">{item.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.15}>
              <div>
                <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#9a9a9a] mb-6">
                  Press contact
                </p>
                <div className="bg-[#f9f9f9] border border-[#e0e0e0] p-8 mb-8">
                  <p className="font-bold text-[#0a0a0a] text-lg mb-1">Charlie Martin and Jack Nelson</p>
                  <p className="text-[#e62b1e] text-xs font-bold tracking-wider uppercase mb-4">
                    Co-Organizers, TEDxHuntingValley
                  </p>
                  <div className="space-y-3 text-sm">
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="flex items-center gap-2 text-[#555555] hover:text-[#e62b1e] transition-colors duration-200"
                    >
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {siteConfig.email}
                    </a>
                    <a
                      href={siteConfig.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[#555555] hover:text-[#e62b1e] transition-colors duration-200"
                    >
                      <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      </svg>
                      {siteConfig.handle}
                    </a>
                  </div>
                </div>

                <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#9a9a9a] mb-4">
                  What we can provide
                </p>
                <ul className="space-y-2.5">
                  {[
                    "Interviews with Charlie Martin and Jack Nelson (phone, email, or in person)",
                    "Interviews with student applicants before May 11",
                    "Interviews with selected speakers after early June",
                    "Behind-the-scenes access through rehearsals and coaching (June-July)",
                    "Press credentials for August 22",
                    "Speaker bios and talk summaries after early June",
                    "High-resolution event photos after August 22",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-[#555555]">
                      <span className="text-[#e62b1e] mt-1 flex-shrink-0" aria-hidden="true">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Placeholder grid for future media */}
      <section className="py-20 md:py-28 bg-[#f9f9f9]" aria-labelledby="gallery-heading">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
          <FadeIn>
            <div className="mb-10">
              <span className="inline-flex items-center gap-3 mb-4">
                <span className="inline-block w-8 h-0.5 bg-[#e62b1e]" aria-hidden="true" />
                <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#e62b1e]">
                  Talks and Photos
                </span>
              </span>
              <h2
                id="gallery-heading"
                className="font-extrabold text-[#0a0a0a] mb-4"
                style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
              >
                Available after August 22
              </h2>
              <p className="text-[#555555] max-w-xl leading-relaxed">
                Event talks and photography will be published here after the event. All talks will
                also be available on the TEDx YouTube channel.
              </p>
            </div>
          </FadeIn>

          {/* Placeholder grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <FadeIn key={i} delay={i * 0.04}>
                <div className="aspect-video bg-[#e0e0e0] flex flex-col items-center justify-center gap-2">
                  <svg className="w-8 h-8 text-[#c0c0c0]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                  </svg>
                  <p className="text-[0.6rem] font-bold tracking-widest uppercase text-[#b0b0b0]">
                    Coming Soon
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-white border-t border-[#e0e0e0]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <p className="font-bold text-[#0a0a0a] text-lg mb-1">
                  Covering TEDxHuntingValley?
                </p>
                <p className="text-[#555555] text-sm leading-relaxed max-w-md">
                  We offer a 10-minute call to walk any journalist through the full story before the May 11
                  deadline. Contact us and we will set it up.
                </p>
              </div>
              <div className="flex gap-4 flex-shrink-0">
                <a
                  href={`mailto:${siteConfig.email}?subject=Media Inquiry - TEDxHuntingValley`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#e62b1e] text-white font-semibold text-sm rounded-sm hover:bg-[#c9231a] transition-colors duration-200"
                >
                  Media Inquiry
                </a>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-[#e0e0e0] text-[#555555] font-semibold text-sm rounded-sm hover:border-[#0a0a0a] hover:text-[#0a0a0a] transition-colors duration-200"
                >
                  About the Event
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
