// Libraries Import
import { useEffect, useState } from "react";
import { Alert } from "react-native";

// Components Import
import ScrollView from "@/components/atoms/ScrollView";
import Screen from "@/components/atoms/Screen";
import Text from "@/components/atoms/Text";
import ReoccurringWords from "@/components/macro/ReoccurringWords";
import MoodCalendar from "@/components/macro/MoodCalendar/MoodCalendar";
import Select from "@/components/atoms/Select";
import Header from "@/components/atoms/Header";
import LoadingScreen from "@/components/macro/LoadingScreen";
import MoodBar from "@/components/macro/MoodBar";

// Utilities Import
import { useUserDataStore } from "@/utils/stores/useSessionStore";
import { useSelectedDateStore } from "@/utils/stores/useSelectedDateStore";
import { getMonthYearList } from "@/utils/dateFormat";
import Onboarding from "@/components/macro/Onboarding";
import { router } from "expo-router";
import { Spinner, View, YStack } from "tamagui";
import { Card } from "@/components/atoms/Card";

// FIX: page renders before the user data is fetched
export default function Index() {
  const selectedDate = useSelectedDateStore((state) => state.selectedDate);
  const setSelectedDate = useSelectedDateStore(
    (state) => state.setSelectedDate
  );
  const userDataStore = useUserDataStore();

  const dateOptions = getMonthYearList();

  useEffect(() => {
    const Prepare = async () => {};

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
      <ScrollView>
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
    </Screen>
  );
}
