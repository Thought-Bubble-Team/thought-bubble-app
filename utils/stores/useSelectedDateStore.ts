import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

import { SelectedDateStoreType } from "@/utils/interfaces/storeTypes";

export const useSelectedDateStore = create<SelectedDateStoreType>()(
  devtools(
    persist(
      (set, get) => ({
        selectedDate: "Jan 2025",
        setSelectedDate: (newDate) => {
          set({ selectedDate: newDate });
        },
      }),
      {
        name: "selected-date-storage",
      },
    ),
  ),
);
