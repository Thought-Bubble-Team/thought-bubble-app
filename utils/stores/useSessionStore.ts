import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { Session } from "@supabase/supabase-js";

import {
  SessionStoreType,
  UserDataStoreType,
} from "@/utils/interfaces/storeTypes";
import { supabase } from "@/utils/supabase/supabase";
import { getUserData } from "../supabase/db-crud";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useSessionStore = create<SessionStoreType>()(
  devtools(
    persist(
      (set, get) => ({
        session: null,
        loading: false,
        error: null,
        setSession: (newSession: Session | null) => {
          if (get().session !== newSession) {
            set({ session: newSession });
          }
        },
        fetchSession: async () => {
          set({ loading: true, error: null });
          try {
            const result = await supabase.auth.getSession();

            if (result.data && result.data.session) {
              set({ session: result.data.session });
            }
          } catch (error) {
            set({ loading: false, error: error });
          }
        },
      }),
      {
        name: "session-storage",
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  )
);

export const useUserDataStore = create<UserDataStoreType>((set) => ({
  userData: null,
  loading: false,
  error: null,
  fetchUserData: async (user_id: string) => {
    set({ loading: true, error: null });
    try {
      const result = await getUserData(user_id);
      set({ userData: result?.data, loading: false });
    } catch (error) {
      set({ loading: false, error: error });
    }
  },
}));
