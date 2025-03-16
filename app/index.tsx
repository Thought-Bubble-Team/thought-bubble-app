import { router } from "expo-router";
import { useEffect } from "react";
import { Spinner, styled, XStack, YStack } from "tamagui";

import Text from "@/components/atoms/Text";
import LogoAnimation from "@/components/Icons/LogoAnimation";
import Screen from "@/components/atoms/Screen";

import {
  useJournalEntriesStore,
  useGratitudeEntriesStore,
} from "@/utils/stores/useEntriesStore";
import { useSessionStore } from "@/utils/stores/useSessionStore";

const XStackStyled = styled(XStack, {
  justifyContent: "center",
  alignItems: "center",
  gap: "$sm",
});

// TODO: Handle router.replace() properly
const LoadingModal = () => {
  const sessionStore = useSessionStore();
  const journalEntriesStore = useJournalEntriesStore();
  const gratitudeEntriesStore = useGratitudeEntriesStore();

  useEffect(() => {
    const prepareApp = async () => {
      try {
        await sessionStore.fetchSession();
        console.log("Session: ", sessionStore.session?.user.id);
        if (!sessionStore.session) {
          router.replace({ pathname: "/account_management" });
          return;
        }

        if (sessionStore.session.user) {
          await journalEntriesStore.fetchJournalEntries(
            sessionStore.session.user.id
          );
          await gratitudeEntriesStore.fetchGratitudeEntries();
        }
        router.replace({ pathname: "/(tabs)" });
      } catch (error) {
        console.log("Error: ", error);
        return;
      }
    };

    void prepareApp();
  }, []);

  return (
    <Screen>
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
    </Screen>
  );
};

export default LoadingModal;
