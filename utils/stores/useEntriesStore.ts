// LIBRARIES
import { create } from "zustand";

// UTILITIES
import { JournalEntriesType } from "@/utils/interfaces/dataTypes";
import {
  getAllGratitudeEntries,
  getAllJournalEntries,
} from "@/utils/supabase/db-crud";
import {
  JournalEntriesStoreType,
  GratitudeEntriesStoreType,
} from "@/utils/interfaces/storeTypes";

export const useJournalEntriesStore = create<JournalEntriesStoreType>(
  (set) => ({
    journal_entries: null as JournalEntriesType | null,
    loading: false,
    error: null,
    fetchJournalEntries: async (user_id: string) => {
      set({ loading: true, error: null });
      try {
        const result = await getAllJournalEntries(user_id);
        if (result && Array.isArray(result.data)) {
          set({ journal_entries: result.data, loading: false });
        }
      } catch (error) {
        set({ error: error, loading: false });
      }
    },
  })
);

export const useGratitudeEntriesStore = create<GratitudeEntriesStoreType>(
  (set) => ({
    gratitude_entries: null as JournalEntriesType | null,
    loading: false,
    error: null,
    fetchGratitudeEntries: async () => {
      set({ loading: true, error: null });
      try {
        const result = await getAllGratitudeEntries();
        if (result && Array.isArray(result.data)) {
          set({ gratitude_entries: result.data, loading: false });
        }
      } catch (error) {
        set({ error: error, loading: false });
      }
    },
  })
);
