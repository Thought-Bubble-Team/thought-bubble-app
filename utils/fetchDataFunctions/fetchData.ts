import axios from "axios";

import { MoodCalendarDataType } from "@/utils/interfaces/dataTypes";

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
