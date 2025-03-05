import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Session } from "@supabase/supabase-js";

import { SessionStoreType } from "@/utils/interfaces/storeTypes";
import { supabase } from "@/utils/supabase/supabase";

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
      },
    ),
  ),
);
