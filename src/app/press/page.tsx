import type { Metadata } from "next";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";
import { CTASection } from "@/components/sections/CTASection";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Press",
  description:
    "Press kit, media contacts, story angles, and downloadable materials for TEDxHuntingValley — August 22, 2026 at Gund Auditorium, University School.",
};

const stats = [
  { number: "44M", label: "TEDx YouTube subscribers" },
  { number: "8B+", label: "Total TEDx talk views" },
  { number: "10+", label: "Years since Cleveland's last independent community TEDx" },
  { number: "100", label: "Seats (TED licensing cap)" },
  { number: "5", label: "Student speakers selected" },
  { number: "12 min", label: "Maximum talk length" },
];

const storyAngles = [
  {
    number: "01",
    title: "The Student Contest",
    body: "Any Cleveland-area high school student can apply for a spot on a globally distributed speaking platform. The deadline is May 11. The selection process is a story about ideas, not credentials. What are teenagers in Cleveland thinking about in 2026?",
  },
  {
    number: "02",
    title: "The Cleveland Gap",
    body: "Cleveland's last independent community TEDx was June 2015. More than a decade passed with no public ideas platform of this kind. Two high school juniors noticed, applied for a license, and are building one from scratch.",
  },
  {
    number: "03",
    title: "The Equal Stage Model",
    body: "At TEDxHuntingValley, a student speaker is not introduced as a student. They are introduced as a TEDxHuntingValley speaker — identical to every adult on the same stage. No age qualifier. No asterisk. An idea is an idea.",
  },
  {
    number: "04",
    title: "The Organizers",
    body: "Two high school juniors who filed a TED license application, negotiated a venue partnership, built a media outreach program, and are running a city-wide speaker competition — all as a side project outside school.",
  },
  {
    number: "05",
    title: "The Coaching Arc",
    body: "Five selected student speakers enter a multi-month coaching program in June and July to develop their talks. What does it look like to prepare a 16-year-old for a globally distributed stage?",
  },
];

const canProvide = [
  "Interviews with organizers Charlie Martin and Jack Nelson — available by phone, email, or in person",
  "Interviews with student applicants before May 11 (several have agreed to speak with press)",
  "Interviews with selected speakers in early June after final selection is announced",
  "Behind-the-scenes access through rehearsals and the coaching process (June–July)",
  "Press credentials for the August 22 event — contact us to request",
  "Speaker bios and talk summaries once selections are finalized in early June",
];

