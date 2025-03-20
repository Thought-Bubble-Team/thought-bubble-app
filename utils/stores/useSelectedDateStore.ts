import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";

import { SelectedDateStoreType } from "@/utils/interfaces/storeTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
        storage: createJSONStorage(() => AsyncStorage),
      },
    ),
  ),
);
