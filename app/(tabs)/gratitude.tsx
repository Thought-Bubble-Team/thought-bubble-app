// Libraries Imports
import { useEffect, useState } from "react";
import { Spinner } from "tamagui";
import { styled, View, XStack } from "tamagui";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Alert, RefreshControl } from "react-native";
import { router } from "expo-router";

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
import { deleteGratitudeEntry } from "@/utils/supabase/db-crud";
import { useSessionStore } from "@/utils/stores/useSessionStore";
import { useGratitudeEntriesStore } from "@/utils/stores/useEntriesStore";

export default function Gratitudes() {
  const session = useSessionStore((state) => state.session);
  const { gratitude_entries, fetchGratitudeEntries } =
    useGratitudeEntriesStore();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [localLoading, setLocalLoading] = useState<boolean>(false);

  useEffect(() => {
    setLocalLoading(true);
    const PrepareComponent = async () => {
      try {
        if (gratitude_entries === null) {
          await fetchGratitudeEntries();
        }
        setLocalLoading(false);
        refresh();
      } catch (e) {
        console.log("Error preparing page", e);
      }
    };

    PrepareComponent();
  }, [session]);

  const refresh = async () => {
    setRefreshing(true);
    try {
      await fetchGratitudeEntries();
      setRefreshing(false);
    } catch (error) {
      Alert.alert("Error", "Failed to refresh");
      console.log("Error: Gratitudes Refresh: ", error);
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
          <Spinner size="large" color="$grey3" />
        </Container>
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
          {gratitude_entries && gratitude_entries.length === 0 && (
            <Container justifyContent="center" alignItems="center">
              <Text weight="bold" fontSize="$xl">
                Looks like you haven't written any gratitude entries yet!
              </Text>
            </Container>
          )}
          {gratitude_entries && gratitude_entries.length > 0 && (
            <MyScrollView
              width={"100%"}
              height={"100%"}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={refresh} />
              }
            >
              {gratitude_entries &&
                gratitude_entries.map((gratitudeEntry) => (
                  <GratitudeEntry
                    key={gratitudeEntry.entry_id}
                    gratitudeEntry={gratitudeEntry}
                  />
                ))}
            </MyScrollView>
          )}
        </Container>
      )}
      {!session && <NoSession />}
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
