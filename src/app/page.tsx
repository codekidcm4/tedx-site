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

export default function HomePage() {
  return (
    <>
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
