import { create } from "zustand";

import {
  fetchMoodCalendarData,
  fetchMoodBarData,
} from "../fetchDataFunctions/fetchData";
import { MoodCalendarDataType, MoodBarDataType } from "../interfaces/dataTypes";
import {
  MoodCalendarDataStoreType,
  MoodBarDataStoreType,
} from "../interfaces/storeTypes";

export const useMoodCalendarDataStore = create<MoodCalendarDataStoreType>(
  (set, get) => ({
    moodCalendarData: undefined as MoodCalendarDataType | undefined,
    date: new Date(),
    loading: false,
    error: null,
    setDate: (date: Date) => set({ date }),
    fetchMoodCalendarData: async (user_id: string) => {
      set({ loading: true, error: null });
      const month = get().date.getMonth() + 1;
      const year = get().date.getFullYear();
      try {
        const { result } = await fetchMoodCalendarData({
          month,
          year,
          user_id,
        });

        if (result) {
          set({ moodCalendarData: result, loading: false });
        } else {
          set({ loading: false });
        }
      } catch (error) {
        set({ error, loading: false });
      }
    },
  })
);

export const useMoodBarDataStore = create<MoodBarDataStoreType>((set, get) => ({
  moodBarData: undefined as MoodBarDataType | undefined,
  date: new Date(),
  loading: false,
  error: null,
  setDate: (date: Date) => set({ date }),
  fetchMoodBarData: async (user_id: string) => {
    set({ loading: true, error: null });
    const month = get().date.getMonth() + 1;
    const year = get().date.getFullYear();
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
