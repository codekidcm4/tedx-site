// Single source of truth for the TEDxHuntingValley speaker lineup.
//
// To update a speaker you only need to touch this file: edit the object, and (for a photo)
// drop a headshot into public/speakers/ and point `image` at it (path starting with /speakers/).
// `image: null` renders a tasteful initials avatar instead, so the layout never breaks.
//
// Bio length standard: keep every bio to roughly two to four sentences. Long enough to learn who
// the person is and why they matter, short enough that the card stays clean.
//
// talkTitle stays empty (null) until a talk title is confirmed; when present it renders alongside
// the speaker's name and bio automatically.

export type Speaker = {
  id: string;
  name: string;
  role: string | null;
  organization: string | null;
  type: "adult" | "student";
  bio: string | null;
  talkTitle: string | null;
  image: string | null;
  order: number;
};

export const speakers: Speaker[] = [
  // ── Adult speakers (6) ──────────────────────────────────────────────
  // Speakers are revealed (photo + title + bio) as they are confirmed. The rest stay as plain name
  // cards until ready. To reveal a speaker, fill role/bio and set image to "/speakers/<id>.jpg".
  // Headshot files for all six adults are in public/speakers/ (original bios are in git history).
  {
    id: "nic-barlage",
    name: "Nic Barlage",
    role: "CEO, Cleveland Cavaliers & Rock Entertainment Group",
    organization: "Rock Entertainment Group",
    type: "adult",
    bio: "Nic Barlage is the Chief Executive Officer of Rock Entertainment Group, the Dan Gilbert company behind the NBA's Cleveland Cavaliers, Rocket Arena, Cleveland's incoming WNBA team, and a growing portfolio of teams, venues, and media. Since becoming CEO in 2021 he has driven the organization's transformation into a national force in sports and entertainment, twice named a Best Place to Work in Sports, while investing more than $48 million back into the community. He is helping reshape Cleveland's urban core through major city-building projects, from the Rock Block entertainment district to the revitalization of Public Hall, on the belief that a strong downtown is the heartbeat of an entire region.",
    talkTitle: null,
    image: "/speakers/nic-barlage.jpg",
    order: 1,
  },
  {
    id: "fred-nance",
    name: "Fred Nance",
    role: "Senior Partner, Squire Patton Boggs",
    organization: "Squire Patton Boggs",
    type: "adult",
    bio: "Fred Nance is a Senior Partner and Executive Group member at the global law firm Squire Patton Boggs, where he has served a term as Global Managing Partner and co-leads the Sports and Entertainment Practice. An accomplished trial lawyer, he is nationally known for his long-term representation of LeBron James and Dave Chappelle, and he was one of five finalists in the contest to become NFL Commissioner. His high-stakes work for the City of Cleveland is broadly known, from the 1990s battle that kept the Browns in the city to ending its decades-old school desegregation case and developing the half-billion-dollar Cleveland Convention Center. A fixture of the city's civic life, he chaired the Greater Cleveland Partnership, has served on the boards of the Cleveland Foundation and the Cleveland Clinic, and in 2015 became just the seventh lawyer in Cleveland's history inducted into the Northeast Ohio Business Hall of Fame.",
    talkTitle: null,
    image: "/speakers/fred-nance.jpg",
    order: 2,
  },
  {
    id: "laila-edwards",
    name: "Laila Edwards",
    role: "Olympic gold medalist, U.S. Women's National Ice Hockey Team",
    organization: "USA Hockey / PWHL San Jose",
    // Compiled from public reporting (see the sources noted when this was added), not written by
    // Laila. Replace with her own bio if she sends one.
    type: "adult",
    bio: "Laila Edwards is an Olympic gold medalist and a Cleveland Heights native who, on her debut in 2023, became the first Black woman to play for the United States women's national hockey team. At the 2026 Milan Cortina Games she became the first Black woman to play hockey for Team USA at an Olympics and the first Black American woman to win Olympic gold in the sport, assisting on the tying goal in a 2-1 overtime win over Canada. She won three NCAA national championships at the University of Wisconsin, and at age 20 she was named MVP of the 2024 World Championship, the youngest player ever to receive the honor. In June 2026 she was selected fourth overall by PWHL San Jose, the highest a Black woman has ever been drafted in the league.",
    talkTitle: null,
    image: "/speakers/laila-edwards.jpg",
    order: 3,
  },
  {
    id: "marc-byrnes",
    name: "Marc Byrnes",
    role: "Chairman Emeritus, Oswald Companies",
    organization: "Oswald Companies",
    type: "adult",
    bio: "Marc S. Byrnes is Chairman Emeritus of Oswald Companies, one of the largest employee-owned insurance brokers in the country, which he helped build after his agency merged with Oswald in 1987. A fixture in the Northeast Ohio civic community, he has served as Chairman of the Board of United Way of Greater Cleveland, where he was named Volunteer of the Year, and as Chairman Emeritus of the Cleveland Leadership Center, and he sits on the boards of the Rock and Roll Hall of Fame and University School. Inside Business has named him among the Power 100 most influential leaders in Northeast Ohio, and in 2016 he was inducted into the Business Hall of Fame. A 1972 graduate of University School, he earned his B.A. from Williams College.",
    talkTitle: null,
    image: "/speakers/marc-byrnes.jpg",
    order: 4,
  },
  {
    id: "brandon-chrostowski",
    name: "Brandon Chrostowski",
    role: "Founder, President & CEO, EDWINS Leadership & Restaurant Institute",
    organization: "EDWINS Leadership & Restaurant Institute",
    type: "adult",
    bio: "Brandon Chrostowski is the founder, president, and CEO of EDWINS Leadership and Restaurant Institute, a Cleveland nonprofit that gives formerly incarcerated adults a second chance through free culinary and hospitality training. Classically trained as a chef and sommelier in Paris, New York, and Chicago, he built EDWINS around a French restaurant where students learn the trade, backed by wraparound support that includes housing, a fitness center, free childcare, and a butcher shop, bakery, and diner that employ graduates. The program trains more than one hundred people a year and reports a recidivism rate of just three percent, setting a national standard for re-entry. He has been named a CNN Hero and a 2025 James Beard Impact Award honoree, and was featured in the Academy Award-nominated documentary Knife Skills.",
    talkTitle: null,
    image: "/speakers/brandon-chrostowski.jpg",
    order: 5,
  },
  {
    id: "india-birdsong-terry",
    name: "India L. Birdsong Terry",
    role: "General Manager and CEO, Greater Cleveland Regional Transit Authority",
    organization: "Greater Cleveland Regional Transit Authority",
    type: "adult",
    bio: "India L. Birdsong Terry is the General Manager and CEO of the Greater Cleveland Regional Transit Authority, Ohio's largest transit system, where she leads more than 2,200 employees and a $342.5 million budget that delivers over 24 million rides a year across the county's 457 square miles. Since joining RTA in 2019 she has guided the agency through a pivotal period, working to modernize an aging rail fleet, secure sustainable funding, and expand the service that connects people to opportunity. A nationally respected transit leader with more than 15 years in the industry, she serves on boards from the United Way of Greater Cleveland to the American Public Transportation Foundation.",
    talkTitle: null,
    image: "/speakers/india-birdsong-terry.jpg",
    order: 6,
  },

  // ── Student speakers (6) ────────────────────────────────────────────
  // To add another student, drop a headshot into public/speakers/ and fill in bio + image.
  {
    id: "jackson-sarver",
    name: "Jackson Sarver",
    role: "Senior, Aurora High School",
    organization: "Aurora High School",
    type: "student",
    bio: "Jackson is a senior at Aurora High School and a four-year varsity golfer with a love for all things science and history. He has dedicated his high school career to challenging himself academically and through the many school clubs he is part of, including Student Council, where he serves as club president. When school is out, you can usually find him at the local Barnes & Noble shopping for new books, at the golf course practicing his swing, or at his great-aunt's house playing with her dog and listening to old records on vinyl. Through his talk, Jackson hopes to shine a light on the troubled past of ammonia fertilizers and the dangers they still pose to our world today.",
    talkTitle: null,
    image: "/speakers/jackson-sarver.jpg",
    order: 7,
  },
  {
    id: "claire-witalec",
    name: "Claire Witalec",
    role: "Rising junior, Laurel School",
    organization: "Laurel School",
    type: "student",
    bio: "Claire Witalec is a rising junior at Laurel School who is passionate about all things democracy. She is a Democracy Summer Fellow, combining direct campaign work with civics-based workshops, and a research intern at the Matriots, a nonprofit focused on empowering women in Ohio's political offices. She started a Girl Up chapter at Laurel to engage other students in advocacy, and is completing a Capstone project aimed at increasing young people's civic participation and voting turnout. A dedicated Lincoln-Douglas debater who also coaches middle school extemp and serves as team secretary, she looks forward to sharing her ideas on representation, polarization, and participation.",
    talkTitle: null,
    image: "/speakers/claire-witalec.jpg",
    order: 8,
  },
  {
    id: "ethan-shneyderman",
    name: "Ethan Shneyderman",
    role: "Junior, Mayfield High School",
    organization: "Mayfield High School",
    type: "student",
    bio: "Ethan Shneyderman is a junior at Mayfield High School in Highland Heights, Ohio. At just age ten during the COVID-19 pandemic, he began writing letters and emails to foreign embassies, world leaders, airports, and hotels, not for a school project, but because he was curious and believed the world was worth reaching out to. They wrote back. A first-generation American whose family emigrated from the former Soviet Union, Ethan serves as Student Council President, is a nationally recognized civics leader through the Sandra Day O'Connor Institute, and is passionate about international relations, government, and human connection. His talk asks a question almost nobody asks: what would happen if you just reached out?",
    talkTitle: null,
    image: "/speakers/ethan-shneyderman.jpg",
    order: 9,
  },
  {
    id: "james-mason-jr",
    name: "James Mason Jr.",
    role: "Senior, University School",
    organization: "University School",
    type: "student",
    bio: "James Mason Jr. is a senior at University School in Hunting Valley, Ohio, where he serves as one of ten elected House Prefects and is active in student leadership, the Black Student Union, and the performing arts. A passionate communicator, he was named State Runner-Up in Poetry Out Loud and a finalist in the Sherman Prize Speaking Competition. He competes in varsity track and field, qualifying for the OATCCC Division II State Championships in the shot put, and is a Future Business Leaders of America State Runner-Up in Organizational Leadership. Through the inaugural Cleveland Cavaliers Social Impact Academy and his work mentoring younger students, he has developed a passion for service, and hopes to attend an HBCU to study law, public policy, and civic leadership.",
    talkTitle: null,
    image: "/speakers/james-mason-jr.jpg",
    order: 10,
  },
  {
    id: "priyasha-ghosal",
    name: "Priyasha Ghosal",
    role: "Sophomore, Hawken School",
    organization: "Hawken School",
    type: "student",
    bio: "Priyasha Ghosal is a sophomore at Hawken School in Ohio, passionate about STEM, leadership, and social impact. In 2022 she founded Light of Love, a 501(c)(3) nonprofit supporting pediatric cancer patients at St. Jude Children's Hospital and UH Rainbow Babies & Children's Hospital. A nationally recognized math competitor, competitive dancer, speech and debate national semifinalist, and award-winning social entrepreneur, she has been featured by the Young Entrepreneurship Institute, the Veale Institute of Entrepreneurship, and WKYC. As an American Heart Association Teen of Impact nominee for Greater Cleveland, she led 16 teens to raise over $22,000 in eight weeks for cardiac disease awareness. She believes young people can solve real-world problems through compassion, innovation, and action.",
    talkTitle: null,
    image: "/speakers/priyasha-ghosal.jpg",
    order: 11,
  },
  {
    id: "gage-martin",
    name: "Gage Martin",
    role: "Senior, Louisville High School",
    organization: "Louisville High School",
    type: "student",
    bio: "Gage Martin is a senior at Louisville High School and a member of the Teen Wellness Team for the Ohio Department of Health, where he helps shape Stark County's Community Health Improvement Plan. He is president of his school's Speech and Debate team, which he has competed on for seven years, making him one of the top competitors in the Ohio Speech and Debate Association. Gage is an alumnus of Hugh O'Brian Youth Leadership, an NSDA Academic All American, and the creator of the nationally recognized Duck Game used in schools. Outside of that he enjoys pickleball, rock climbing, and taking care of his lawn, and his talk digs into corporate influences on our culture and what we might do to minimize them.",
    talkTitle: null,
    image: "/speakers/gage-martin.jpg",
    order: 12,
  },
];

const byOrder = (a: Speaker, b: Speaker) => a.order - b.order;

export const adultSpeakers = speakers.filter((s) => s.type === "adult").sort(byOrder);
export const studentSpeakers = speakers.filter((s) => s.type === "student").sort(byOrder);

/** Initials for the avatar fallback when a speaker has no headshot. */
export function speakerInitials(name: string): string {
  const suffixes = new Set(["jr", "jr.", "sr", "sr.", "ii", "iii", "iv", "v"]);
  const parts = name
    .replace(/[^A-Za-z.\s]/g, "")
    .trim()
    .split(/\s+/)
    .filter((p) => p && !suffixes.has(p.toLowerCase()));
  if (parts.length === 0) return "?";
  const first = parts[0][0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}
