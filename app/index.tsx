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
import {
  useSessionStore,
  useUserDataStore,
} from "@/utils/stores/useSessionStore";
import { Alert } from "react-native";

const XStackStyled = styled(XStack, {
  justifyContent: "center",
  alignItems: "center",
  gap: "$sm",
});

// TODO: Handle router.replace() properly
const LoadingModal = () => {
  const sessionStore = useSessionStore();
  const userDataStore = useUserDataStore();
  const journalEntriesStore = useJournalEntriesStore();
  const gratitudeEntriesStore = useGratitudeEntriesStore();

  useEffect(() => {
    const prepareApp = async () => {
      try {
        // Fetch session
        await sessionStore.fetchSession();
        console.log("Session: ", sessionStore.session?.user.id);
        // No session, redirect to login
        if (!sessionStore.session) {
          router.replace({ pathname: "/account_management" });
          return;
        }
        // Fetch journal entries and gratitude entries
        if (sessionStore.session.user) {
          // Fetch User Data
          await userDataStore.fetchUserData(sessionStore.session.user.id);
          if (userDataStore.error) {
            throw new Error(userDataStore.error);
          }
          // Fetch Journal Entries
          await journalEntriesStore.fetchJournalEntries(
            sessionStore.session.user.id
          );
          if (journalEntriesStore.error) {
            throw new Error(journalEntriesStore.error);
          }
          // Fetch Gratitude Entries
          await gratitudeEntriesStore.fetchGratitudeEntries();
          if (gratitudeEntriesStore.error) {
            throw new Error(gratitudeEntriesStore.error);
          }
          // Redirect to home
          router.replace({ pathname: "/(tabs)" });
        }
      } catch (error) {
        Alert.alert("Error", "An error occurred while loading the app");
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
        {userDataStore.loading && <Text weight="bold">Fetching User Data</Text>}
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
