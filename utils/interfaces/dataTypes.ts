export type MoodCalendarType = {
  date: string;
  emotions: string;
  sentiment: string;
};

export type MoodCalendarDataType = {
  message: string;
  calendar: MoodCalendarType[];
};

export type JournalEntryType = {
  entry_id: number;
  user_id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export type JournalEntriesType = JournalEntryType[];

export type SentimentSummaryDataType = {
  message: string;
  data: {
    joy: number;
    neutral: number;
    sadness: number;
    anger: number;
    love: number;
  };
};

export type SentimentType = {
  sentiment_id: number;
  entry_id: number;
  sentiment: string;
  confidence_score: number;
  created_at: string;
  emotions: {
    joy: number;
    fear: number;
    love: number;
    anger: number;
    grief: number;
    pride: number;
    caring: number;
    desire: number;
    relief: number;
    disgust: number;
    neutral: number;
    remorse: number;
    sadness: number;
    approval: number;
    optimism: number;
    surprise: number;
    amusement: number;
    annoyance: number;
    confusion: number;
    curiosity: number;
    gratitude: number;
    admiration: number;
    excitement: number;
    disapproval: number;
    nervousness: number;
    realization: number;
    embarrassment: number;
    disappointment: number;
  };
};

export type OnboardingType = {
  id: number;
  image: string;
  title: string;
  description: string;
  button: any;
};

export type UserDataType = {
  id: string;
  user_id: string;
  username: string;
  first_time_user: boolean;
  created_at: string;
};

export type EmotionType = { emoji: string; color: string };

export type EmotionSummaryType = {
  emotion_values: { emotion: string; value: string }[];
  description: string;
};

export type EmotionsType = {
  emotions: {
    joy: EmotionType;
    fear: EmotionType;
    love: EmotionType;
    anger: EmotionType;
    grief: EmotionType;
    pride: EmotionType;
    caring: EmotionType;
    desire: EmotionType;
    relief: EmotionType;
    disgust: EmotionType;
    neutral: EmotionType;
    remorse: EmotionType;
    sadness: EmotionType;
    approval: EmotionType;
    optimism: EmotionType;
    surprise: EmotionType;
    amusement: EmotionType;
    annoyance: EmotionType;
    confusion: EmotionType;
    curiosity: EmotionType;
    gratitude: EmotionType;
    admiration: EmotionType;
    excitement: EmotionType;
    disapproval: EmotionType;
    nervousness: EmotionType;
    realization: EmotionType;
    embarrassment: EmotionType;
    disappointment: EmotionType;
  };
};

export type SentimentResponseType = {
  entry_id: number;
  sentiment: string;
  confidence_score: number;
  strongest_emotion: string;
  analysis_feedback: string;
};
