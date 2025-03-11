// Libraries Import
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import {
  useBoolVariation,
  useLDClient,
} from "@launchdarkly/react-native-client-sdk";

// Components Import
import ScrollView from "@/components/atoms/ScrollView";
import Screen from "@/components/atoms/Screen";
import Text from "@/components/atoms/Text";
import ReoccurringWords from "@/components/macro/ReoccurringWords";
import MoodCalendar from "@/components/macro/MoodCalendar/MoodCalendar";
import Select from "@/components/atoms/Select";
import Header from "@/components/atoms/Header";
import VectorIcons from "@/components/Icons/VectorIcons";

// Utilities Import
import { useSessionStore } from "@/utils/stores/useSessionStore";
import { useSelectedDateStore } from "@/utils/stores/useSelectedDateStore";
import { supabase } from "@/utils/supabase/supabase";
import { getMonthYearList } from "@/utils/dateFormat";
import Onboarding from "@/components/macro/Onboarding";

export default function Index() {
  const selectedDate = useSelectedDateStore((state) => state.selectedDate);
  const setSelectedDate = useSelectedDateStore(
    (state) => state.setSelectedDate
  );
  const [loading, setLoading] = useState<boolean>(false);
  const session = useSessionStore((state) => state.session);
  const setSession = useSessionStore((state) => state.setSession);

  const FEATURE_FLAGS = {
    DASHBOARD_CHARTS: {
      REOCCURRING_WORDS: useBoolVariation("reoccurring-words", false),
      MOOD_BAR: useBoolVariation("mood-bar", false),
      MOOD_CALENDAR: useBoolVariation("mood-calendar", false),
      MOOD_FLOW: useBoolVariation("mood-flow", false),
    },
    VERSION: {
      v010: useBoolVariation("v0.1.0", false),
    },
  };

  const ldc = useLDClient();
  const dateOptions = getMonthYearList();

  useEffect(() => {
    const Prepare = async () => {
      try {
        setLoading(true);
        ldc
          .identify({ kind: "user", key: "example-user-key", name: "Sandy" })
          .catch((e: any) => Alert.alert(("Error: " + e) as string));

        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session) {
          setSession(session);
          setLoading(false);
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    Prepare();
  }, []);

  return (
    <Screen
      paddingHorizontal={"$3"}
      paddingVertical={"$1"}
      backgroundColor={"$background"}
      justifyContent="flex-start"
    >
      {/**
      <Header>
        <Text weight="bold" fontSize="$xxxl" color={"$black"}>
          Hello, User!
        </Text>
        <Select
          color={"$black"}
          opacity={0.57}
          val={selectedDate}
          setVal={setSelectedDate}
          date={dateOptions}
        />
      </Header>
      **/}
      <Screen>
        <VectorIcons size={300} icon="construction" />
        <Text weight="bold" fontSize="$lg">
          PAGE IS UNDER CONSTRUCTION
        </Text>
        <Onboarding />
      </Screen>
    </Screen>
  );
}
