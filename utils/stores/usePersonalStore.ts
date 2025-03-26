import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface PersonalStore {
  theme: string;
  setTheme: (theme: string) => void;
}

const useTBTheme = create<PersonalStore>()(
  persist(
    (set) => ({
      theme: "light",
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "personal-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useTBTheme;
