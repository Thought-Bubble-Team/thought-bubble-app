import { create } from "zustand";
import { Session } from "@supabase/supabase-js";

import {
  SessionStoreType,
  UserDataStoreType,
} from "@/utils/interfaces/storeTypes";
import { supabase } from "@/utils/supabase/supabase";
import { getUserData } from "../supabase/db-crud";
import {
  useJournalEntriesStore,
  useGratitudeEntriesStore,
} from "./useEntriesStore";
import {
  useMoodBarDataStore,
  useMoodCalendarDataStore,
} from "./useChartDataStore";

export const useSessionStore = create<SessionStoreType>()((set, get) => ({
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
        set({ session: result.data.session, loading: false });
      }
    } catch (error) {
      set({ loading: false, error: error });
    }
  },
  listener: () => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        set({ session: session, loading: false, error: null });

        if (session) {
          const user_id = session.user.id;
          useJournalEntriesStore.getState().fetchJournalEntries(user_id);
          useGratitudeEntriesStore.getState().fetchGratitudeEntries();
          useUserDataStore.getState().fetchUserData(user_id);
          useMoodCalendarDataStore.getState().fetchMoodCalendarData(user_id);
          useMoodBarDataStore.getState().fetchMoodBarData(user_id);
        }
      }

      if (event === "SIGNED_OUT") {
        useJournalEntriesStore.getState().clear();
        useGratitudeEntriesStore.getState().clear();
        useUserDataStore.getState().clear();
        useMoodCalendarDataStore.getState().clear();
        useMoodBarDataStore.getState().clear();
        set({ session: null, error: null });
      }
    });
    data.subscription.unsubscribe();
  },
}));

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
  clear: () => {
    set({ userData: null, loading: false, error: null });
  },
}));
