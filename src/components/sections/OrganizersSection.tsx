import { FadeIn } from "@/components/ui/FadeIn";
import { SpeakerHeadshot } from "@/components/ui/SpeakerHeadshot";

const organizers: {
  name: string;
  role: string;
  detail: string;
  photo: string | null;
  bio: string;
}[] = [
  {
    name: "Charlie Martin",
    role: "Co-Organizer & Licensed Organizer",
    detail: "University School, Class of 2027 · Pepper Pike",
    photo: "/team/charlie-martin.jpg",
    bio: "Charlie set out to find whether a high school student could bring an independent, non-university TEDx back to Cleveland after more than a decade. He applied for and holds the TED license, and with Jack built the event from the venue to the speaker competition to the stage.",
  },
  {
    name: "Jack Nelson",
    role: "Co-Organizer",
    detail: "University School, Class of 2027 · Twinsburg",
    photo: "/team/jack-nelson.jpg",
    bio: "Jack co-organized and co-hosted TEDxHuntingValley, running the speaker search across Greater Cleveland, the summer coaching program for the six student speakers, and the day itself alongside Charlie.",
  },
];

export function OrganizersSection() {
  return (
    <section className="bg-white py-20 md:py-28" aria-labelledby="organizers-home-heading">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* The founding story */}
          <FadeIn direction="right">
            <div>
              <span className="inline-flex items-center gap-3 mb-6">
                <span className="inline-block w-8 h-0.5 bg-[#e62b1e]" aria-hidden="true" />
                <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#e62b1e]">
                  Meet the organizers
                </span>
              </span>
              <h2
                id="organizers-home-heading"
                className="font-extrabold text-[#0a0a0a] mb-6"
                style={{ fontSize: "clamp(1.875rem, 4vw, 3rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
              >
                Two students noticed Cleveland was missing something. So they built it.
              </h2>
              <div className="space-y-5 text-[#555555] text-base md:text-lg leading-relaxed">
                <p>
                  TEDxHuntingValley exists because two high school students realized Cleveland had gone more
                  than a decade without an independent community TEDx, and decided to stop waiting for someone
                  else to bring it back.
                </p>
                <p>
                  They applied for the TED license themselves, found a venue, ran a city-wide speaker
                  competition, and built a stage where a high schooler&apos;s idea was held to the exact same
                  standard as anyone else&apos;s. On August 22, 2026, it happened. This was that event.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* The two organizers */}
          <FadeIn direction="left" delay={0.1}>
            <div className="grid grid-cols-2 gap-6">
              {organizers.map((person) => (
                <div key={person.name} className="group">
                  <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#f0f0f0] mb-4">
                    <SpeakerHeadshot src={person.photo} name={person.name} sizes="(max-width: 768px) 50vw, 25vw" />
                  </div>
                  <p className="font-bold text-[#0a0a0a] text-base">{person.name}</p>
                  <p className="text-[#e62b1e] text-[0.65rem] font-bold tracking-wider uppercase mb-0.5">
                    {person.role}
                  </p>
                  <p className="text-[#9a9a9a] text-xs mb-3">{person.detail}</p>
                  <p className="text-[#555555] text-sm leading-relaxed">{person.bio}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
