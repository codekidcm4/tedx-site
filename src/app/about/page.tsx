import type { Metadata } from "next";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";
import { CTASection } from "@/components/sections/CTASection";
import { OrganizerPhoto } from "@/components/ui/OrganizerPhoto";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn what TEDxHuntingValley is, what TEDx events represent, and why this event matters for Cleveland and for student voices.",
};

const differentiators = [
  {
    label: "First in a decade",
    body: "The last independent, community-organized TEDx open to the public in Cleveland was June 2015. More than ten years of silence from a city with no shortage of ideas. TEDxHuntingValley ends that gap on August 22, 2026.",
  },
  {
    label: "No age qualifier",
    body: "At TEDxHuntingValley, a student speaker is not introduced as a student. They are introduced as a TEDxHuntingValley speaker, identical to every adult on the same stage. No age qualifier. No asterisk. An idea is an idea.",
  },
  {
    label: "Open to any Cleveland-area student",
    body: "Any high school student in the greater Cleveland area can apply. There is no GPA requirement, no prior experience needed, and no extracurricular list to submit. Five speakers are selected entirely on the strength and clarity of their idea.",
  },
  {
    label: "A globally distributed platform",
    body: "Every talk is filmed and uploaded to the TEDx YouTube channel after the event. The channel has 44 million subscribers and more than 8 billion total views. A local idea, if it is good enough, reaches a global audience for free, forever.",
  },
  {
    label: "Independently organized",
    body: "TEDxHuntingValley is organized by Charlie Martin and Jack Nelson, two juniors at University School. It is not a school project or institutional program. They applied for and received the TED license themselves, with the guidance of licensed organizer Dr. Tyler Yoder.",
  },
];

