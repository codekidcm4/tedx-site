import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { StatsSection } from "@/components/sections/StatsSection";
import { PressSection } from "@/components/sections/PressSection";
import { ThemeSection } from "@/components/sections/ThemeSection";
import { SpeakersPreview } from "@/components/sections/SpeakersPreview";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { SocialSection } from "@/components/sections/SocialSection";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "TEDxHuntingValley",
  description:
    "Cleveland's first independent community TEDx in over a decade. Student and adult speakers. One stage. Gund Auditorium, University School — August 22, 2026.",
};

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "TEDxHuntingValley",
  description:
    "Cleveland's first independent community TEDx in over a decade. Student and adult speakers on one stage. Organized by two University School juniors.",
  startDate: "2026-08-22T09:00:00-04:00",
  endDate: "2026-08-22T17:00:00-04:00",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "Gund Auditorium, University School",
    address: {
      "@type": "PostalAddress",
      streetAddress: "20701 Brantley Rd",
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
  url: "https://tedxhuntingvalley.com",
  image: "https://tedxhuntingvalley.com/og-image.jpg",
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      <Hero />
      <StatsSection />
      <PressSection />
      <ThemeSection />
      <SpeakersPreview />
      <TimelineSection />
      <SocialSection />
      <CTASection />
    </>
  );
}
