import {
  JournalEntriesType,
  UserDataType,
  MoodCalendarDataType,
  MoodBarDataType,
  MonthlySummaryType,
} from "@/utils/interfaces/dataTypes";
import { Session } from "@supabase/supabase-js";

export type JournalEntriesStoreType = {
  journal_entries: JournalEntriesType | null;
  loading: boolean;
  error: any;
  fetchJournalEntries: (user_id: string) => Promise<void>;
};

export type GratitudeEntriesStoreType = {
  gratitude_entries: JournalEntriesType | null;
  loading: boolean;
  error: any;
  fetchGratitudeEntries: () => Promise<void>;
};

export type SessionStoreType = {
  session: Session | null;
  loading: boolean;
  error: any;
  setSession: (session: Session | null) => void;
  fetchSession: () => Promise<void>;
};

export type UserDataStoreType = {
  userData: UserDataType | null;
  loading: boolean;
  error: any;
  fetchUserData: (user_id: string) => Promise<void>;
};

export type SelectedDateStoreType = {
  selectedDate: string;
  setSelectedDate: (newDate: string) => void;
};

export type MoodCalendarDataStoreType = {
  moodCalendarData: MoodCalendarDataType | undefined;
  loading: boolean;
  error: any;
  fetchMoodCalendarData: (
    user_id: string,
    month: number,
    year: number
  ) => Promise<void>;
};

export type MoodBarDataStoreType = {
  moodBarData: MoodBarDataType | undefined;
  loading: boolean;
  error: any;
  fetchMoodBarData: (
    user_id: string,
    month: number,
    year: number
  ) => Promise<void>;
};
