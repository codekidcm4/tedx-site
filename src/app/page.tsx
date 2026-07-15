import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { MediaBar } from "@/components/sections/MediaBar";
import { EventEssentials } from "@/components/sections/EventEssentials";
import { TicketsSection } from "@/components/sections/TicketsSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { PressSection } from "@/components/sections/PressSection";
import { ThemeSection } from "@/components/sections/ThemeSection";
import { SpeakersPreview } from "@/components/sections/SpeakersPreview";
import { WhatIsTedx } from "@/components/sections/WhatIsTedx";
import { OrganizersSection } from "@/components/sections/OrganizersSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { WatchOnlineSection } from "@/components/sections/WatchOnlineSection";
import { SocialSection } from "@/components/sections/SocialSection";
import { CTASection } from "@/components/sections/CTASection";
import { siteConfig } from "@/data/site";
import { speakers } from "@/data/speakers";

export const metadata: Metadata = {
  title: "TEDxHuntingValley",
  description:
    "Cleveland's first independent community TEDx in over a decade. Twelve voices, six adult speakers and six student speakers, on one stage at Gund Auditorium, University School on August 22, 2026.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "TEDxHuntingValley | August 22, 2026",
    description:
      "Cleveland's first independent community TEDx in over a decade. Twelve voices, one stage, no age qualifier. The full lineup is taking shape ahead of August 22, 2026.",
    url: "https://tedxhuntingvalley.com",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "TEDxHuntingValley | The Invisible Engine: The Forces We Forget" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TEDxHuntingValley | August 22, 2026",
    description:
      "Cleveland's first independent community TEDx in over a decade. Twelve voices, one stage, no age qualifier. The full lineup is taking shape ahead of August 22, 2026.",
    images: ["/og-image.jpg"],
  },
};

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "TEDxHuntingValley",
  description:
    "The Invisible Engine: The Forces We Forget. Cleveland's first independent community TEDx in over a decade. Six adult speakers and six student speakers share one stage. Organized by two University School students.",
  // Date-only until doors/start times are confirmed (the visible UI says "time to be announced").
  // Restore time-precise start/end once siteConfig.doorsOpen/startTime are set.
  startDate: siteConfig.dateISO,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "Gund Auditorium, University School",
    address: {
      "@type": "PostalAddress",
      streetAddress: "2785 SOM Center Road",
      addressLocality: "Hunting Valley",
      addressRegion: "OH",
      postalCode: "44022",
      addressCountry: "US",
    },
  },
  organizer: [
    { "@type": "Person", name: "Charlie Martin" },
    { "@type": "Person", name: "Jack Nelson" },
  ],
  // Performer list reflects the announced lineup. Talk titles are added to each Person as they confirm.
  performer: speakers.map((s) => ({
    "@type": "Person",
    name: s.name,
    ...(s.role ? { jobTitle: s.role } : {}),
  })),
  url: "https://tedxhuntingvalley.com",
  image: "https://tedxhuntingvalley.com/og-image.jpg",
  // Ticket/offer info goes here once seats are released, e.g.:
  // offers: { "@type": "Offer", url: siteConfig.ticketsUrl, availability: "https://schema.org/InStock", ... }
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      <Hero />
      <MediaBar />
      <EventEssentials />
      <TicketsSection />
      <StatsSection />
      <PressSection />
      <ThemeSection />
      <SpeakersPreview />
      <WhatIsTedx />
      <OrganizersSection />
      <TimelineSection />
      <WatchOnlineSection />
      <SocialSection />

      {/* ─────────────────────────────────────────────────────────────────
          RESERVED: Day-of schedule / run-of-show.
          Build the schedule section here (speaker order, timing, breaks).
          The #run-of-show anchor is kept stable so nav and links can target it.
         ───────────────────────────────────────────────────────────────── */}
      <section id="run-of-show" aria-hidden="true" className="hidden" />

      {/* ─────────────────────────────────────────────────────────────────
          RESERVED: Post-event area (thank-you state, talk videos, photo gallery).
          Build this after August 22. The #after anchor is kept stable.
         ───────────────────────────────────────────────────────────────── */}
      <section id="after" aria-hidden="true" className="hidden" />

      <CTASection />
    </>
  );
}
