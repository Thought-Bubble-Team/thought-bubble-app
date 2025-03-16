import axios from "axios";

import {
  MoodCalendarDataType,
  MoodBarDataType,
  MonthlySummaryType,
} from "@/utils/interfaces/dataTypes";
import { supabase } from "../supabase/supabase";

export const fetchData = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchMoodCalendarData = async ({
  month,
  year,
  userId,
}: {
  month: number;
  year: number;
  userId: string;
}) => {
  try {
    const result: MoodCalendarDataType = await fetchData(
      `https://thought-bubble-backend.onrender.com/api/mood-calendar/?user_id=${userId}&month=${month}&year=${year}`
    );
    return { result: result, error: null };
  } catch (error) {
    console.error(`\x1b[31m"fetchMoodCalendarData error: ", ${error}\x1b[0m`);
    return { result: null, error: error };
  }
};

export const fetchMoodBarData = async ({ month, year, user_id }) => {
  try {
    const result: MoodBarDataType = await fetchData(
      `https://thought-bubble-backend.onrender.com/api/mood-bar/?user_id=${user_id}&month=${month}&year=${year}`
    );
    return { result: result, error: null };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error(
          `fetchMoodBarData error: status: ${error.response?.status}, message: ${error.response?.data}`
        );
      } else {
        console.error(`fetchMoodBarData error: ${error.message}`);
      }
      return { result: null, error: error };
    }
    return { result: null, error: error };
  }
};
