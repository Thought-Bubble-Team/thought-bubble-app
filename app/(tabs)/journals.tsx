import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/supabase";
import { Session } from "@supabase/supabase-js";
import { styled, View, Text, XStack, Button } from "tamagui";
import Ionicons from "@expo/vector-icons/Ionicons";

import MyView from "@/components/MyView";
import MyScrollView from "@/components/MyScrollView";
import MyText from "@/components/MyText";
import MyCard from "@/components/MyCard";

type Journal = {
  id: number;
  title: string;
  content: string;
  date: string;
};

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

export default function Journals() {
  const [session, setSession] = useState<Session | null>(null);
  const [journals, setJournals] = useState<Journal[]>([]);

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
      <View
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderBottomWidth={"$1"}
        borderBottomColor={"#EAE2DE"}
        width={"100%"}
        gap={"$4"}
        padding={"$4"}
      >
        <MyText bold fontSize={30} color={"$textColor"}>
          Your Journey
        </MyText>
      </View>
      <MyScrollView width={"100%"} height={"100%"}>
        <JournalEntry />
      </MyScrollView>
    </MyView>
  );
}

const JournalEntry = () => {
  return (
    <View display="flex" flexDirection="column">
      <View
        width={"100%"}
        paddingHorizontal={"$4"}
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <XStack>
          <MyText bold fontSize={20} color={"$textColor"}>
            {day}
          </MyText>
          <MyText bold fontSize={20} color={"$subtleTextColor"}>
            {formattedDate}
          </MyText>
        </XStack>
        <ButtonStyled>
          <Ionicons name="settings-outline" size={24} color="#443E3B" />
        </ButtonStyled>
      </View>
      <MyCard headerTitle="Today's Journal">
        <MyText>Journal Entry</MyText>
      </MyCard>
    </View>
  );
};

const ButtonStyled = styled(Button, {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "$background",
  borderWidth: 0,
});
