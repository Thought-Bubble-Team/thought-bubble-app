// Libraries Imports
import { useEffect, useState } from "react";
import { Spinner, useTheme } from "tamagui";
import { styled, View, XStack } from "tamagui";

// Components Imports
import MyView from "@/components/atoms/MyView";
import MyScrollView from "@/components/atoms/MyScrollView";
import Text from "@/components/atoms/Text";
import { JournalCard, JournalEntryType } from "@/components/Cards";
import { NoSession } from "@/components/Sessions";
import Header from "@/components/atoms/Header";
import { Button } from "@/components/atoms/Button";

// Utilities Imports
import { formatDate, splitFormattedDate } from "@/utils/dateFormat";
import {
  deleteGratitudeEntry,
  getAllGratitudeEntries,
} from "@/utils/supabase/db-crud";
import { Alert, RefreshControl } from "react-native";
import { useSessionStore } from "@/utils/stores/useSessionStore";
import AlertDialog from "@/components/Macro/AlertDialog";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Gratitudes() {
  const session = useSessionStore((state) => state.session);
  const [gratitudes, setGratitudes] = useState<JournalEntryType[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const data = await getAllGratitudeEntries();
        if (data && Array.isArray(data.data)) {
          setGratitudes([...data.data]);
          setLoading(false);
        } else {
          Alert.alert("Error", "Failed to fetch gratitude entries");
        }
      } catch (e) {
        console.log("Error fetching gratitude entries", e);
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
    getAllGratitudeEntries().then((data) => {
      if (data && Array.isArray(data.data)) {
        setGratitudes([...data.data]);
        setRefreshing(false);
      } else {
        Alert.alert("Error", "Failed to fetch gratitude entries");
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
          {gratitudes.length === 0 && (
            <Container justifyContent="center" alignItems="center">
              <Text weight="bold" fontSize="$xl">
                Looks like you haven't written any gratitude entries yet!
              </Text>
            </Container>
          )}
          {gratitudes.length > 0 && (
            <MyScrollView
              width={"100%"}
              height={"100%"}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={refresh} />
              }
            >
              {gratitudes.map((gratitudeEntry) => (
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
    const { error } = await deleteGratitudeEntry(entry_id);

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
      <JournalCard journalEntry={gratitudeEntry}></JournalCard>
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
