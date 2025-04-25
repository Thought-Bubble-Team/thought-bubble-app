// Libraries Imports
import React, { useEffect, useState } from "react";
import { styled, View, XStack } from "tamagui";
import { Alert, RefreshControl } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

// Components Imports
import NoSession from "@/components/macro/NoSession";
import { Button } from "@/components/atoms/Button";
import Screen from "@/components/atoms/Screen";
import ScrollView from "@/components/atoms/ScrollView";
import Text from "@/components/atoms/Text";
import JournalCard from "@/components/macro/JournalCard";
import Header from "@/components/atoms/Header";

// Utilities Imports
import {
  formatDate,
  getMonthList,
  splitFormattedDate,
  getDaysInMonth,
  getSortOptions,
} from "@/utils/dateFormat";
import { deleteJournalEntry } from "@/utils/supabase/db-crud";
import { useSessionStore } from "@/utils/stores/useSessionStore";
import { JournalEntryType } from "@/utils/interfaces/dataTypes";
import { useJournalEntriesStore } from "@/utils/stores/useEntriesStore";
import LoadingScreen from "@/components/macro/LoadingScreen";
import Modal from "@/components/atoms/Modal";
import List from "@/components/atoms/List";
import Select from "@/components/atoms/Select";
import { getHighestEmotion } from "@/components/macro/JournalCard";

