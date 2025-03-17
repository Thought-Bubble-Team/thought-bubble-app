import { create } from "zustand";

import {
  fetchMoodCalendarData,
  fetchMoodBarData,
} from "../fetchDataFunctions/fetchData";
import {
  MoodCalendarDataType,
  MoodBarDataType,
  MonthlySummaryType,
} from "../interfaces/dataTypes";
import {
  MoodCalendarDataStoreType,
  MoodBarDataStoreType,
} from "../interfaces/storeTypes";

export const useMoodCalendarDataStore = create<MoodCalendarDataStoreType>(
  (set) => ({
    moodCalendarData: undefined as MoodCalendarDataType | undefined,
    loading: false,
    error: null,
    fetchMoodCalendarData: async (
      user_id: string,
      month: number,
      year: number
    ) => {
      set({ loading: true, error: null });
      try {
        const { result } = await fetchMoodCalendarData({
          month,
          year,
          userId: user_id,
        });
        if (result !== null) {
          set({ moodCalendarData: result, loading: false });
        }
      } catch (error) {
        set({ error, loading: false });
      }
    },
  })
);

export const useMoodBarDataStore = create<MoodBarDataStoreType>((set) => ({
  moodBarData: undefined as MoodBarDataType | undefined,
  loading: false,
  error: null,
  fetchMoodBarData: async (user_id: string, month: number, year: number) => {
    set({ loading: true, error: null });
    try {
      const { result } = await fetchMoodBarData({
        user_id,
        month,
        year,
      });
      if (result) {
        set({ moodBarData: result, loading: false });
      }
    } catch (error) {
      set({ error, loading: false });
    }
  },
}));
