import { supabase } from "@/utils/supabase/supabase";

export interface JournalEntry {
  title: string;
  content: string;
}

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

export const getJournalEntries = async (user_id: string) => {
  try {
    const { data, error } = await supabase
      .from("journal_entry")
      .select("*")
      .eq("user_id", user_id)
      .order("created_at", { ascending: false });
  } catch (error) {
    return { data: null, error };
  }
};

export const deleteJournalEntry = async (entryId: string) => {
  try {
    const { error } = await supabase
      .from("journal_entry")
      .delete()
      .eq("id", entryId);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    return { error };
  }
};
