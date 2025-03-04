import { create } from "zustand";

import { fetchMoodCalendarData } from "../fetchDataFunctions/fetchData";
import { MoodCalendarDataType } from "../interfaces/dataTypes";

interface MoodCalendarDataStore {
  moodCalendarData: MoodCalendarDataType | undefined;
  loading: boolean;
  error: any;
  fetchMoodCalendarData: (
    user_id: string,
    month: number,
    year: number
  ) => Promise<void>;
}

export const useMoodCalendarDataStore = create<MoodCalendarDataStore>(
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
