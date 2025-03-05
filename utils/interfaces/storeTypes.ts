import { JournalEntriesType } from "@/utils/interfaces/dataTypes";
import { Session } from "@supabase/supabase-js";

export type JournalEntriesStoreType = {
  journal_entries: JournalEntriesType | null;
  loading: boolean;
  error: any;
  fetchJournalEntries: () => Promise<void>;
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
