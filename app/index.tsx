import { router } from "expo-router";
import { useEffect } from "react";

import { XStack, YStack } from "tamagui";
import Text from "@/components/atoms/Text";
import LogoAnimation from "@/components/Icons/LogoAnimation";

import {
  useJournalEntriesStore,
  useGratitudeEntriesStore,
} from "@/utils/stores/useEntriesStore";
import { useSessionStore } from "@/utils/stores/useSessionStore";

// TODO: Sessions, Journal & Gratitude Entries, Charts, etc.
// TODO: Refactor
// TODO: Add Error Handling
const LoadingModal = () => {
  const sessionStore = useSessionStore();
  const journalEntriesStore = useJournalEntriesStore();
  const gratitudeEntriesStore = useGratitudeEntriesStore();

  useEffect(() => {
    const prepareApp = async () => {
      try {
        await sessionStore.fetchSession();
        await journalEntriesStore.fetchJournalEntries();
        await gratitudeEntriesStore.fetchGratitudeEntries();
        router.navigate({ pathname: "/(tabs)" });
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    void prepareApp();
  }, []);

  return (
    <YStack flex={1} justifyContent="center" alignItems="center" gap="$sm">
      <XStack justifyContent="center" alignItems="center" gap="$sm">
        <LogoAnimation />
      </XStack>
      {sessionStore.loading && <Text>Loading User</Text>}
      {journalEntriesStore.loading && <Text>Fetching Journal Entries</Text>}
      {gratitudeEntriesStore.loading && <Text>Fetching Gratitude Entries</Text>}
    </YStack>
  );
};

export default LoadingModal;
