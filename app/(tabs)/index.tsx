// Libraries Import
import { useEffect, useState } from "react";
import { Alert, RefreshControl } from "react-native";

// Components Import
import ScrollView from "@/components/atoms/ScrollView";
import Screen from "@/components/atoms/Screen";
import Text from "@/components/atoms/Text";
import MoodCalendar from "@/components/macro/MoodCalendar/MoodCalendar";
import Select from "@/components/atoms/Select";
import Header from "@/components/atoms/Header";
import LoadingScreen from "@/components/macro/LoadingScreen";
import MoodBar from "@/components/macro/MoodBar";

// Utilities Import
import {
  useSessionStore,
  useUserDataStore,
} from "@/utils/stores/useSessionStore";
import { useSelectedDateStore } from "@/utils/stores/useSelectedDateStore";
import { getMonthYearList } from "@/utils/dateFormat";
import { Card } from "@/components/atoms/Card";
import {
  useMoodBarDataStore,
  useMoodCalendarDataStore,
} from "@/utils/stores/useChartDataStore";
import { XStack } from "tamagui";
import { router } from "expo-router";

export default function Index() {
  const { selectedDate, stringDate, setSelectedDate } = useSelectedDateStore();
  const sessionStore = useSessionStore();
  const userDataStore = useUserDataStore();
  const moodCalendarDataStore = useMoodCalendarDataStore();
  const moodBarDataStore = useMoodBarDataStore();

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [localLoading, setLocalLoading] = useState<boolean>(false);

  const dateOptions = getMonthYearList();

  const refresh = async () => {
    setRefreshing(true);
    setLocalLoading(true);
    try {
      if (!sessionStore.session) {
        return;
      }

      if (!userDataStore.userData) {
        await userDataStore.fetchUserData(sessionStore.session.user.id);
      }

      if (userDataStore.userData) {
        if (userDataStore.userData.first_time_user) {
          router.push({ pathname: "/onboarding_page" });
        }
      }

      await moodCalendarDataStore.fetchMoodCalendarData(
        sessionStore.session.user.id
      );
      await moodBarDataStore.fetchMoodBarData(sessionStore.session.user.id);
    } catch (error) {
      Alert.alert("Error", "Failed to refresh");
      console.log("Error: Journals Refresh: ", error);
    }
    setRefreshing(false);
    setLocalLoading(false);
  };

  useEffect(() => {
    sessionStore.listener();

    refresh();
  }, [selectedDate]);

  return (
    <Screen
      paddingHorizontal={"$3"}
      paddingVertical={"$1"}
      backgroundColor={"$background"}
      justifyContent="flex-start"
      marginTop={"$3"}
    >
      <Header>
        <XStack>
          <Text weight="bold" fontSize="$xxxl" textAlign="center">
            Hello,{" "}
            {userDataStore.userData ? userDataStore.userData.username : "User"}
          </Text>
        </XStack>
        <Select
          color={"$black"}
          opacity={0.57}
          val={stringDate}
          setVal={setSelectedDate}
          date={dateOptions}
        />
      </Header>
      {localLoading && (
        <Screen>
          <LoadingScreen>
            {userDataStore.loading && (
              <Text weight="bold">Loading User Data</Text>
            )}
            {moodCalendarDataStore.loading && (
              <Text weight="bold">Loading Mood Calendar Data</Text>
            )}
            {moodBarDataStore.loading && (
              <Text weight="bold">Loading Mood Bar Data</Text>
            )}
          </LoadingScreen>
        </Screen>
      )}
      {!localLoading && (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refresh} />
          }
        >
          <Card>
            <Card.Header>
              <Card.HeaderText fontSize="$lg">Mood Calendar</Card.HeaderText>
            </Card.Header>
            <Card.Body>
              <MoodCalendar />
            </Card.Body>
          </Card>
          <MoodBar />
        </ScrollView>
      )}
    </Screen>
  );
}
