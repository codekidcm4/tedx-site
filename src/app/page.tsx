import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { MediaBar } from "@/components/sections/MediaBar";
import { TalksSection } from "@/components/sections/TalksSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { PressSection } from "@/components/sections/PressSection";
import { ThemeSection } from "@/components/sections/ThemeSection";
import { SpeakersPreview } from "@/components/sections/SpeakersPreview";
import { WhatIsTedx } from "@/components/sections/WhatIsTedx";
import { OrganizersSection } from "@/components/sections/OrganizersSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { SocialSection } from "@/components/sections/SocialSection";
import { CTASection } from "@/components/sections/CTASection";
import { siteConfig } from "@/data/site";
import { speakers } from "@/data/speakers";
import { fullEvent, thumbUrl, watchUrl } from "@/data/talks";

export const metadata: Metadata = {
  title: "TEDxHuntingValley",
  description:
    "Cleveland's first independent community TEDx in over a decade. Twelve voices, six adult speakers and six student speakers, shared one stage at Gund Auditorium, University School on August 22, 2026. Every talk is now free on YouTube.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "TEDxHuntingValley | Watch all twelve talks",
    description:
      "Cleveland's first independent community TEDx in over a decade. Twelve voices, one stage, no age qualifier. Every talk from August 22, 2026 is now free on YouTube.",
    url: "https://tedxhuntingvalley.com",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "TEDxHuntingValley | The Invisible Engine: The Forces We Forget" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TEDxHuntingValley | Watch all twelve talks",
    description:
      "Cleveland's first independent community TEDx in over a decade. Twelve voices, one stage, no age qualifier. Every talk is now free on YouTube.",
    images: ["/og-image.jpg"],
  },
};

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "TEDxHuntingValley 2026",
  description:
    "The Invisible Engine: The Forces We Forget. Cleveland's first independent community TEDx in over a decade. Six adult speakers and six student speakers shared one stage. Organized by two University School students. All talks are published on YouTube.",
  startDate: siteConfig.startDateTimeISO,
  endDate: siteConfig.endDateTimeISO,
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
  performer: speakers.map((s) => ({
    "@type": "Person",
    name: s.name,
    ...(s.role ? { jobTitle: s.role } : {}),
  })),
  recordedIn: {
    "@type": "VideoObject",
    name: fullEvent.title,
    description: fullEvent.description,
    thumbnailUrl: thumbUrl(fullEvent.videoId),
    uploadDate: "2026-09-03",
    duration: fullEvent.durationISO,
    contentUrl: watchUrl(fullEvent.videoId),
  },
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
      <MediaBar />
      <TalksSection />
      <StatsSection />
      <PressSection />
      <ThemeSection />
      <SpeakersPreview />
      <WhatIsTedx />
      <OrganizersSection />
      <TimelineSection />
      <SocialSection />
      <CTASection />
    </>
  );
}
