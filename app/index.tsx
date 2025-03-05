import { router } from "expo-router";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/supabase";

import { YStack } from "tamagui";
import Text from "@/components/atoms/Text";

import {
  useJournalEntriesStore,
  useGratitudeEntriesStore,
} from "@/utils/stores/useEntriesStore";
import { useSessionStore } from "@/utils/stores/useSessionStore";

// TODO: Sessions, Journal & Gratitude Entries, Charts, etc.
// TODO: Refactor
// TODO: Update useSessionStore
const LoadingModal = () => {
  const sessionStore = useSessionStore();
  const journalEntriesStore = useJournalEntriesStore();
  const gratitudeEntriesStore = useGratitudeEntriesStore();
  const [sessionLoading, setSessionLoading] = useState<boolean>(false);

  useEffect(() => {
    const prepareApp = async () => {
      setSessionLoading(true);
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session) {
          sessionStore.setSession(session);
          setSessionLoading(false);
        }
        await journalEntriesStore.fetchJournalEntries();
        await gratitudeEntriesStore.fetchGratitudeEntries();
        router.navigate({ pathname: "/(tabs)" });
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    prepareApp();
  }, []);

  return (
    <YStack flex={1} justifyContent="center" alignItems="center" gap="$sm">
      <Text>LOADING...</Text>
      {sessionLoading && <Text>Loading User</Text>}
      {journalEntriesStore.loading && <Text>Fetching Journal Entries</Text>}
      {gratitudeEntriesStore.loading && <Text>Fetching Gratitude Entries</Text>}
    </YStack>
  );
};

export default LoadingModal;
