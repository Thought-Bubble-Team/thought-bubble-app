// Libraries Imports
import { useEffect, useState } from "react";
import { Spinner, styled, View, XStack } from "tamagui";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Alert, RefreshControl } from "react-native";

// Components Imports
import MyView from "@/components/Micro/MyView";
import MyScrollView from "@/components/Micro/MyScrollView";
import Text from "@/components/Micro/Text";
import { JournalCard, JournalEntryType } from "@/components/Cards";
import { NoSession } from "@/components/Sessions";
import Header from "@/components/Micro/Header";
import { Button } from "@/components/Micro/Button";
import Modal from "@/components/Micro/Modal";
import AlertDialog from "@/components/Macro/AlertDialog";

// Utilities Imports
import { formatDate, splitFormattedDate } from "@/utils/dateFormat";
import { supabase } from "@/utils/supabase/supabase";
import {
  deleteJournalEntry,
  getAllJournalEntries,
} from "@/utils/supabase/db-crud";
import { useSessionStore } from "@/utils/stores/useSessionStore";

export default function Journals() {
  const session = useSessionStore((state) => state.session);
  const setSession = useSessionStore((state) => state.setSession);
  const [journals, setJournals] = useState<JournalEntryType[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    refresh();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getAllJournalEntries();
        if (data && Array.isArray(data.data)) {
          setJournals([...data.data]);
        } else {
          Alert.alert("Error", "Failed to fetch journal entries");
        }
      } catch (e) {
        console.log("Error fetching journal entries", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

  if (loading) {
    return (
      <MainView>
        <Container>
          <Header>
            <Text weight="bold" fontSize="$xxxl">
              Your Journey
            </Text>
          </Header>
          <Container justifyContent="center" alignItems="center">
            <Spinner size="large" color="$grey3" testID="loading-spinner" />
          </Container>
        </Container>
      </MainView>
    );
  }

  if (journals.length === 0) {
    return (
      <MainView>
        {session && (
          <Container>
            <Header>
              <Text weight="bold" fontSize="$xxxl">
                Your Journey
              </Text>
            </Header>
            <Container justifyContent="center" alignItems="center">
              <Text weight="bold" fontSize="$xl">
                Looks like you haven't made any entries yet!
              </Text>
            </Container>
          </Container>
        )}
        {!session && <NoSession />}
      </MainView>
    );
  }

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

  const formattedDate = formatDate(journalEntry.created_at);
  const splitDate = splitFormattedDate(formattedDate);

  const handleDelete = async (entry_id: number) => {
    const { error } = await deleteJournalEntry(entry_id);

    if (error) {
      Alert.alert("Error", "Failed to delete entry");
      console.log(error);
    } else {
      Alert.alert("Success", "Entry deleted successfully");
    }
  };

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
        <XStack>
          <AlertDialog
            title="Delete Entry?"
            acceptText="Delete"
            accept={() => handleDelete(journalEntry.entry_id)}
          >
            <Button type="icon" size="$xs">
              <Button.Icon>
                <Ionicons name="trash-sharp" />
              </Button.Icon>
            </Button>
          </AlertDialog>
        </XStack>
      </EntryHeader>
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
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  margin: 0,
});
