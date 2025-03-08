// Style Import
import { useEffect } from "react";
import { View, XStack } from "tamagui";

// Components Import
import Screen from "@/components/atoms/Screen";
import Text from "@/components/atoms/Text";
import ScrollView from "@/components/atoms/ScrollView";
import JournalForm from "@/components/macro/JournalForm";
import Header from "@/components/atoms/Header";

// Utilities Import
import { supabase } from "@/utils/supabase/supabase";
import { useSessionStore } from "@/utils/stores/useSessionStore";

export default function Create() {
  const session = useSessionStore((state) => state.session);
  const setSession = useSessionStore((state) => state.setSession);
  const date = new Date(); // Example date

  // Get day, date, and month
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = days[date.getDay()]; // e.g., "Saturday"
  const dayOfMonth = date.getDate(); // e.g., 9
  const month = months[date.getMonth()]; // e.g., "Nov"

  const formattedDate = `, ${dayOfMonth} ${month}`;

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <Screen
      paddingHorizontal={"$3"}
      paddingVertical={"$1"}
      backgroundColor={"$background"}
    >
      <Header borderBottomColor={"$black"}>
        <XStack width={"100%"}>
          <Text weight="bold" fontSize="$xl" color={"$black"}>
            {day}
          </Text>
          <Text weight="bold" fontSize="$xl" color={"$black"} opacity={0.4}>
            {formattedDate}
          </Text>
        </XStack>
      </Header>
      <ScrollView width={"100%"}>
        {session && session.user && <JournalForm />}
        {!session && (
          <View>
            <Text>Please sign in to create a journal entry.</Text>
          </View>
        )}
      </ScrollView>
    </Screen>
  );
}
