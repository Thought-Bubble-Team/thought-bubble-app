import {
  MoodCalendarType,
  SentimentSummaryDataType,
} from "@/utils/interfaces/dataTypes";

const sampleSentimentDataJan: MoodCalendarType[] = [
  {
    date: "2025-01-01",
    emotions: "joy",
    sentiment: "positive",
  },
  {
    date: "2025-01-02",
    emotions: "neutral",
    sentiment: "neutral",
  },
  {
    date: "2025-01-04",
    emotions: "sadness",
    sentiment: "negative",
  },
  {
    date: "2025-01-05",
    emotions: "anger",
    sentiment: "negative",
  },
  {
    date: "2025-01-06",
    emotions: "anger",
    sentiment: "negative",
  },
  {
    date: "2025-01-08",
    emotions: "neutral",
    sentiment: "neutral",
  },
  {
    date: "2025-01-09",
    emotions: "joy",
    sentiment: "positive",
  },
  {
    date: "2025-01-10",
    emotions: "joy",
    sentiment: "positive",
  },
  {
    date: "2025-01-12",
    emotions: "sadness",
    sentiment: "negative",
  },
  {
    date: "2025-01-15",
    emotions: "neutral",
    sentiment: "neutral",
  },
  {
    date: "2025-01-17",
    emotions: "joy",
    sentiment: "positive",
  },
  {
    date: "2025-01-18",
    emotions: "love",
    sentiment: "positive",
  },
  {
    date: "2025-01-19",
    emotions: "joy",
    sentiment: "positive",
  },
  {
    date: "2025-01-21",
    emotions: "neutral",
    sentiment: "neutral",
  },
  {
    date: "2025-01-23",
    emotions: "sadness",
    sentiment: "negative",
  },
  {
    date: "2025-01-25",
    emotions: "anger",
    sentiment: "negative",
  },
  {
    date: "2025-01-27",
    emotions: "neutral",
    sentiment: "neutral",
  },
  {
    date: "2025-01-29",
    emotions: "joy",
    sentiment: "positive",
  },
  {
    date: "2025-01-30",
    emotions: "joy",
    sentiment: "positive",
  },
];

const sampleSentimentDataFeb: MoodCalendarType[] = [
  {
    date: "2025-02-01",
    emotions: "joy",
    sentiment: "positive",
  },
  {
    date: "2025-02-02",
    emotions: "joy",
    sentiment: "positive",
  },
  {
    date: "2025-02-03",
    emotions: "neutral",
    sentiment: "neutral",
  },
  {
    date: "2025-02-04",
    emotions: "anger",
    sentiment: "negative",
  },
  {
    date: "2025-02-05",
    emotions: "sadness",
    sentiment: "negative",
  },
  {
    date: "2025-02-06",
    emotions: "sadness",
    sentiment: "negative",
  },
  {
    date: "2025-02-08",
    emotions: "sadness",
    sentiment: "negative",
  },
  {
    date: "2025-02-09",
    emotions: "neutral",
    sentiment: "neutral",
  },
  {
    date: "2025-02-10",
    emotions: "joy",
    sentiment: "positive",
  },
  {
    date: "2025-02-12",
    emotions: "joy",
    sentiment: "positive",
  },
  {
    date: "2025-02-13",
    emotions: "joy",
    sentiment: "positive",
  },
  {
    date: "2025-02-14",
    emotions: "love",
    sentiment: "positive",
  },
  {
    date: "2025-02-15",
    emotions: "joy",
    sentiment: "positive",
  },
  {
    date: "2025-02-16",
    emotions: "neutral",
    sentiment: "neutral",
  },
  {
    date: "2025-02-17",
    emotions: "anger",
    sentiment: "negative",
  },
  {
    date: "2025-02-18",
    emotions: "sadness",
    sentiment: "negative",
  },
  {
    date: "2025-02-20",
    emotions: "sadness",
    sentiment: "negative",
  },
  {
    date: "2025-02-21",
    emotions: "neutral",
    sentiment: "neutral",
  },
  {
    date: "2025-02-22",
    emotions: "joy",
    sentiment: "positive",
  },
  {
    date: "2025-02-23",
    emotions: "joy",
    sentiment: "positive",
  },
  {
    date: "2025-02-24",
    emotions: "joy",
    sentiment: "positive",
  },
  {
    date: "2025-02-25",
    emotions: "joy",
    sentiment: "positive",
  },
  {
    date: "2025-02-26",
    emotions: "joy",
    sentiment: "positive",
  },
  {
    date: "2025-02-28",
    emotions: "joy",
    sentiment: "positive",
  },
];

const sampleSentimentDataMar: MoodCalendarType[] = [
  {
    date: "2025-03-01",
    emotions: "joy",
    sentiment: "positive",
  },
  {
    date: "2025-03-02",
    emotions: "love",
    sentiment: "positive",
  },
  {
    date: "2025-03-04",
    emotions: "neutral",
    sentiment: "neutral",
  },
  {
    date: "2025-03-05",
    emotions: "sadness",
    sentiment: "negative",
  },
  {
    date: "2025-03-07",
    emotions: "anger",
    sentiment: "negative",
  },
  {
    date: "2025-03-09",
    emotions: "neutral",
    sentiment: "neutral",
  },
  {
    date: "2025-03-10",
    emotions: "joy",
    sentiment: "positive",
  },
  {
    date: "2025-03-12",
    emotions: "joy",
    sentiment: "positive",
  },
  {
    date: "2025-03-14",
    emotions: "love",
    sentiment: "positive",
  },
  {
    date: "2025-03-15",
    emotions: "joy",
    sentiment: "positive",
  },
  {
    date: "2025-03-17",
    emotions: "neutral",
    sentiment: "neutral",
  },
  {
    date: "2025-03-18",
    emotions: "sadness",
    sentiment: "negative",
  },
  {
    date: "2025-03-20",
    emotions: "anger",
    sentiment: "negative",
  },
  {
    date: "2025-03-22",
    emotions: "neutral",
    sentiment: "neutral",
  },
  {
    date: "2025-03-24",
    emotions: "joy",
    sentiment: "positive",
  },
  {
    date: "2025-03-25",
    emotions: "joy",
    sentiment: "positive",
  },
  {
    date: "2025-03-27",
    emotions: "neutral",
    sentiment: "neutral",
  },
  {
    date: "2025-03-29",
    emotions: "joy",
    sentiment: "positive",
  },
  {
    date: "2025-03-31",
    emotions: "love",
    sentiment: "positive",
  },
];

export const sentimentSummary: SentimentSummaryDataType = {
  message: "Sentiment data fetched successfully",
  data: {
    joy: 15,
    neutral: 6,
    sadness: 5,
    anger: 4,
    love: 2,
  },
};

export const provideSampleSentimentData = (date: string | Date) => {
  if (typeof date === "string") {
    const [month] = date.split(" ");
    switch (month) {
      case "Jan":
        return sampleSentimentDataJan;
      case "Feb":
        return sampleSentimentDataFeb;
      case "Mar":
        return sampleSentimentDataMar;
    }
  }

  return [];
};