export default function PressPage() {
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
                Media &amp; Press
              </span>
            </span>
            <h1
              className="text-white font-extrabold mb-6 max-w-3xl"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.03em", lineHeight: 1.0 }}
            >
              Press Kit
            </h1>
            <p className="text-white/65 text-xl leading-relaxed max-w-2xl mb-10">
              TEDxHuntingValley — August 22, 2026. Cleveland&apos;s first independent community
              TEDx in over a decade, organized by two high school juniors.
            </p>
            {/* Downloads */}
            <div className="flex flex-wrap gap-4">
              <a
                href="/press/TEDxHV_MediaKit.docx"
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#e62b1e] text-white text-sm font-bold rounded-sm hover:bg-[#c9231a] transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Media Kit
              </a>
              <a
                href="/press/TEDxHV_PressRelease.docx"
                download
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-white text-sm font-semibold rounded-sm hover:bg-white/10 transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Press Release
              </a>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Event at a glance */}
      <section className="py-20 md:py-28 bg-white" aria-labelledby="glance-heading">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-start">
            <FadeIn direction="right">
              <div>
                <span className="inline-flex items-center gap-3 mb-6">
                  <span className="inline-block w-8 h-0.5 bg-[#e62b1e]" aria-hidden="true" />
                  <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#e62b1e]">
                    What it is
                  </span>
                </span>
                <h2
                  id="glance-heading"
                  className="font-extrabold text-[#0a0a0a] mb-6"
                  style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
                >
                  Cleveland&apos;s first independent community TEDx in over a decade.
                </h2>
                <div className="space-y-4 text-[#555555] text-base leading-relaxed">
                  <p>
                    TEDxHuntingValley is a fully licensed, independently organized TEDx event
                    organized by Charlie Martin and Jack Nelson, juniors at University School,
                    with the guidance of licensed organizer Dr. Tyler Yoder.
                  </p>
                  <p>
                    The event follows the full standard TEDx format: live speakers, talks 12
                    minutes or under, no panels, no PowerPoints. Student and adult speakers
                    share the same stage with identical introductions. No age qualifier.
                  </p>
                  <p>
                    All talks are filmed and published to the TEDx YouTube channel — 44 million
                    subscribers, more than 8 billion total views. A local idea, if it&apos;s good
                    enough, reaches a global audience for free, forever.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.15}>
              <div className="bg-[#f9f9f9] p-8 border-l-4 border-[#e62b1e]">
                <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#9a9a9a] mb-6">
                  Event at a glance
                </p>
                <div className="space-y-4">
                  {[
                    { label: "Date", value: "August 22, 2026" },
                    { label: "Venue", value: "Gund Auditorium, University School\nHunting Valley, Ohio" },
                    { label: "Audience", value: "100 attendees (TED licensing cap)" },
                    { label: "Theme", value: '"The Invisible Engine: The Forces We Forget"' },
                    { label: "Format", value: "Live speakers, talks ≤12 min, no panels, no PowerPoints" },
                    { label: "After event", value: "All talks uploaded to TEDx YouTube channel" },
                    { label: "Contact", value: "tedxhuntingvalley@gmail.com" },
                  ].map((item) => (
                    <div key={item.label} className="border-b border-[#e0e0e0] pb-4 last:border-0">
                      <p className="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-[#9a9a9a] mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-[#0a0a0a] text-sm font-medium whitespace-pre-line">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="py-20 md:py-24 bg-[#0a0a0a] relative" aria-labelledby="numbers-heading">
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#e62b1e]" aria-hidden="true" />
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
          <FadeIn>
            <h2 id="numbers-heading" className="sr-only">The numbers</h2>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-px bg-[#1a1a1a]">
            {stats.map((s, i) => (
              <StaggerItem key={i}>
                <div className="bg-[#0a0a0a] p-8 md:p-10">
                  <p className="font-extrabold text-white mb-2"
                     style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.03em" }}>
                    {s.number}
                  </p>
                  <p className="text-[#9a9a9a] text-xs leading-relaxed">{s.label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Story angles */}
      <section className="py-20 md:py-28 bg-white" aria-labelledby="angles-heading">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
          <FadeIn>
            <div className="mb-12">
              <span className="inline-flex items-center gap-3 mb-4">
                <span className="inline-block w-8 h-0.5 bg-[#e62b1e]" aria-hidden="true" />
                <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#e62b1e]">
                  Story angles
                </span>
              </span>
              <h2
                id="angles-heading"
                className="font-extrabold text-[#0a0a0a] max-w-2xl"
                style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
              >
                Five ways to cover this story
              </h2>
            </div>
          </FadeIn>
          <StaggerContainer className="space-y-px">
            {storyAngles.map((angle) => (
              <StaggerItem key={angle.number}>
                <div className="bg-[#f9f9f9] p-8 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 border-l-4 border-transparent hover:border-[#e62b1e] transition-all duration-200">
                  <div className="md:col-span-1">
                    <span className="text-[0.65rem] font-bold text-[#e62b1e]">{angle.number}</span>
                  </div>
                  <div className="md:col-span-3">
                    <p className="font-bold text-[#0a0a0a] text-base">{angle.title}</p>
                  </div>
                  <div className="md:col-span-8">
                    <p className="text-[#555555] text-sm leading-relaxed">{angle.body}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Quotes + what we can provide */}
      <section className="py-20 md:py-28 bg-[#f9f9f9]" aria-labelledby="quotes-heading">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
            <FadeIn direction="right">
              <div>
                <span className="inline-flex items-center gap-3 mb-6">
                  <span className="inline-block w-8 h-0.5 bg-[#e62b1e]" aria-hidden="true" />
                  <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#e62b1e]">
                    On the record
                  </span>
                </span>
                <h2
                  id="quotes-heading"
                  className="font-extrabold text-[#0a0a0a] mb-8"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
                >
                  Organizer quotes
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      quote: "This is not a school showcase. A high school junior's idea is held to the exact same standard as anyone else's. Students and adults share the same stage with the same introduction. That is what makes it worth doing.",
                      name: "Charlie Martin",
                      title: "Co-Organizer, TEDxHuntingValley",
                    },
                    {
                      quote: "We kept asking why Cleveland didn't have this anymore. We couldn't find a good answer. So we decided to stop waiting for someone else to fix it and just build it ourselves. If the idea is good enough, it doesn't matter how old you are.",
                      name: "Jack Nelson",
                      title: "Co-Organizer, TEDxHuntingValley",
                    },
                  ].map((q) => (
                    <blockquote key={q.name} className="border-l-2 border-[#e62b1e] pl-6">
                      <p className="text-[#555555] text-sm leading-relaxed italic mb-3">
                        &ldquo;{q.quote}&rdquo;
                      </p>
                      <footer>
                        <p className="text-xs font-bold text-[#0a0a0a]">{q.name}</p>
                        <p className="text-xs text-[#9a9a9a]">{q.title}</p>
                      </footer>
                    </blockquote>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.15}>
              <div>
                <span className="inline-flex items-center gap-3 mb-6">
                  <span className="inline-block w-8 h-0.5 bg-[#e62b1e]" aria-hidden="true" />
                  <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#e62b1e]">
                    Access
                  </span>
                </span>
                <h2
                  className="font-extrabold text-[#0a0a0a] mb-8"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
                >
                  What we can provide
                </h2>
                <ul className="space-y-3">
                  {canProvide.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#e62b1e] mt-2" aria-hidden="true" />
                      <p className="text-[#555555] text-sm leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Media contact */}
      <section className="py-20 md:py-28 bg-[#0a0a0a] relative" aria-labelledby="contact-heading">
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#e62b1e]" aria-hidden="true" />
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div>
                <span className="inline-flex items-center gap-3 mb-6">
                  <span className="inline-block w-8 h-0.5 bg-[#e62b1e]" aria-hidden="true" />
                  <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#e62b1e]">
                    Media contact
                  </span>
                </span>
                <h2
                  id="contact-heading"
                  className="text-white font-extrabold mb-6"
                  style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
                >
                  Get in touch
                </h2>
                <p className="text-white/65 leading-relaxed mb-8">
                  Charlie Martin and Jack Nelson are available for interviews by phone, email,
                  or in person. We respond to every press inquiry. A 10-minute call is available
                  to walk any journalist through the full story before May 11.
                </p>
                <div className="space-y-3">
                  <a
                    href="mailto:tedxhuntingvalley@gmail.com?subject=Press Inquiry"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#e62b1e] text-white text-sm font-bold rounded-sm hover:bg-[#c9231a] transition-colors duration-200"
                  >
                    Email Press Inquiry
                  </a>
                  <p className="text-white/40 text-xs">tedxhuntingvalley@gmail.com · @tedxhuntingvalley</p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="flex flex-wrap gap-4">
                <a
                  href="/press/TEDxHV_MediaKit.docx"
                  download
                  className="flex-1 min-w-[180px] bg-[#111111] border border-[#222222] hover:border-[#e62b1e]/50 p-6 transition-all duration-200 group"
                >
                  <p className="text-[0.6rem] font-bold tracking-widest uppercase text-[#9a9a9a] mb-2 group-hover:text-[#e62b1e] transition-colors">Download</p>
                  <p className="text-white font-bold text-sm">Media Kit</p>
                  <p className="text-[#9a9a9a] text-xs mt-1">.docx</p>
                </a>
                <a
                  href="/press/TEDxHV_PressRelease.docx"
                  download
                  className="flex-1 min-w-[180px] bg-[#111111] border border-[#222222] hover:border-[#e62b1e]/50 p-6 transition-all duration-200 group"
                >
                  <p className="text-[0.6rem] font-bold tracking-widest uppercase text-[#9a9a9a] mb-2 group-hover:text-[#e62b1e] transition-colors">Download</p>
                  <p className="text-white font-bold text-sm">Press Release</p>
                  <p className="text-[#9a9a9a] text-xs mt-1">.docx</p>
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
