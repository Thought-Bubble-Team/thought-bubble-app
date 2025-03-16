// Libraries Import
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import {
  useBoolVariation,
  useLDClient,
} from "@launchdarkly/react-native-client-sdk";

// Components Import
import ScrollView from "@/components/atoms/ScrollView";
import Screen from "@/components/atoms/Screen";
import Text from "@/components/atoms/Text";
import ReoccurringWords from "@/components/macro/ReoccurringWords";
import MoodCalendar from "@/components/macro/MoodCalendar/MoodCalendar";
import Select from "@/components/atoms/Select";
import Header from "@/components/atoms/Header";
import VectorIcons from "@/components/Icons/VectorIcons";
import LoadingScreen from "@/components/macro/LoadingScreen";

// Utilities Import
import {
  useSessionStore,
  useUserDataStore,
} from "@/utils/stores/useSessionStore";
import { useSelectedDateStore } from "@/utils/stores/useSelectedDateStore";
import { supabase } from "@/utils/supabase/supabase";
import { getMonthYearList } from "@/utils/dateFormat";
import Onboarding from "@/components/macro/Onboarding";
import { router } from "expo-router";
import { View, YStack } from "tamagui";
import { useJournalEntriesStore } from "@/utils/stores/useEntriesStore";
import { Card } from "@/components/atoms/Card";

// FIX: page renders before the user data is fetched
export default function Index() {
  const selectedDate = useSelectedDateStore((state) => state.selectedDate);
  const setSelectedDate = useSelectedDateStore(
    (state) => state.setSelectedDate
  );
  const journalEntriesStore = useJournalEntriesStore();
  const sessionStore = useSessionStore();
  const userDataStore = useUserDataStore();

  const FEATURE_FLAGS = {
    DASHBOARD_CHARTS: {
      REOCCURRING_WORDS: useBoolVariation("reoccurring-words", false),
      MOOD_BAR: useBoolVariation("mood-bar", false),
      MOOD_CALENDAR: useBoolVariation("mood-calendar", false),
      MOOD_FLOW: useBoolVariation("mood-flow", false),
    },
    VERSION: {
      v010: useBoolVariation("v0.1.0", false),
    },
  };

  const ldc = useLDClient();

  useEffect(() => {
    const Prepare = async () => {
      try {
        ldc
          .identify({ kind: "user", key: "example-user-key", name: "Sandy" })
          .catch((e: any) => Alert.alert(("Error: " + e) as string));

        if (userDataStore.userData === null) {
          await userDataStore.fetchUserData(
            sessionStore.session?.user.id as string
          );
        }
        console.log("User Data: ", userDataStore.userData);

        await journalEntriesStore.fetchJournalEntries(
          sessionStore.session?.user.id as string
        );

        if (journalEntriesStore.journal_entries !== null) {
          console.log("Journal Entries: ", journalEntriesStore.journal_entries);
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    Prepare();
  }, []);

  if (userDataStore.loading) {
    return (
      <LoadingScreen>
        <YStack justifyContent="center" alignItems="center" gap="$sm">
          <Text>Loading User Data</Text>
        </YStack>
      </LoadingScreen>
    );
  }

  return (
    <Screen
      paddingHorizontal={"$3"}
      paddingVertical={"$1"}
      backgroundColor={"$background"}
      justifyContent="flex-start"
    >
      <Header>
        <Text weight="bold" fontSize="$xxxl" color={"$black"}>
          Hello, User!
        </Text>
        {/* <Select
          color={"$black"}
          opacity={0.57}
          val={selectedDate}
          setVal={setSelectedDate}
          date={dateOptions}
        /> */}
      </Header>
      {/* <Screen>
        <View>
          <VectorIcons size={300} icon="construction" />
        </View>
        <Text weight="bold" fontSize="$lg">
          PAGE IS UNDER CONSTRUCTION
        </Text>
      </Screen> */}
      <ScrollView>
        <Card>
          <Card.Header>
            <Card.HeaderText fontSize="$lg">Mood Calendar</Card.HeaderText>
          </Card.Header>
          <Card.Body>
            <MoodCalendar initialDate="Mar 2025" />
          </Card.Body>
        </Card>
      </ScrollView>
    </Screen>
  );
}
