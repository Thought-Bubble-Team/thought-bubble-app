// Libraries Imports
import { useEffect, useState } from "react";
import { Spinner } from "tamagui";
import { styled, View, XStack } from "tamagui";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Alert, RefreshControl } from "react-native";
import { router } from "expo-router";

// Components Imports
import Screen from "@/components/atoms/Screen";
import ScrollView from "@/components/atoms/ScrollView";
import Text from "@/components/atoms/Text";
import JournalCard from "@/components/macro/JournalCard";
import NoSession from "@/components/macro/NoSession";
import Header from "@/components/atoms/Header";
import { Button } from "@/components/atoms/Button";
import AlertDialog from "@/components/macro/AlertDialog";

// Utilities Imports
import { formatDate, splitFormattedDate } from "@/utils/dateFormat";
import { deleteGratitudeEntry } from "@/utils/supabase/db-crud";
import { useSessionStore } from "@/utils/stores/useSessionStore";
import { useGratitudeEntriesStore } from "@/utils/stores/useEntriesStore";
import { JournalEntryType } from "@/utils/interfaces/dataTypes";
import LoadingScreen from "@/components/macro/LoadingScreen";

export default function Gratitudes() {
  const sessionStore = useSessionStore();
  const gratitudeEntriesStore = useGratitudeEntriesStore();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [localLoading, setLocalLoading] = useState<boolean>(false);

  useEffect(() => {
    setLocalLoading(true);
    const PrepareComponent = async () => {
      try {
        if (
          gratitudeEntriesStore.gratitude_entries === null &&
          gratitudeEntriesStore.error === null
        ) {
          await gratitudeEntriesStore.fetchGratitudeEntries();
        }
        refresh();
      } catch (e) {
        console.log("Error preparing page", e);
      }
      setLocalLoading(false);
    };

    PrepareComponent();
  }, []);

  const refresh = async () => {
    setRefreshing(true);
    try {
      if (!sessionStore.session) {
        setRefreshing(false);
        return;
      }
      await gratitudeEntriesStore.fetchGratitudeEntries();
    } catch (error) {
      Alert.alert("Error", "Failed to refresh");
      console.log("Error: Gratitudes Refresh: ", error);
    }
    setRefreshing(false);
  };

  if (!sessionStore.session) {
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
          <LoadingScreen>
            {gratitudeEntriesStore.loading && (
              <Text weight="bold">Fetching Gratitude Entries</Text>
            )}
          </LoadingScreen>
        </Container>
      </MainView>
    );
  }

  return (
    <MainView>
      <Container>
        <Header>
          <Text weight="bold" fontSize="$xxxl">
            A Grateful Heart
          </Text>
        </Header>
        {gratitudeEntriesStore.error &&
          !gratitudeEntriesStore.gratitude_entries && (
            <Failed refresh={refresh} />
          )}
        {gratitudeEntriesStore.gratitude_entries ? (
          gratitudeEntriesStore.gratitude_entries.length === 0 ? (
            <Container justifyContent="center" alignItems="center">
              <Text weight="bold" fontSize="$xl">
                No gratitude entries found
              </Text>
            </Container>
          ) : (
            <ScrollView
              width="100%"
              height="100%"
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={refresh} />
              }
            >
              {gratitudeEntriesStore.gratitude_entries.map((entry) => (
                <GratitudeEntry key={entry.entry_id} gratitudeEntry={entry} />
              ))}
            </ScrollView>
          )
        ) : null}
      </Container>
    </MainView>
  );
}

interface JournalEntryProps {
  gratitudeEntry: JournalEntryType;
}

const GratitudeEntry = (props: JournalEntryProps) => {
  const { gratitudeEntry } = props;

  const formattedDate = formatDate(gratitudeEntry.created_at);
  const splitDate = splitFormattedDate(formattedDate);

  const handleDelete = async (entry_id: number) => {
    try {
      await deleteGratitudeEntry(entry_id);
      Alert.alert("Success", "Entry deleted successfully");
    } catch (error) {
      Alert.alert("Error", "Failed to delete entry");
      console.log(error);
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
            accept={() => handleDelete(gratitudeEntry.entry_id)}
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
            pathname: "/notepad/[id]/edit",
            params: { id: gratitudeEntry.entry_id, type: "editGratitude" },
          })
        }
      >
        <Button.Icon>
          <JournalCard journalEntry={gratitudeEntry} maxHeight="$16" />
        </Button.Icon>
      </Button>
    </EntryContainer>
  );
};

const Failed = ({ refresh }: { refresh: () => void }) => {
  return (
    <Container justifyContent="center" alignItems="center">
      <Text weight="bold" fontSize="$xl">
        Failed to load gratitude entries
      </Text>
      <Button type="normal" onPress={() => refresh()}>
        <Button.Text>Retry</Button.Text>
      </Button>
    </Container>
  );
};

const MainView = styled(Screen, {
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
