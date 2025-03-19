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
import { YStack } from "tamagui";
import { Card } from "@/components/atoms/Card";
import {
  useMoodBarDataStore,
  useMoodCalendarDataStore,
} from "@/utils/stores/useChartDataStore";

// FIX: page renders before the user data is fetched
export default function Index() {
  const selectedDate = useSelectedDateStore((state) => state.selectedDate);
  const setSelectedDate = useSelectedDateStore(
    (state) => state.setSelectedDate
  );
  const sessionStore = useSessionStore();
  const userDataStore = useUserDataStore();
  const moodCalendarDataStore = useMoodCalendarDataStore();
  const moodBarDataStore = useMoodBarDataStore();

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [localLoading, setLocalLoading] = useState<boolean>(false);

  const dateOptions = getMonthYearList();

  useEffect(() => {
    const preparePage = async () => {
      refresh();
    };

    sessionStore.listener();

    preparePage();
  }, [selectedDate]);

  const refresh = async () => {
    setRefreshing(true);
    setLocalLoading(true);
    try {
      if (!sessionStore.session) {
        return;
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

  return (
    <Screen
      paddingHorizontal={"$3"}
      paddingVertical={"$1"}
      backgroundColor={"$background"}
      justifyContent="flex-start"
    >
      <Header>
        <Text weight="bold" fontSize="$xxxl">
          Hello, User!
        </Text>
        <Select
          color={"$black"}
          opacity={0.57}
          val={selectedDate}
          setVal={setSelectedDate}
          date={dateOptions}
        />
      </Header>
      {/* <Screen>
        <View>
          <VectorIcons size={300} icon="construction" />
        </View>
        <Text weight="bold" fontSize="$lg">
          PAGE IS UNDER CONSTRUCTION
        </Text>
      </Screen> */}
      {localLoading && (
        <Screen>
          <LoadingScreen>
            {moodCalendarDataStore.loading && (
              <Text>Loading Mood Calendar Data</Text>
            )}
            {moodBarDataStore.loading && <Text>Loading Mood Bar Data</Text>}
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
              <MoodCalendar initialDate={selectedDate} />
            </Card.Body>
          </Card>
          <MoodBar initial_date={selectedDate} />
        </ScrollView>
      )}
    </Screen>
  );
}
