import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Session } from "@supabase/supabase-js";

interface SessionState {
  session: Session | null;
  setSession: (session: Session | null) => void;
}

export const useSessionStore = create<SessionState>()(
  devtools(
    persist(
      (set, get) => ({
        session: null,
        setSession: (newSession: Session | null) => {
          if (get().session !== newSession) {
            set({ session: newSession });
          }
        },
      }),
      {
        name: "session-storage",
      }
    )
  )
);
