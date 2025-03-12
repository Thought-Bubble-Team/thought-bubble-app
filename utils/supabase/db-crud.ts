import { supabase } from "@/utils/supabase/supabase";
import { UserDataType } from "../interfaces/dataTypes";

export interface JournalEntry {
  title: string;
  content: string;
}

export type JournalEntryType = {
  entry_id: number;
  user_id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
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

export const createJournalEntry = async (
  journalEntry: Partial<JournalEntry>
) => {
  const { data, error } = await supabase
    .from("journal_entry")
    .insert([journalEntry]);

  if (error) {
    return { data: null, error };
  } else {
    return { data, error: null };
  }
};

export const createGratitudeEntry = async (
  journalEntry: Partial<JournalEntry>
) => {
  const { data, error } = await supabase
    .from("gratitude_entry")
    .insert([journalEntry]);

  if (error) {
    return { data: null, error };
  } else {
    return { data, error: null };
  }
};

export const updateJournalEntry = async (
  entry_id: number,
  journalEntry: Partial<JournalEntry>
) => {
  const { data, error } = await supabase
    .from("journal_entry")
    .update(journalEntry)
    .eq("entry_id", entry_id);

  if (error) {
    return { data: null, error };
  } else {
    return { data, error: null };
  }
};

export const updateGratitudeEntry = async (
  entry_id: number,
  gratitudeEntry: Partial<JournalEntry>
) => {
  const { data, error } = await supabase
    .from("gratitude_entry")
    .update(gratitudeEntry)
    .eq("entry_id", entry_id);

  const gratitudeEntryData = data as JournalEntryType[] | null;

  if (error) {
    return { gratitudeEntryData: null, error };
  } else {
    return { gratitudeEntryData, error: null };
  }
};

export const getJournalEntry = async (entry_id: number) => {
  const { data, error } = await supabase
    .from("journal_entry")
    .select("*")
    .eq("entry_id", entry_id);

  const journalEntryData = data as JournalEntryType[];

  if (error) {
    return { journalEntryData: null, error };
  }

  if (journalEntryData && !error) {
    return { journalEntryData, error: null };
  }
};

export const getGratitudeEntry = async (entry_id: number) => {
  const { data, error } = await supabase
    .from("gratitude_entry")
    .select("*")
    .eq("entry_id", entry_id);

  const gratitudeEntryData = data as JournalEntryType[];

  if (error) {
    return { gratitudeEntryData: null, error };
  }

  if (gratitudeEntryData && !error) {
    return { gratitudeEntryData, error: null };
  }
};

export const getAllJournalEntries = async () => {
  const { data, error } = await supabase
    .from("journal_entry")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return { data: null, error };
  }

  if (data && !error) {
    return { data, error: null };
  }
};

export const getAllGratitudeEntries = async () => {
  const { data, error } = await supabase
    .from("gratitude_entry")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return { data: null, error };
  }

  if (data && !error) {
    return { data, error: null };
  }
};

export const getJournalSentiment = async (entryId: number) => {
  const { data, error } = await supabase
    .from("sentiment_analysis")
    .select("*")
    .eq("entry_id", entryId);

  const sentimentData = data as SentimentType[];

  if (error) {
    return { sentimentData: null, error };
  }

  if (data && !error) {
    return { sentimentData, error: null };
  }
};

export const deleteJournalEntry = async (entryId: number) => {
  try {
    await supabase.from("journal_entry").delete().eq("entry_id", entryId);
  } catch (error) {
    return { error };
  }
};

export const deleteGratitudeEntry = async (entryId: number) => {
  try {
    await supabase.from("gratitude_entry").delete().eq("entry_id", entryId);
  } catch (error) {
    return { error };
  }
};

export const getUserData = async (user_id: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", user_id);

  const userData = data as UserDataType[];

  if (error) {
    console.error("File: db-crud.ts, getUserData() error: ", error);
    return { data: null, error };
  }

  if (data === undefined) {
    console.error("File: db-crud.ts, getUserData() data: ", data);
    return { data: null, error: null };
  }

  if (userData && !error) {
    return { data: userData[0], error: null };
  }
};
