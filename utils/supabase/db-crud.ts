import { supabase } from "@/utils/supabase/supabase";

export interface JournalEntry {
  journal_title: string;
  journal_content: string;
}

export const createJournalEntry = async (
  journalEntry: Partial<JournalEntry>
) => {
  try {
    const { data, error } = await supabase
      .from("journal_entry")
      .insert([journalEntry]);

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
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
