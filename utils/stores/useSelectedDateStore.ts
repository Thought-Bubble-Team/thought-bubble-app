import { create } from "zustand";

import { SelectedDateStoreType } from "@/utils/interfaces/storeTypes";
import { parseDateToMonthYear, parseInitialDate } from "../dateFormat";

const initial_date = new Date();
export const useSelectedDateStore = create<SelectedDateStoreType>()(
  (set, get) => ({
    selectedDate: initial_date,
    stringDate: parseDateToMonthYear(initial_date),
    setSelectedDate: (newDate: string) => {
      const parsedDate = parseInitialDate(newDate);
      set({ selectedDate: parsedDate, stringDate: newDate });
    },
  }),
);
