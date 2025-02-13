// Style Import
import { useEffect } from "react";
import { View, XStack } from "tamagui";

// Components Import
import MyView from "@/components/Micro/MyView";
import Text from "@/components/Micro/Text";
import MyScrollView from "@/components/Micro/MyScrollView";
import JournalEntry from "@/components/Macro/JournalEntry";
import Header from "@/components/Micro/Header";

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
    <MyView
      paddingHorizontal={"$3"}
      paddingVertical={"$1"}
      backgroundColor={"$background"}
    >
      <Header borderBottomColor={"$textColor"}
      >
        <XStack width={"100%"}>
          <Text weight="bold" fontSize={20} color={"$textColor"}>{day}</Text>
          <Text weight="bold" fontSize={20} color={"$subtleTextColor"}>{formattedDate}</Text>
        </XStack>
      </Header>
      <MyScrollView width={"100%"}>
        {session && session.user && <JournalEntry />}
        {!session && (
          <View>
            <Text>Please sign in to create a journal entry.</Text>
          </View>
        )}
      </MyScrollView>
    </MyView>
  );
}
