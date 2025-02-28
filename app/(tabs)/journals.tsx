// Style Imports
import { styled, View, XStack } from "tamagui";

// Components Imports
import MyView from "@/components/Micro/MyView";
import MyScrollView from "@/components/Micro/MyScrollView";
import Text from "@/components/Micro/Text";
import { JournalCard, JournalEntryType } from "@/components/Cards";
import { NoSession } from "@/components/Sessions";
import Header from "@/components/Micro/Header";
import { Button } from "@/components/Micro/Button";
import Modal from "@/components/Micro/Modal";
import JournalForm from "@/components/Macro/JournalForm";

// Utilities Imports
import { useEffect, useState } from "react";
import { formatDate, splitFormattedDate } from "@/utils/dateFormat";
import { supabase } from "@/utils/supabase/supabase";
import { getAllJournalEntries } from "@/utils/supabase/db-crud";
import { Alert, RefreshControl, TouchableOpacity } from "react-native";
import { useSessionStore } from "@/utils/stores/useSessionStore";
import { useTheme } from "tamagui";
import { router } from "expo-router";

export default function Journals() {
  const theme = useTheme();
  const session = useSessionStore((state) => state.session);
  const setSession = useSessionStore((state) => state.setSession);
  const [journals, setJournals] = useState<JournalEntryType[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    refresh();
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
    <MainView>
      {session && (
        <Container>
          <Header>
            <Text weight="bold" fontSize="$xxxl">
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
    </MainView>
  );
}

interface JournalEntryProps {
  journalEntry: JournalEntryType;
}

const JournalEntry = (props: JournalEntryProps) => {
  const { journalEntry } = props;
  const theme = useTheme();

  const formattedDate = formatDate(journalEntry.created_at);
  const splitDate = splitFormattedDate(formattedDate);

  return (
    <EntryContainer>
      <EntryHeader>
        <XStack>
          <Text weight="bold" fontSize="$xl">
            {splitDate[0]}
          </Text>
          <Text weight="bold" fontSize="$xl" opacity={0.57}>
            {splitDate[1]}
          </Text>
        </XStack>
      </EntryHeader>
      {/* <TouchableOpacity onPress={() => setModalVisible(true)}>
        <JournalCard journalEntry={journalEntry}></JournalCard>
      </TouchableOpacity> */}
      {/* <Modal modalVisible={modalVisible} setModalVisible={setModalVisible}>
        <JournalForm
          journalEntry={journalEntry}
          setModalVisible={setModalVisible}
        />
      </Modal> */}
      {/* <Button
        type="icon"
        onPress={() =>
          router.navigate({
            pathname: "/journals/[id]/summary",
            params: { id: journalEntry.entry_id },
          })
        }
        padding={0}
      >
        <JournalCard journalEntry={journalEntry}></JournalCard>
      </Button> */}
      <JournalCard journalEntry={journalEntry}></JournalCard>
    </EntryContainer>
  );
};

const MainView = styled(MyView, {
  paddingHorizontal: "$3",
  paddingVertical: "$1",
  backgroundColor: "$background",
});

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
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: 0,
  borderBottomColor: "$divider",
  borderBottomWidth: 1,
  paddingVertical: "$5",
});

const EntryHeader = styled(View, {
  width: "100%",
  // paddingHorizontal: "$4",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  margin: 0,
});
