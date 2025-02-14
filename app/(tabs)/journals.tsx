// Style Imports
import { styled, View, XStack, Button, setupNativeSheet } from "tamagui";
import Ionicons from "@expo/vector-icons/Ionicons";

// Components Imports
import ScreenView from "@/components/Micro/ScreenView";
import MyScrollView from "@/components/Micro/MyScrollView";
import { Text, FontFamily } from "@/components/Micro/Text";
import { JournalCard, JournalEntryType } from "@/components/Cards";
import { NoSession } from "@/components/Sessions";
import Header from "@/components/Micro/Header";

// Utilities Imports
import { useEffect, useState } from "react";
import { formatDate, splitFormattedDate } from "@/utils/dateFormat";
import { supabase } from "@/utils/supabase/supabase";
import { getAllJournalEntries } from "@/utils/supabase/db-crud";
import { Alert, RefreshControl, TouchableOpacity } from "react-native";
import { useSessionStore } from "@/utils/stores/useSessionStore";

export default function Journals() {
  const session = useSessionStore((state) => state.session);
  const setSession = useSessionStore((state) => state.setSession);
  const [journals, setJournals] = useState<JournalEntryType[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    getAllJournalEntries().then((data) => {
      if (data && Array.isArray(data.data)) {
        setJournals([...data.data]);
      } else {
        Alert.alert("Error", "Failed to fetch journal entries");
      }
    });
  }, []);

  const refresh = () => {
    setRefreshing(true);
    getAllJournalEntries().then((data) => {
      if (data && Array.isArray(data.data)) {
        setJournals([...data.data]);
        setRefreshing(false);
      } else {
        Alert.alert("Error", "Failed to fetch journal entries");
        setRefreshing(false);
      }
    });
  };

  return (
    <ScreenView>
      {session && (
        <Container>
          <Header>
            <Text h1 weight={FontFamily.Bold}>
              Your Journey
            </Text>
          </Header>
          <MyScrollView
            width={"100%"}
            height={"100%"}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={refresh} />
            }
          >
            {journals.map((journalEntrySample) => (
              <JournalEntry
                key={journalEntrySample.entry_id}
                journalEntry={journalEntrySample}
              />
            ))}
          </MyScrollView>
        </Container>
      )}
      {!session && <NoSession />}
    </ScreenView>
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
    <EntryContainer
      borderBottomColor={"$subtleTextColor"}
      borderBottomWidth={1}
      paddingVertical={"$3"}
    >
      <EntryHeader>
        <XStack>
          <Text h1 weight={FontFamily.Bold}>
            {splitDate[0]}
          </Text>
          <Text h1 weight={FontFamily.Bold}>
            {splitDate[1]}
          </Text>
        </XStack>
        <ButtonStyled>
          <Ionicons name="settings-outline" size={18} color="#443E3B" />
        </ButtonStyled>
      </EntryHeader>
      <JournalCard journalEntry={journalEntry}></JournalCard>
    </EntryContainer>
  );
};

const Container = styled(View, {
  width: "100%",
  height: "100%",
});

const RefreshContainer = styled(View, {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  gap: "$4",
  padding: "$4",
});

const EntryContainer = styled(View, {
  display: "flex",
  flexDirection: "column",
  gap: 0,
});

const EntryHeader = styled(View, {
  width: "100%",
  paddingHorizontal: "$4",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  margin: 0,
});

const ButtonStyled = styled(Button, {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "$background",
  borderWidth: 0,
});
