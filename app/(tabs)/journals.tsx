import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/utils/supabase/supabase";
import { Session } from "@supabase/supabase-js";
import { styled, View, XStack, Button } from "tamagui";
import Ionicons from "@expo/vector-icons/Ionicons";

import MyView from "@/components/MyView";
import MyScrollView from "@/components/MyScrollView";
import MyText from "@/components/MyText";
import { JournalCard, JournalEntryType } from "@/components/Cards";
import { NoSession } from "@/components/Sessions";

import { formatDate, splitFormattedDate } from "@/utils/dateFormat";

const journalEntrySample: JournalEntryType = {
  entry_id: 1,
  title: "Today's Journal",
  mood: "happy",
  created_at: "2025-01-28 06:43:22.077857",
  updated_at: "2025-01-28 06:43:22.077857",
  content:
    "Today was a good day. I had a lot of fun with my friends and family. I'm grateful for the time I spent with them.",
};

export default function Journals() {
  const [session, setSession] = useState<Session | null>(null);
  const [journals, setJournals] = useState<JournalEntryType[]>([
    journalEntrySample,
  ]);

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
      {session && (
        <View width={"100%"} height={"100%"}>
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
            {journals.map((journalEntrySample) => (
              <JournalEntry
                key={journalEntrySample.entry_id}
                journalEntry={journalEntrySample}
              />
            ))}
          </MyScrollView>
        </View>
      )}
      {!session && <NoSession />}
    </MyView>
  );
}

interface JournalEntryProps {
  journalEntry: JournalEntryType;
}

const JournalEntry = (props: JournalEntryProps) => {
  const { journalEntry } = props;

  const formattedDate = formatDate(journalEntry.created_at);

  const splitDate = splitFormattedDate(formattedDate);

  return (
    <View display="flex" flexDirection="column" marginTop={"$4"} gap={0}>
      <View
        width={"100%"}
        paddingHorizontal={"$4"}
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        margin={0}
      >
        <XStack>
          <MyText bold fontSize={20} color={"$textColor"}>
            {splitDate[0]}
          </MyText>
          <MyText bold fontSize={20} color={"$subtleTextColor"}>
            {splitDate[1]}
          </MyText>
        </XStack>
        <ButtonStyled>
          <Ionicons name="settings-outline" size={18} color="#443E3B" />
        </ButtonStyled>
      </View>
      <JournalCard journalEntry={journalEntrySample}></JournalCard>
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
