export type MoodCalendarDataType = {
  message: string;
  calendar: {
    date: string;
    emotions: string;
    sentiment: string;
  }[];
};
