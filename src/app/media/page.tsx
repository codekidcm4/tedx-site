import type { Metadata } from "next";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";
import { TalkCard } from "@/components/ui/TalkCard";
import { talks } from "@/data/talks";
import { pressItems } from "@/components/sections/PressSection";
import { siteConfig } from "@/data/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Media",
  description:
    "Press resources, media kit, and event coverage for TEDxHuntingValley. All twelve talks from August 22, 2026 are on YouTube.",
  alternates: { canonical: "/media" },
  openGraph: {
    title: "Media | TEDxHuntingValley",
    description:
      "Resources for journalists, photographers, and producers. All twelve talks from the August 22, 2026 event are on YouTube.",
    url: "https://tedxhuntingvalley.com/media",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "TEDxHuntingValley media resources" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Media | TEDxHuntingValley",
    description: "Press resources and event coverage for TEDxHuntingValley.",
    images: ["/og-image.jpg"],
  },
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
              Resources for journalists, press, and anyone covering TEDxHuntingValley. Every talk
              from August 22, 2026 is now on YouTube, and every story written about us is below.
            </p>
          </FadeIn>
        </div>
      </div>

      {/* In the media — every outlet that has covered the event so far */}
      <section className="py-20 md:py-28 bg-[#f9f9f9]" aria-labelledby="in-the-media-heading">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
          <FadeIn>
            <div className="mb-10">
              <span className="inline-flex items-center gap-3 mb-4">
                <span className="inline-block w-8 h-0.5 bg-[#e62b1e]" aria-hidden="true" />
                <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#e62b1e]">
                  In the media
                </span>
              </span>
              <h2
                id="in-the-media-heading"
                className="font-extrabold text-[#0a0a0a] mb-4"
                style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
              >
                Every story written about us
              </h2>
              <p className="text-[#555555] max-w-xl leading-relaxed">
                {pressItems.length} pieces of coverage across Northeast Ohio, from the first
                announcement through event week. Newest first.
              </p>
            </div>
          </FadeIn>

          <div className="divide-y divide-[#e8e8e8] border-t border-[#e8e8e8]">
            {pressItems.map((item, i) => (
              <FadeIn key={item.url} delay={Math.min(i, 6) * 0.04}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8 py-6"
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
                    <p className="text-xs text-[#777777] leading-relaxed mb-3">{item.quote}</p>
                    <span className="inline-flex items-center gap-1 text-[0.65rem] font-bold tracking-wide uppercase text-[#e62b1e]">
                      Read article
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="pt-8">
              <Link
                href="/press"
                className="inline-flex items-center gap-2 text-[0.65rem] font-bold tracking-wide uppercase text-[#9a9a9a] hover:text-[#e62b1e] transition-colors duration-200"
              >
                Full press kit &amp; story angles
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Media status */}
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
                  Every talk is online
                </h2>
                <div className="space-y-5 text-[#555555] leading-relaxed">
                  <p>
                    All twelve talks and the complete four-hour event recording were published to
                    the TEDxHuntingValley YouTube channel on September 3, 2026. Every video is
                    embeddable and free to use in coverage.
                  </p>
                  <p>
                    High-resolution event photography is available on request, and both organizers
                    remain available for interviews about the event and what comes next.
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
                      { label: "Talk recordings", status: "Live on YouTube since September 3, 2026" },
                      { label: "Event photography", status: "Available on request" },
                      { label: "Speaker bios and summaries", status: "Available now \u2014 full lineup announced" },
                      { label: "Speaker interviews", status: "Introductions on request" },
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
                    "Interviews with any of the twelve announced speakers",
                    "Embeddable video of every talk and the complete event",
                    "The organizers' own account of building the event",
                    "Speaker bios and talk summaries for the full twelve-speaker lineup",
                    "High-resolution event photos, on request",
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
                Watch the talks
              </h2>
              <p className="text-[#555555] max-w-xl leading-relaxed">
                All twelve talks from the stage, click to play. The complete event recording, with
                every introduction and Q&amp;A, is on the talks page.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {talks.map((talk) => (
              <StaggerItem key={talk.videoId} className="h-full">
                <TalkCard talk={talk} className="h-full" />
              </StaggerItem>
            ))}
          </StaggerContainer>
          <div className="mt-8">
            <Link
              href="/talks"
              className="inline-flex items-center gap-2 text-[0.65rem] font-bold tracking-wide uppercase text-[#e62b1e] hover:underline"
            >
              The complete event with chapters
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
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
                  We offer a 10-minute call to walk any journalist through the full story of the
                  event. Contact us and we will set it up.
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
