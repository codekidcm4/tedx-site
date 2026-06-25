import { FadeIn } from "@/components/ui/FadeIn";
import { SpeakerHeadshot } from "@/components/ui/SpeakerHeadshot";

// ── ORGANIZER STUBS ─────────────────────────────────────────────────────────
// Supply the exact bio text and (optionally) a new headshot path for each organizer.
// Keep each bio to roughly two to four sentences, the same medium length as the speaker bios.
// `photo` points at an existing image in /public/team (swap the path to replace it).
// `bio: null` renders a clean "Short bio coming soon" placeholder until you paste real text.
const organizers: {
  name: string;
  role: string;
  detail: string;
  photo: string | null;
  bio: string | null;
}[] = [
  {
    name: "Charlie Martin",
    role: "Co-Organizer",
    detail: "University School, Class of 2027",
    photo: "/team/charlie-martin.jpg",
    // TODO(organizer bio): paste Charlie's 2 to 4 sentence bio here.
    bio: null,
  },
  {
    name: "Jack Nelson",
    role: "Co-Organizer",
    detail: "University School, Class of 2027",
    photo: "/team/jack-nelson.jpg",
    // TODO(organizer bio): paste Jack's 2 to 4 sentence bio here.
    bio: null,
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
                  They applied for the TED license themselves, found a venue, and built a stage where a high
                  schooler&apos;s idea is held to the exact same standard as anyone else&apos;s. This is that event.
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
                  {person.bio ? (
                    <p className="text-[#555555] text-sm leading-relaxed">{person.bio}</p>
                  ) : (
                    <p className="text-[#9a9a9a] text-sm italic">Short bio coming soon.</p>
                  )}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
