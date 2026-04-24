export type Speaker = {
  id: string;
  name: string | null;
  role: string | null;
  organization: string | null;
  type: "adult" | "student";
  bio: string | null;
  talkTitle: string | null;
  talkDescription: string | null;
  image: string | null;
  status: "announced" | "coming-soon";
};

export const speakers: Speaker[] = [
  // Adult speakers (5)
  {
    id: "adult-1",
    name: null,
    role: null,
    organization: null,
    type: "adult",
    bio: null,
    talkTitle: null,
    talkDescription: null,
    image: null,
    status: "coming-soon",
  },
  {
    id: "adult-2",
    name: null,
    role: null,
    organization: null,
    type: "adult",
    bio: null,
    talkTitle: null,
    talkDescription: null,
    image: null,
    status: "coming-soon",
  },
  {
    id: "adult-3",
    name: null,
    role: null,
    organization: null,
    type: "adult",
    bio: null,
    talkTitle: null,
    talkDescription: null,
    image: null,
    status: "coming-soon",
  },
  {
    id: "adult-4",
    name: null,
    role: null,
    organization: null,
    type: "adult",
    bio: null,
    talkTitle: null,
    talkDescription: null,
    image: null,
    status: "coming-soon",
  },
  {
    id: "adult-5",
    name: null,
    role: null,
    organization: null,
    type: "adult",
    bio: null,
    talkTitle: null,
    talkDescription: null,
    image: null,
    status: "coming-soon",
  },
  // Student speakers (5)
  {
    id: "student-1",
    name: null,
    role: null,
    organization: null,
    type: "student",
    bio: null,
    talkTitle: null,
    talkDescription: null,
    image: null,
    status: "coming-soon",
  },
  {
    id: "student-2",
    name: null,
    role: null,
    organization: null,
    type: "student",
    bio: null,
    talkTitle: null,
    talkDescription: null,
    image: null,
    status: "coming-soon",
  },
  {
    id: "student-3",
    name: null,
    role: null,
    organization: null,
    type: "student",
    bio: null,
    talkTitle: null,
    talkDescription: null,
    image: null,
    status: "coming-soon",
  },
  {
    id: "student-4",
    name: null,
    role: null,
    organization: null,
    type: "student",
    bio: null,
    talkTitle: null,
    talkDescription: null,
    image: null,
    status: "coming-soon",
  },
  {
    id: "student-5",
    name: null,
    role: null,
    organization: null,
    type: "student",
    bio: null,
    talkTitle: null,
    talkDescription: null,
    image: null,
    status: "coming-soon",
  },
];

export const adultSpeakers = speakers.filter((s) => s.type === "adult");
export const studentSpeakers = speakers.filter((s) => s.type === "student");
