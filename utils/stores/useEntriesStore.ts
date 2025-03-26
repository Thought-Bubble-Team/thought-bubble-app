// LIBRARIES
import { create } from "zustand";

// UTILITIES
import {
  JournalEntriesType,
  SentimentResponseType,
} from "@/utils/interfaces/dataTypes";
import {
  getAllGratitudeEntries,
  getAllJournalEntries,
} from "@/utils/supabase/db-crud";
import {
  JournalEntriesStoreType,
  GratitudeEntriesStoreType,
  SentimentAnalysisStoreType,
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
    clear: () => set({ journal_entries: null, loading: false, error: null }),
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
    clear: () => set({ gratitude_entries: null, loading: false, error: null }),
  })
);

export const useSentimentAnalysisStore = create<SentimentAnalysisStoreType>(
  (set) => ({
    sentiment_analysis: null as SentimentResponseType[] | null,
    emotion_summaries: null as
      | {
          entry_id: number;
          emotion_summary: { emotion: string; percentage: number }[];
        }[]
      | null,
    loading: false,
    error: null,
    addSentimentAnalysis: (sentiment_analysis: SentimentResponseType) =>
      set((state) => ({
        sentiment_analysis: [
          ...(state.sentiment_analysis || []),
          sentiment_analysis,
        ],
      })),
    addEmotionSummary: (
      entry_id: number,
      emotion_summary: { emotion: string; percentage: number }[]
    ) =>
      set((state) => ({
        emotion_summaries: [
          ...(state.emotion_summaries || []),
          { entry_id, emotion_summary },
        ],
      })),
    clear: () =>
      set({
        sentiment_analysis: null,
        emotion_summaries: null,
        loading: false,
        error: null,
      }),
  })
);
