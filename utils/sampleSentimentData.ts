export interface SimpleSentimentData {
  created_at: string;
  emotion: string;
}

const sampleSentimentDataJan: SimpleSentimentData[] = [
  {
    created_at: "2025-01-01",
    emotion: "joy",
  },
  {
    created_at: "2025-01-02",
    emotion: "neutral",
  },
  {
    created_at: "2025-01-04",
    emotion: "sadness",
  },
  {
    created_at: "2025-01-05",
    emotion: "anger",
  },
  {
    created_at: "2025-01-06",
    emotion: "anger",
  },
  {
    created_at: "2025-01-08",
    emotion: "neutral",
  },
  {
    created_at: "2025-01-09",
    emotion: "joy",
  },
  {
    created_at: "2025-01-10",
    emotion: "joy",
  },
  {
    created_at: "2025-01-12",
    emotion: "sadness",
  },
  {
    created_at: "2025-01-15",
    emotion: "neutral",
  },
  {
    created_at: "2025-01-17",
    emotion: "joy",
  },
  {
    created_at: "2025-01-18",
    emotion: "love",
  },
  {
    created_at: "2025-01-19",
    emotion: "joy",
  },
  {
    created_at: "2025-01-21",
    emotion: "neutral",
  },
  {
    created_at: "2025-01-23",
    emotion: "sadness",
  },
  {
    created_at: "2025-01-25",
    emotion: "anger",
  },
  {
    created_at: "2025-01-27",
    emotion: "neutral",
  },
  {
    created_at: "2025-01-29",
    emotion: "joy",
  },
  {
    created_at: "2025-01-30",
    emotion: "joy",
  },
];

const sampleSentimentDataFeb: SimpleSentimentData[] = [
  {
    created_at: "2025-02-01",
    emotion: "joy",
  },
  {
    created_at: "2025-02-02",
    emotion: "joy",
  },
  {
    created_at: "2025-02-03",
    emotion: "neutral",
  },
  {
    created_at: "2025-02-04",
    emotion: "anger",
  },
  {
    created_at: "2025-02-05",
    emotion: "sadness",
  },
  {
    created_at: "2025-02-06",
    emotion: "sadness",
  },
  {
    created_at: "2025-02-08",
    emotion: "sadness",
  },
  {
    created_at: "2025-02-09",
    emotion: "neutral",
  },
  {
    created_at: "2025-02-10",
    emotion: "joy",
  },
  {
    created_at: "2025-02-12",
    emotion: "joy",
  },
  {
    created_at: "2025-02-13",
    emotion: "joy",
  },
  {
    created_at: "2025-02-14",
    emotion: "love",
  },
  {
    created_at: "2025-02-15",
    emotion: "joy",
  },
  {
    created_at: "2025-02-16",
    emotion: "neutral",
  },
  {
    created_at: "2025-02-17",
    emotion: "anger",
  },
  {
    created_at: "2025-02-18",
    emotion: "sadness",
  },
  {
    created_at: "2025-02-20",
    emotion: "sadness",
  },
  {
    created_at: "2025-02-21",
    emotion: "neutral",
  },
  {
    created_at: "2025-02-22",
    emotion: "joy",
  },
  {
    created_at: "2025-02-23",
    emotion: "joy",
  },
  {
    created_at: "2025-02-24",
    emotion: "joy",
  },
  {
    created_at: "2025-02-25",
    emotion: "joy",
  },
  {
    created_at: "2025-02-26",
    emotion: "joy",
  },
  {
    created_at: "2025-02-28",
    emotion: "joy",
  },
];

export const provideSampleSentimentData = (date: string | Date) => {
  if (typeof date === "string") {
    const [month] = date.split(" ");
    switch (month) {
      case "Jan":
        return sampleSentimentDataJan;
      case "Feb":
        return sampleSentimentDataFeb;
    }
  }

  return [];
};
