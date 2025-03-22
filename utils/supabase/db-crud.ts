import { supabase } from "@/utils/supabase/supabase";
import { UserDataType } from "../interfaces/dataTypes";
import {
  SentimentType,
  JournalEntryType,
  SentimentResponseType,
  JournalEntryResponseType,
} from "@/utils/interfaces/dataTypes";
import axios, { AxiosError } from "axios";
import JournalEntry from "@/app/notepad/journal-entry";

export interface JournalEntry {
  title: string;
  content: string;
}

export const createJournalEntry = async (
  journalEntry: Partial<JournalEntry>,
  user_id: string,
): Promise<{ data: JournalEntryResponseType | null; error: any }> => {
  try {
    const result = await axios.post<JournalEntryResponseType>(
      `https://thought-bubble-backend.onrender.com/api/admin/journal-entry/?user_id=${user_id}&content=${journalEntry.content}&title=${journalEntry.title}`,
    );

    return { data: result.data, error: null };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error(
          `[db-crud.ts] Error creating journal entry: status:${error.response?.status} | details:${error.response?.data.detail}`,
        );
      }

      if (error.request) {
        console.error(
          "[db-crud.ts] Error creating journal entry: ",
          error.request,
        );
      }
    }
    return { data: null, error: error };
  }
};

export const createJournalAnalysis = async (
  entry_id: number,
): Promise<{ data: SentimentResponseType | null; error: any }> => {
  try {
    const result = await axios.post<SentimentResponseType>(
      `https://thought-bubble-backend.onrender.com/api/analyze-sentiment/?entry_id=${entry_id}`,
    );

    return { data: result.data, error: null };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error(
          `Error creating journal analysis: status:${error.response?.status} | details:${error.response?.data.detail}`,
        );
      }

      if (error.request) {
        console.error("Error creating journal analysis: ", error.request);
      }
    }
    return { data: null, error: error };
  }
};

export const createGratitudeEntry = async (
  journalEntry: Partial<JournalEntry>,
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
  journalEntry: Partial<JournalEntry>,
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
  gratitudeEntry: Partial<JournalEntry>,
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

export const getAllJournalEntries = async (
  user_id: string,
): Promise<{ data: JournalEntryType | null; error: AxiosError | null }> => {
  try {
    const result = await axios.get<JournalEntryType>(
      `https://thought-bubble-backend.onrender.com/api/journal-entry/${user_id}/`,
    );

    return { data: result.data, error: null };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error(
          `Error fetching journal entries: status:${error.response?.status} | details:${error.response?.data.detail}`,
        );
      } else if (error.request) {
        console.error("Error fetching journal entries: ", error.request);
      }
      return { data: null, error: error };
    }
    return { data: null, error: error as AxiosError };
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

export const getJournalSentiment = async (
  entryId: number,
): Promise<{ result: SentimentType | null; error: any }> => {
  const { data, error } = await supabase
    .from("sentiment_analysis")
    .select("*")
    .eq("entry_id", entryId)
    .single();

  const sentimentData = data as SentimentType;

  if (error) {
    return { result: null, error };
  }

  if (data && !error) {
    return { result: sentimentData, error: null };
  }

  return { result: null, error: null };
  // try {
  //   const result = await axios.get<SentimentResponseType>(
  //     `https://thought-bubble-backend.onrender.com/api/sentiment-analysis/${entryId}`,
  //     {
  //       params: {
  //         user_id: user_id,
  //       },
  //     }
  //   );

  //   if (result.data) {
  //     return { result: result.data, error: null };
  //   } else {
  //     return { result: undefined, error: null };
  //   }
  // } catch (error) {
  //   if (axios.isAxiosError(error)) {
  //     if (error.response) {
  //       console.error(
  //         `Error fetching journal entries: status:${error.response?.status} | details:${error.response?.data.detail}`
  //       );
  //     } else if (error.request) {
  //       console.error("Error fetching journal entries: ", error.request);
  //     }
  //     return { result: undefined, error: error };
  //   }
  //   return { result: undefined, error: error };
  // }
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

export const createUserData = async (
  userData: Partial<UserDataType>,
): Promise<{ data: UserDataType | null; error: any }> => {
  const { data, error } = await supabase
    .from("users")
    .insert(userData)
    .select();

  if (error) {
    console.error("File: db-crud.ts, createUserData() error: ", error);
    return { data: null, error };
  }

  if (!data) {
    console.error("File: db-crud.ts, createUserData() data: ", data);
    return { data: null, error: null };
  }

  return { data: data[0], error: null };
};

export const getUserData = async (user_id: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", user_id);

  const userData = data as UserDataType[];

  // Check for errors
  if (error) {
    console.error("File: db-crud.ts, getUserData() error: ", error);
    return { data: null, error };
  }

  // Check for null data
  if (data === null) {
    console.error("File: db-crud.ts, getUserData() data: ", data);
    return { data: null, error: null };
  }

  if (userData && !error) {
    return { data: userData[0], error: null };
  }

  // No data no error
  return { data: null, error: null };
};

export const updateUserData = async (
  user_id: string,
  userData: Partial<UserDataType>,
) => {
  const { error } = await supabase
    .from("users")
    .update(userData)
    .eq("user_id", user_id);

  if (error) {
    console.error("File: db-crud.ts, updateUserData() error: ", error);
    return { data: null, error };
  }
};

export type JournalEntryFeedbackType = {
  id: number;
  entry_id: number;
  user_id: string;
  feedback: boolean;
  created_at: string;
};

export const getFeedback = async (entry_id: number) => {
  const { data, error } = await supabase
    .from("journal_entry_feedbacks")
    .select("*")
    .eq("entry_id", entry_id);

  const feedbackData = data as JournalEntryFeedbackType[];

  if (error) {
    return { data: null, error };
  } else {
    return { data: feedbackData, error: null };
  }
};

export const submitFeedback = async (entry_id: number, feedback: boolean) => {
  const { data, error } = await supabase
    .from("journal_entry_feedbacks")
    .insert([{ entry_id, feedback }]);

  if (error) {
    return { data: null, error };
  } else {
    return { data, error: null };
  }
};

export const submitBugReport = async (message: string) => {
  try {
    const { error } = await supabase.from("bug_reports").insert([{ message }]);

    if (error) {
      throw new Error(error.message || "Unknown Error");
    } else {
      return;
    }
  } catch (error) {
    console.error(`[INSERT](submitBugReport) error: ${error}`);
    return;
  }
};
