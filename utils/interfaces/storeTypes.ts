import {
  JournalEntriesType,
  UserDataType,
  MoodCalendarDataType,
  MoodBarDataType,
  MonthlySummaryType,
  SentimentResponseType,
} from "@/utils/interfaces/dataTypes";
import { Session } from "@supabase/supabase-js";

export type JournalEntriesStoreType = {
  journal_entries: JournalEntriesType | null;
  loading: boolean;
  error: any;
  fetchJournalEntries: (user_id: string) => Promise<void>;
  clear: () => void;
};

export type GratitudeEntriesStoreType = {
  gratitude_entries: JournalEntriesType | null;
  loading: boolean;
  error: any;
  fetchGratitudeEntries: () => Promise<void>;
  clear: () => void;
};

export type SessionStoreType = {
  session: Session | null;
  loading: boolean;
  error: any;
  setSession: (session: Session | null) => void;
  fetchSession: () => Promise<void>;
  listener: () => void;
};

export type UserDataStoreType = {
  userData: UserDataType | null;
  loading: boolean;
  error: any;
  fetchUserData: (user_id: string) => Promise<void>;
  clear: () => void;
};

export type SelectedDateStoreType = {
  selectedDate: Date;
  stringDate: string;
  setSelectedDate: (newDate: string) => void;
};

export type MoodCalendarDataStoreType = {
  moodCalendarData: MoodCalendarDataType | undefined;
  date: Date;
  loading: boolean;
  error: any;
  setDate: (newDate: Date) => void;
  fetchMoodCalendarData: (user_id: string) => Promise<void>;
  clear: () => void;
};

export type MoodBarDataStoreType = {
  moodBarData: MoodBarDataType | undefined;
  date: Date;
  loading: boolean;
  error: any;
  setDate: (newDate: Date) => void;
  fetchMoodBarData: (user_id: string) => Promise<void>;
  clear: () => void;
};

export type SentimentAnalysisStoreType = {
  sentiment_analysis: SentimentResponseType[] | null;
  loading: boolean;
  error: any;
  addSentimentAnalysis: (sentiment_analysis: SentimentResponseType) => void;
  clear: () => void;
};
