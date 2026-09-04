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
    description: "The global audience every talk from our stage can reach",
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
    value: "12",
    numericValue: 12,
    suffix: "",
    label: "Talks now online",
    description: "Six adult speakers and six student speakers, no age qualifier",
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
    label: "Seats in the room",
    description: "Intimate by design, per TED licensing",
  },
  {
    value: "Aug 22",
    numericValue: 0,
    suffix: "",
    label: "The day it happened",
    description: "2026, Gund Auditorium, University School",
  },
];