export default function AboutPage() {
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
                About
              </span>
            </span>
            <h1
              className="text-white font-extrabold mb-6 max-w-3xl"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.03em", lineHeight: 1.0 }}
            >
              What is TEDxHuntingValley?
            </h1>
            <p className="text-white/65 text-xl leading-relaxed max-w-2xl">
              A fully licensed, independently organized TEDx event. The first independent community
              TEDx open to the public in Cleveland in over a decade. And it was built by two high
              school juniors.
            </p>
          </FadeIn>
        </div>
      </div>

      {/* What is TEDx */}
      <section className="py-20 md:py-28 bg-white" aria-labelledby="what-is-tedx">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-start">
            <FadeIn direction="right">
              <div>
                <span className="inline-flex items-center gap-3 mb-6">
                  <span className="inline-block w-8 h-0.5 bg-[#e62b1e]" aria-hidden="true" />
                  <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#e62b1e]">
                    TED and TEDx
                  </span>
                </span>
                <h2
                  id="what-is-tedx"
                  className="font-extrabold text-[#0a0a0a] mb-6"
                  style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
                >
                  Ideas worth spreading, organized locally
                </h2>
                <div className="space-y-5 text-[#555555] text-base leading-relaxed">
                  <p>
                    TED is the nonprofit organization behind TED Talks, one of the most recognized
                    platforms for ideas in the world. TED began in 1984 as a conference where
                    Technology, Entertainment and Design converged, and today covers nearly every
                    topic in more than 100 languages.
                  </p>
                  <p>
                    TEDx is the independently organized version. Any individual can apply for a TED
                    license, organize a local event, and follow the standard TEDx format: live
                    speakers, talks under 12 minutes, no panels, no PowerPoints. Since 2009, more
                    than 44,000 TEDx events have been held in over 160 countries.
                  </p>
                  <p>
                    After every TEDx event, the talks are published to the TEDx YouTube channel,
                    which has over 44 million subscribers and more than 8 billion total views across
                    241,000 published talks. That is the platform that every speaker at
                    TEDxHuntingValley is speaking to.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.15}>
              <div className="bg-[#f9f9f9] p-8 md:p-10 border-l-4 border-[#e62b1e]">
                <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#9a9a9a] mb-6">
                  Event at a glance
                </p>
                <div className="space-y-6">
                  {[
                    { label: "Date", value: "August 22, 2026" },
                    { label: "Venue", value: "Gund Auditorium, University School\nHunting Valley, Ohio" },
                    { label: "Format", value: "Live speakers, talks 12 minutes or under\nNo panels, no PowerPoints" },
                    { label: "Audience", value: "100 attendees (TED licensing cap)" },
                    { label: "Theme", value: "\"The Invisible Engine: The Forces We Forget\"" },
                    { label: "Organizers", value: "Charlie Martin and Jack Nelson\nUniversity School, Class of 2027" },
                    { label: "Licensed Organizer", value: "Dr. Tyler Yoder, University School" },
                    { label: "Contact", value: "tedxhuntingvalley@gmail.com" },
                  ].map((item) => (
                    <div key={item.label}>
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

      {/* What makes it different */}
      <section className="py-20 md:py-28 bg-[#f9f9f9]" aria-labelledby="what-makes-different">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
          <FadeIn>
            <div className="mb-12 md:mb-16">
              <span className="inline-flex items-center gap-3 mb-4">
                <span className="inline-block w-8 h-0.5 bg-[#e62b1e]" aria-hidden="true" />
                <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#e62b1e]">
                  What makes it different
                </span>
              </span>
              <h2
                id="what-makes-different"
                className="font-extrabold text-[#0a0a0a] max-w-2xl"
                style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
              >
                This is not a school showcase.
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className="space-y-px">
            {differentiators.map((item, i) => (
              <StaggerItem key={i}>
                <div className="bg-white p-8 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 group hover:border-l-4 hover:border-[#e62b1e] transition-all duration-200 border-l-4 border-transparent">
                  <div>
                    <p className="font-bold text-[#0a0a0a] text-base md:text-lg">{item.label}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-[#555555] leading-relaxed text-sm md:text-base">{item.body}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* The organizers */}
      <section className="py-20 md:py-28 bg-white" aria-labelledby="organizers-heading">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
          <FadeIn>
            <div className="mb-12">
              <span className="inline-flex items-center gap-3 mb-4">
                <span className="inline-block w-8 h-0.5 bg-[#e62b1e]" aria-hidden="true" />
                <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#e62b1e]">
                  The Team
                </span>
              </span>
              <h2
                id="organizers-heading"
                className="font-extrabold text-[#0a0a0a]"
                style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
              >
                Built by two high school juniors
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Charlie Martin",
                role: "Co-Organizer",
                school: "University School, Class of 2027",
                photo: "/team/charlie-martin.jpg",
                quote:
                  "We kept asking why Cleveland didn't have this anymore. We couldn't find a good answer. So we decided to stop waiting.",
              },
              {
                name: "Jack Nelson",
                role: "Co-Organizer",
                school: "University School, Class of 2027",
                photo: "/team/jack-nelson.png",
                quote:
                  "If the idea is good enough, it doesn't matter how old you are. That's what makes this worth doing.",
              },
              {
                name: "Dr. Tyler Yoder",
                role: "Licensed Organizer",
                school: "History Instructor, University School",
                photo: "/team/tyler-yoder.png",
                quote:
                  "When Charlie and Jack came to me with this, they had already done the hard part. My job has been to make sure they get to the finish line.",
              },
            ].map((person, i) => (
              <FadeIn key={person.name} delay={i * 0.1}>
                <div className="group">
                  <div className="w-full aspect-[3/4] rounded-sm overflow-hidden bg-[#f0f0f0] mb-5">
                    <OrganizerPhoto src={person.photo} alt={person.name} />
                  </div>
                  <p className="font-bold text-[#0a0a0a] text-lg mb-0.5">{person.name}</p>
                  <p className="text-[#e62b1e] text-xs font-bold tracking-wider uppercase mb-0.5">{person.role}</p>
                  <p className="text-[#9a9a9a] text-xs mb-4">{person.school}</p>
                  <blockquote className="text-[#555555] text-sm leading-relaxed italic border-l-2 border-[#e0e0e0] pl-4">
                    &ldquo;{person.quote}&rdquo;
                  </blockquote>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Venue */}
      <section className="py-20 md:py-28 bg-[#0a0a0a] relative overflow-hidden" aria-labelledby="venue-heading">
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#e62b1e]" aria-hidden="true" />
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <FadeIn>
              <div>
                <span className="inline-flex items-center gap-3 mb-6">
                  <span className="inline-block w-8 h-0.5 bg-[#e62b1e]" aria-hidden="true" />
                  <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#e62b1e]">
                    Venue
                  </span>
                </span>
                <h2
                  id="venue-heading"
                  className="text-white font-extrabold mb-6"
                  style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
                >
                  A stage that takes ideas seriously
                </h2>
                <div className="space-y-5 text-white/65 text-base leading-relaxed">
                  <p>
                    TEDxHuntingValley is held at Gund Auditorium at University School in Hunting
                    Valley, Ohio. Gund Auditorium is a professional performance venue with full
                    professional sound and lighting.
                  </p>
                  <p>
                    University School is Ohio&apos;s leading independent school for boys, and is
                    providing the auditorium as venue partner. The production quality of the space
                    matches the ambition of the event.
                  </p>
                  <p>
                    When a speaker takes the stage on August 22, they stand in front of professional
                    equipment, a live audience of 100 people, and a camera that will distribute
                    their talk to 44 million people worldwide.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="bg-[#111111] p-8 md:p-10">
                <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#9a9a9a] mb-6">
                  Venue details
                </p>
                <div className="space-y-4 text-sm">
                  {[
                    { label: "Name", value: "Gund Auditorium" },
                    { label: "Location", value: "University School\n20701 Brantley Rd\nHunting Valley, OH 44022" },
                    { label: "Capacity", value: "500-seat professional performance venue\n(Event capped at 100 per TED licensing)" },
                    { label: "Production", value: "Full professional sound and lighting" },
                  ].map((item) => (
                    <div key={item.label} className="border-b border-[#222222] pb-4">
                      <p className="text-[#9a9a9a] text-xs uppercase tracking-wider mb-1">{item.label}</p>
                      <p className="text-white whitespace-pre-line">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
