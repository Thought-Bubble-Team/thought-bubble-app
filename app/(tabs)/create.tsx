import { useEffect, useState } from "react";
import { View, Text, XStack, useWindowDimensions } from "tamagui";
import { supabase } from "@/utils/supabase/supabase";
import { Session } from "@supabase/supabase-js";

import MyView from "@/components/MyView";
import MyText from "@/components/MyText";
import MyScrollView from "@/components/MyScrollView";
import MyCard from "@/components/MyCard";
import JournalEntry from "@/components/JournalEntry";

export default function Create() {
  const [session, setSession] = useState<Session | null>(null);
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

  const { height } = useWindowDimensions();

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
      paddingHorizontal={"$5"}
      paddingVertical={"$1"}
      backgroundColor={"$background"}
    >
      <View
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderBottomWidth={"$1"}
        borderBottomColor={"$textColor"}
        width={"100%"}
        gap={"$4"}
        padding={"$4"}
      >
        <XStack width={"100%"}>
          <MyText bold fontSize={20} color={"$textColor"}>
            {day}
          </MyText>
          <MyText bold fontSize={20} color={"$subtleTextColor"}>
            {formattedDate}
          </MyText>
        </XStack>
      </View>
      <MyScrollView width={"100%"}>
        {session && session.user && <JournalEntry />}
        {!session && (
          <View>
            <MyText>Please sign in to create a journal entry.</MyText>
          </View>
        )}
      </MyScrollView>
    </MyView>
  );
}
