// Libraries Imports
import { useEffect, useState } from "react";
import { Spinner, styled, View, XStack } from "tamagui";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Alert, RefreshControl } from "react-native";
import { router } from "expo-router";

// Components Imports
import MyView from "@/components/atoms/MyView";
import MyScrollView from "@/components/atoms/MyScrollView";
import Text from "@/components/atoms/Text";
import { JournalCard } from "@/components/Cards";
import { NoSession } from "@/components/Sessions";
import Header from "@/components/atoms/Header";
import { Button } from "@/components/atoms/Button";
import AlertDialog from "@/components/Macro/AlertDialog";

// Utilities Imports
import { formatDate, splitFormattedDate } from "@/utils/dateFormat";
import { deleteJournalEntry } from "@/utils/supabase/db-crud";
import { useSessionStore } from "@/utils/stores/useSessionStore";
import { JournalEntryType } from "@/utils/interfaces/dataTypes";
import { useJournalEntriesStore } from "@/utils/stores/useEntriesStore";

export default function Journals() {
  const session = useSessionStore((state) => state.session);
  const { journal_entries, fetchJournalEntries } = useJournalEntriesStore();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [localLoading, setLocalLoading] = useState<boolean>(false);

  useEffect(() => {
    setLocalLoading(true);
    const PrepareComponent = async () => {
      try {
        if (journal_entries === null) {
          await fetchJournalEntries();
        }
        setLocalLoading(false);
        void refresh();
      } catch (e) {
        console.log("Error preparing page", e);
      }
    };

    void PrepareComponent();
  }, [session]);

  const refresh = async () => {
    setRefreshing(true);
    try {
      await fetchJournalEntries();
      setRefreshing(false);
    } catch (error) {
      Alert.alert("Error", "Failed to refresh");
      console.log("Error: Journals Refresh: ", error);
      setRefreshing(false);
    }
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

  if (localLoading) {
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
        {journal_entries && journal_entries.length === 0 && (
          <Container justifyContent="center" alignItems="center">
            <Text weight="bold" fontSize="$xl">
              No journal entries found
            </Text>
          </Container>
        )}
        {journal_entries && journal_entries.length > 0 && (
          <MyScrollView
            width={"100%"}
            height={"100%"}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={refresh} />
            }
          >
            {journal_entries &&
              journal_entries.map((journalEntrySample) => (
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
      <Button
        type="icon"
        padding={0}
        onPress={() =>
          router.navigate({
            pathname: "/journals/[id]/summary",
            params: {
              id: journalEntry.entry_id,
              type: "editJournal",
              title: journalEntry.title,
            },
          })
        }
      >
        <Button.Icon>
          <JournalCard
            journalEntry={journalEntry}
            maxHeight="$16"
          ></JournalCard>
        </Button.Icon>
      </Button>
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
