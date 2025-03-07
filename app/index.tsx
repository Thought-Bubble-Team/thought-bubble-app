import { router } from "expo-router";
import { useEffect } from "react";

import { Spinner, styled, XStack, YStack } from "tamagui";
import Text from "@/components/atoms/Text";
import LogoAnimation from "@/components/Icons/LogoAnimation";

import {
  useJournalEntriesStore,
  useGratitudeEntriesStore,
} from "@/utils/stores/useEntriesStore";
import { useSessionStore } from "@/utils/stores/useSessionStore";

// TODO: Sessions, Journal & Gratitude Entries, Charts, etc.
// TODO: Refactor

const XStackStyled = styled(XStack, {
  justifyContent: "center",
  alignItems: "center",
  gap: "$sm",
});

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
      <XStackStyled>
        <LogoAnimation />
      </XStackStyled>
      <XStackStyled>
        <Spinner size="large" color="$grey3" />
      </XStackStyled>
      <YStack justifyContent="center" alignItems="center" gap="$sm">
        {sessionStore.loading && <Text weight="bold">Loading User</Text>}
        {journalEntriesStore.loading && (
          <Text weight="bold">Fetching Journal Entries</Text>
        )}
        {gratitudeEntriesStore.loading && (
          <Text weight="bold">Fetching Gratitude Entries</Text>
        )}
      </YStack>
    </YStack>
  );
};

export default LoadingModal;
