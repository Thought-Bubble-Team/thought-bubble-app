import { JournalEntriesType } from "@/utils/interfaces/dataTypes";

export type JournalEntriesStoreType = {
  journal_entries: JournalEntriesType | null;
  loading: boolean;
  error: any;
  fetchJournalEntries: () => Promise<void>;
};
