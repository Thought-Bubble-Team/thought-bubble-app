// Libraries Import
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import {
  useBoolVariation,
  useLDClient,
} from "@launchdarkly/react-native-client-sdk";

// Components Import
import MyScrollView from "@/components/Micro/MyScrollView";
import MyView from "@/components/Micro/MyView";
import MyCard from "@/components/Micro/MyCard";
import Text from "@/components/Micro/Text";
import ReoccurringWords from "@/components/Macro/ReoccurringWords";
import MoodCalendar from "@/components/Macro/MoodCalendar/MoodCalendar";
import MySelect from "@/components/Micro/MySelect";
import Header from "@/components/Micro/Header";
import { Button } from "@/components/Micro/Button";

// Utilities Import
import { useSessionStore } from "@/utils/stores/useSessionStore";
import { router } from "expo-router";
import { supabase } from "@/utils/supabase/supabase";
import { Separator } from "tamagui";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const startYear = 2025;
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();

const dateOptions: { id: number; date: string }[] = [];
for (let year = startYear; year <= currentYear; year++) {
  for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
    if (year === currentYear && monthIndex > currentMonth) break;
    dateOptions.push({
      id: dateOptions.length,
      date: `${months[monthIndex]} ${year}`,
    });
  }
}

export default function Index() {
  const [val, setVal] = useState<string>("Jan 2025");
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

  useEffect(() => {
    const Prepare = async () => {
      try {
        setLoading(true);
        ldc
          .identify({ kind: "user", key: "example-user-key", name: "Sandy" })
          .catch((e: any) => Alert.alert(("Error: " + e) as string));

        supabase.auth.getSession().then(({ data: { session } }) => {
          setSession(session);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
          setSession(session);
        });
      } catch (error) {
        console.log("Error: ", error);
      } finally {
        setLoading(false);
      }
    };

    Prepare();
  }, []);

  return (
    <MyView
      paddingHorizontal={"$3"}
      paddingVertical={"$1"}
      backgroundColor={"$background"}
    >
      <Header>
        <Text weight="bold" fontSize="$xxxl" color={"$black"}>
          Hello, User!
        </Text>
        <MySelect
          color={"$black"}
          opacity={0.57}
          val={val}
          setVal={setVal}
          date={dateOptions}
        />
      </Header>
      <MyScrollView width={"100%"} height={"100%"}>
        {FEATURE_FLAGS.DASHBOARD_CHARTS.REOCCURRING_WORDS && (
          <MyCard headerTitle="Reoccuring Words">
            {session && (
              <ReoccurringWords
              // Disable pre v0.1.0
              // onPress={() =>
              //   router.navigate({
              //     pathname: "/graph/[id]/reoccurring-words",
              //     params: { id: session.user.id },
              //   })
              // }
              />
            )}
            {!session && (
              <Text>Please Login to see your Reoccurring Words data</Text>
            )}
          </MyCard>
        )}
        <MyCard headerTitle="Mood Calendar">
          {session && (
            <MoodCalendar
              initialDate={val}
              // Disable pre v0.1.0
              // onPress={() =>
              //   router.navigate({
              //     pathname: "/graph/[id]/mood-calendar",
              //     params: { id: session.user.id },
              //   })
              // }
            />
          )}
          {!session && <Text>Please Login to see your Mood Calendar data</Text>}
        </MyCard>
      </MyScrollView>
    </MyView>
  );
}
