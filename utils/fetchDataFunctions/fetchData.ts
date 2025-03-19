import axios from "axios";

import {
  MoodCalendarDataType,
  MoodBarDataType,
} from "@/utils/interfaces/dataTypes";

export const fetchData = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

export const fetchMoodCalendarData = async ({
  month,
  year,
  user_id,
}: {
  month: number;
  year: number;
  user_id: string;
}) => {
  try {
    const result: MoodCalendarDataType = await fetchData(
      `https://thought-bubble-backend.onrender.com/api/mood-calendar/?user_id=${user_id}&month=${month}&year=${year}`
    );
    return { result: result, error: null };
  } catch (error) {
    if (!axios.isAxiosError(error)) {
      return { result: null, error: error };
    }

    if (!error.response) {
      console.error(
        `[GET](fetchMoodCalendarData){request} error: ${error.message}`
      );
      return { result: null, error: error };
    }

    if (error.response.status === 404) {
      console.error(
        `[GET](fetchMoodCalendarData){response} error: ${error.response.data} status: ${error.response.status} detail: ${error.response.data.detail}`
      );
      return { result: null, error: error.response.data };
    }

    console.error(
      `[GET](fetchMoodCalendarData){response} status: ${error.response.status}, message: ${error.response.data}`
    );

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
    if (!axios.isAxiosError(error)) {
      return { result: null, error: error };
    }

    if (!error.response) {
      console.error(`[GET](fetchMoodBarData){request} error: ${error.message}`);
      return { result: null, error: error };
    }

    if (error.response.status === 404) {
      return { result: null, error: error.response.data };
    }

    console.error(
      `[GET](fetchMoodBarData){response} error: status: ${error.response?.status}, message: ${error.response?.data}`
    );

    return { result: null, error: error };
  }
};
