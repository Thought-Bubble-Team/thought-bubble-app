import { supabase } from "@/utils/supabase/supabase";

export interface JournalEntry {
  title: string;
  content: string;
}

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
