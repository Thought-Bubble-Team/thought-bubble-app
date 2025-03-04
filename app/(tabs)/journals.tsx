// Libraries Imports
import { useEffect, useState } from "react";
import { Spinner, styled, View, XStack } from "tamagui";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Alert, RefreshControl } from "react-native";

// Components Imports
import MyView from "@/components/atoms/MyView";
import MyScrollView from "@/components/atoms/MyScrollView";
import Text from "@/components/atoms/Text";
import { JournalCard, JournalEntryType } from "@/components/Cards";
import { NoSession } from "@/components/Sessions";
import Header from "@/components/atoms/Header";
import { Button } from "@/components/atoms/Button";
import AlertDialog from "@/components/Macro/AlertDialog";

// Utilities Imports
import { formatDate, splitFormattedDate } from "@/utils/dateFormat";
import {
  deleteJournalEntry,
  getAllJournalEntries,
} from "@/utils/supabase/db-crud";
import { useSessionStore } from "@/utils/stores/useSessionStore";

export default function Journals() {
  const session = useSessionStore((state) => state.session);
  const [journals, setJournals] = useState<JournalEntryType[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const data = await getAllJournalEntries();
        if (data && Array.isArray(data.data)) {
          setJournals([...data.data]);
          setLoading(false);
        } else {
          Alert.alert("Error", "Failed to fetch journal entries");
        }
      } catch (e) {
        console.log("Error fetching journal entries", e);
      }
    };

    const PrepareComponent = async () => {
      try {
        fetchData();
        refresh();
      } catch (e) {
        console.log("Error preparing page", e);
      }
    };

    PrepareComponent();
  }, [session]);

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

  if (!session) {
    return (
      <MainView>
        <Container justifyContent="center" alignItems="center">
          <NoSession />
        </Container>
      </MainView>
    );
  }

  if (loading) {
    return (
      <MainView>
        <Container justifyContent="center" alignItems="center">
          <Spinner size="large" color="$grey3" testID="loading-spinner" />
        </Container>
      </MainView>
    );
  }

  return (
    <MainView>
      <Container>
        <Header>
          <Text weight="bold" fontSize="$xxxl">
            Your Journey
          </Text>
        </Header>
        {journals.length === 0 && (
          <Container justifyContent="center" alignItems="center">
            <Text weight="bold" fontSize="$xl">
              No journal entries found
            </Text>
          </Container>
        )}
        {journals.length > 0 && (
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
        )}
      </Container>
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
  paddingVertical: "$3",
});

const EntryHeader = styled(View, {
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  margin: 0,
});
