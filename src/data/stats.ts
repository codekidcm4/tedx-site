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
    value: "12",
    numericValue: 12,
    suffix: " min",
    label: "Maximum talk length",
    description: "Every idea, distilled to its essence",
  },
];

export const localStats: Stat[] = [
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
    value: "5",
    numericValue: 5,
    suffix: "",
    label: "Student speakers selected",
    description: "From across the greater Cleveland area",
  },
  {
    value: "0",
    numericValue: 0,
    suffix: "",
    label: "GPA or experience requirements",
    description: "Ideas are judged on their own merits, nothing else",
  },
];
