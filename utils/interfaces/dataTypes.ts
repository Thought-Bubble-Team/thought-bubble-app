export type MoodCalendarDataType = {
  message: string;
  calendar: {
    date: string;
    emotions: string;
    sentiment: string;
  }[];
};

export type JournalEntryType = {
  entry_id: number;
  user_id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export type JournalEntriesType = JournalEntryType[];
