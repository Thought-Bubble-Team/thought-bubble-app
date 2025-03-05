import { JournalEntriesType } from "@/utils/interfaces/dataTypes";

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
