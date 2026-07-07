export type Stat = {
  value: string;
  numericValue: number;
  suffix: string;
  label: string;
  description?: string;
};

export const globalStats: Stat[] = [
  {
    value: "44",
    numericValue: 44,
    suffix: "M",
    label: "TEDx YouTube subscribers",
    description: "Every talk from our stage reaches a global audience",
  },
  {
    value: "8",
    numericValue: 8,
    suffix: "B+",
    label: "Total TEDx views worldwide",
    description: "Across 241,000+ published talks",
  },
  {
    value: "44",
    numericValue: 44,
    suffix: "K+",
    label: "TEDx events since 2009",
    description: "In over 160 countries around the world",
  },
  {
    value: "18",
    numericValue: 18,
    suffix: " min",
    label: "Maximum talk length",
    description: "Every idea, distilled to its essence",
  },
];

export const localStats: Stat[] = [
  {
    value: "11",
    numericValue: 11,
    suffix: "",
    label: "Voices on one stage",
    description: "Six adult speakers and five student speakers, no age qualifier",
  },
  {
    value: "10",
    numericValue: 10,
    suffix: "+",
    label: "Years since Cleveland's last public TEDx",
    description: "The last independent community TEDx in Cleveland was June 2015",
  },
  {
    value: "100",
    numericValue: 100,
    suffix: "",
    label: "Seats available",
    description: "Intimate by design, per TED licensing",
  },
  {
    value: "1",
    numericValue: 1,
    suffix: "",
    label: "Day that changes the conversation",
    description: "August 22, 2026 at Gund Auditorium, University School",
  },
];
