// Libraries Import
import { useEffect } from "react";
import { View, XStack } from "tamagui";

// Components Import
import Screen from "@/components/atoms/Screen";
import Text from "@/components/atoms/Text";
import JournalForm from "@/components/macro/JournalForm";
import Header from "@/components/atoms/Header";
import { Navigation } from "@/components/macro/Navigation";

// Utilities Import
import { supabase } from "@/utils/supabase/supabase";
import { useSessionStore } from "@/utils/stores/useSessionStore";

const GratitudeEntry = () => {
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
      flex={1}
      alignItems="center"
      justifyContent="flex-start"
      marginTop="$3"
    >
      <Navigation title="Gratitude Journal" />
      <View width="100%" paddingHorizontal="$3">
        <Header>
          <XStack width={"100%"}>
            <Text weight="bold" fontSize="$xl" color={"$black"}>
              {day}
            </Text>
            <Text weight="bold" fontSize="$xl" color={"$black"} opacity={0.4}>
              {formattedDate}
            </Text>
          </XStack>
        </Header>
      </View>
      <View paddingHorizontal="$3">
        {session && session.user && <JournalForm />}
      </View>
      {!session && (
        <View>
          <Text>Please sign in to create a journal entry.</Text>
        </View>
      )}
    </Screen>
  );
};

export default GratitudeEntry;