export default function Journals() {
  const session = useSessionStore((state) => state.session);
  const sessionStore = useSessionStore();
  const journalEntriesStore = useJournalEntriesStore();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [localLoading, setLocalLoading] = useState<boolean>(false);
  const params = useLocalSearchParams();

  // Filtering
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [month, setMonth] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [sort, setSort] = useState<string>("dsc");

  // Add month name to number mapping
  const monthToNumber: { [key: string]: number } = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };

  // Handle URL parameter changes
  useEffect(() => {
    if (params.month) {
      const monthNames = Object.keys(monthToNumber);
      setMonth(monthNames[parseInt(params.month.toString())]);
      setShowFilter(true);
    }
    if (params.day) {
      setDay(params.day.toString());
      setShowFilter(true);
    }
  }, [params.month, params.day]);

  const resetFilter = () => {
    setMonth("");
    setDay("");
    setSort("asc");
    setShowFilter(false);
  };

  useEffect(() => {
    setLocalLoading(true);
    const prepareComponent = async () => {
      try {
        if (
          journalEntriesStore.journal_entries === null &&
          journalEntriesStore.error === null &&
          session
        ) {
          useJournalEntriesStore
            .getState()
            .fetchJournalEntries(session.user.id);
        }
        setLocalLoading(false);
        void refresh();
      } catch (e) {
        console.log("Error preparing page", e);
      }
    };

    sessionStore.listener();

    prepareComponent();
  }, []);

  const refresh = async () => {
    setRefreshing(true);
    try {
      if (!session) {
        setRefreshing(false);
        return;
      }
      await journalEntriesStore.fetchJournalEntries(session.user.id);
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
          <LoadingScreen>
            {journalEntriesStore.loading && (
              <Text weight="bold">Fetching Journal Entries</Text>
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
            Your Journey
          </Text>
        </Header>
        <XStack>
          <Button type="icon" onPress={() => setShowFilter(!showFilter)}>
            <Button.Text>Filter</Button.Text>
          </Button>
          {showFilter && (
            <Button type="icon" onPress={() => resetFilter()}>
              <Button.Text>Reset Filter</Button.Text>
            </Button>
          )}
        </XStack>
        {/** Filter */}
        {showFilter && (
          <XStack>
            <Select
              color="$black"
              opacity={0.57}
              val={month}
              setVal={setMonth}
              date={getMonthList()}
              placeholder="Month"
            />
            <Select
              color="$black"
              opacity={0.57}
              val={day}
              setVal={setDay}
              date={getDaysInMonth(month)}
              placeholder="Day"
            />
            <Select
              color="$black"
              opacity={0.57}
              val={sort}
              setVal={setSort}
              date={getSortOptions()}
              placeholder="Sort"
            />
          </XStack>
        )}
        {journalEntriesStore.error && !journalEntriesStore.journal_entries && (
          <Failed refresh={refresh} />
        )}
        {journalEntriesStore.journal_entries ? (
          journalEntriesStore.journal_entries.length === 0 ? (
            <Container justifyContent="center" alignItems="center">
              <Text weight="bold" fontSize="$xl">
                No journal entries found
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
              {journalEntriesStore.journal_entries
                .filter((entry) => {
                  // If both month and day are empty strings, show all entries
                  if (!month && !day) return true;

                  const entryDate = new Date(entry.created_at);
                  const entryMonth = entryDate.getMonth();
                  const entryDay = entryDate.getDate().toString();

                  // Only apply month filter if month is selected
                  const monthMatch =
                    !month || entryMonth === monthToNumber[month];
                  // Only apply day filter if day is selected and not "All"
                  const dayMatch = !day || day === "All" || entryDay === day;

                  return monthMatch && dayMatch;
                })
                .sort((a, b) => {
                  const dateA = new Date(a.created_at);
                  const dateB = new Date(b.created_at);
                  return sort === "asc"
                    ? dateA.getTime() - dateB.getTime()
                    : dateB.getTime() - dateA.getTime();
                })
                .map((entry) => (
                  <JournalEntry
                    key={entry.entry_id}
                    journalEntry={entry}
                    refresh={refresh}
                  />
                ))}
            </ScrollView>
          )
        ) : null}
      </Container>
    </MainView>
  );
}

interface JournalEntryProps {
  journalEntry: JournalEntryType;
  refresh: () => Promise<void>;
}

const JournalEntry = (props: JournalEntryProps) => {
  const { journalEntry, refresh } = props;
  const [showModal, setShowModal] = useState<boolean>(false);

  const formattedDate = formatDate(journalEntry.created_at);
  const splitDate = splitFormattedDate(formattedDate);

  const handleDelete = async (entry_id: number) => {
    try {
      await deleteJournalEntry(entry_id);
      Alert.alert("Success", "Entry deleted successfully");
      setShowModal(false);
      refresh();
    } catch {
      Alert.alert("Error", "Failed to delete entry. Please try again later");
    }
  };

  const Options = [
    <Button
      type="list"
      size="$xl"
      onPress={() => handleDelete(journalEntry.entry_id)}
    >
      <Button.Text>Delete</Button.Text>
    </Button>,
    <Button
      type="list"
      size="$xl"
      onPress={() => Alert.alert("Sorry", "Updating is currently disabled")}
    >
      <Button.Text>Update</Button.Text>
    </Button>,
  ];

  return (
    <EntryContainer>
      <Modal modalVisible={showModal} setModalVisible={setShowModal}>
        <List items={Options} />
      </Modal>
      <EntryHeader marginVertical="$2">
        <XStack>
          <Text weight="bold" fontSize="$xl">
            {splitDate[0]}
          </Text>
          <Text weight="bold" fontSize="$xl" opacity={0.57}>
            {splitDate[1]}
          </Text>
        </XStack>
      </EntryHeader>
      <Button
        type="icon"
        padding={0}
        onPress={() =>
          router.push({
            pathname: "/journals/[id]/summary",
            params: {
              id: journalEntry.entry_id,
              type: "editJournal",
              title: journalEntry.title,
            },
          })
        }
        onLongPress={() => setShowModal(true)}
      >
        <JournalCard
          journalEntry={journalEntry}
          maxHeight="$16"
          showSentimentData={false}
        />
      </Button>
    </EntryContainer>
  );
};

const Failed = ({ refresh }: { refresh: () => void }) => {
  return (
    <Container justifyContent="center" alignItems="center">
      <Text weight="bold" fontSize="$xl">
        Failed to load journal entries
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
  marginTop: "$3",
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
