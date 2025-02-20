// Style Imports
import { styled, View, XStack, Button } from "tamagui";
import Ionicons from "@expo/vector-icons/Ionicons";

// Components Imports
import MyView from "@/components/Micro/MyView";
import MyScrollView from "@/components/Micro/MyScrollView";
import Text from "@/components/Micro/Text";
import { JournalCard, JournalEntryType } from "@/components/Cards";
import { NoSession } from "@/components/Sessions";
import Header from "@/components/Micro/Header";

// Utilities Imports
import { useEffect, useRef, useState } from "react";
import { formatDate, splitFormattedDate } from "@/utils/dateFormat";
import { supabase } from "@/utils/supabase/supabase";
import { getAllJournalEntries } from "@/utils/supabase/db-crud";
import { Alert, RefreshControl, TouchableOpacity } from "react-native";
import { useSessionStore } from "@/utils/stores/useSessionStore";
import Modal from "@/components/Micro/Modal";
import JournalForm from "@/components/Macro/JournalForm";

export default function Journals() {
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
            <Text weight="bold" fontSize={30} color={"$textColor"}>
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
  const [modalVisible, setModalVisible] = useState<boolean>(false);

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
          <Text weight="bold" fontSize={20} color={"$textColor"}>
            {splitDate[0]}
          </Text>
          <Text weight="bold" fontSize={20} color={"$subtleTextColor"}>
            {splitDate[1]}
          </Text>
        </XStack>
        <ButtonStyled>
          <Ionicons name="settings-outline" size={18} color="#443E3B" />
        </ButtonStyled>
      </EntryHeader>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <JournalCard journalEntry={journalEntry}></JournalCard>
      </TouchableOpacity>
      <Modal modalVisible={modalVisible} setModalVisible={setModalVisible}>
        <JournalForm
          journalEntry={journalEntry}
          setModalVisible={setModalVisible}
        />
      </Modal>
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
