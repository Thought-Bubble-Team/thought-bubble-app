import { router } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Spinner, styled, XStack, YStack } from "tamagui";
import Text from "@/components/atoms/Text";
import LogoAnimation from "@/components/Icons/LogoAnimation";

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

const LoadingModal = () => {
  const sessionStore = useSessionStore();
  const journalEntriesStore = useJournalEntriesStore();
  const gratitudeEntriesStore = useGratitudeEntriesStore();
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(false);

  useEffect(() => {
    const checkIfFirstLaunch = async () => {
      try {
        const hasLaunchedBefore = await AsyncStorage.getItem("isFirstLaunch");
        if (hasLaunchedBefore === null) {
          setIsFirstLaunch(true);
          await AsyncStorage.setItem("isFirstLaunch", "false");
        } else {
          setIsFirstLaunch(false);
        }
      } catch (error) {
        console.error("Error: ", error);
        setIsFirstLaunch(false);
      }
    };

    void checkIfFirstLaunch();
  }, []);

  useEffect(() => {
    if (isFirstLaunch === null) return;

    const prepareApp = async () => {
      try {
        if (!isFirstLaunch) {
          await sessionStore.fetchSession();
          await journalEntriesStore.fetchJournalEntries();
          await gratitudeEntriesStore.fetchGratitudeEntries();
          router.replace({ pathname: "/(tabs)" });
        } else {
          router.replace({ pathname: "/onboarding_page" });
        }
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
