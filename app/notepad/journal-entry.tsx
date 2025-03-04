// Libraries Import
import { useEffect } from "react";
import { View, XStack } from "tamagui";

// Components Import
import MyView from "@/components/atoms/MyView";
import Text from "@/components/atoms/Text";
import MyScrollView from "@/components/atoms/MyScrollView";
import JournalForm from "@/components/Macro/JournalForm";
import Header from "@/components/atoms/Header";
import Navigation from "@/components/atoms/Navigation";

// Utilities Import
import { supabase } from "@/utils/supabase/supabase";
import { useSessionStore } from "@/utils/stores/useSessionStore";

const JournalEntry = () => {
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
    <MyView
      flex={1}
      paddingHorizontal={"$3"}
      paddingVertical={"$1"}
      backgroundColor={"$background"}
      alignItems="center"
      justifyContent="flex-start"
    >
      <Navigation title="Journal Entry" />
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
      {session && session.user && <JournalForm />}
      {!session && (
        <View>
          <Text>Please sign in to create a journal entry.</Text>
        </View>
      )}
    </MyView>
  );
};

export default JournalEntry;
