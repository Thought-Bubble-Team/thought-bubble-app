import Ionicons from "@expo/vector-icons/Ionicons";

// Components Import
import MyScrollView from "@/components/Micro/MyScrollView";
import MyView from "@/components/Micro/MyView";
import MyCard from "@/components/Micro/MyCard";
import Text from "@/components/Micro/Text";
import ReoccurringWords from "@/components/Macro/ReoccurringWords";
import MySelect from "@/components/Micro/MySelect";
import Header from "@/components/Micro/Header";
import { Button } from "@/components/Micro/Button";

// Utilities Import
import { useEffect, useRef, useState } from "react";
import { Alert } from "react-native";
import {
  useBoolVariation,
  useLDClient,
} from "@launchdarkly/react-native-client-sdk";

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
  const buttonRef = useRef(null);
  const [loading, setLoading] = useState<boolean>(false);

  const FEATURE_FLAGS = {
    DASHBOARD_CHARTS: {
      REOCCURRING_WORDS: useBoolVariation("reoccurring-words", false),
      MOOD_BAR: useBoolVariation("mood-bar", false),
      MOOD_CALENDAR: useBoolVariation("mood-calendar", false),
      MOOD_FLOW: useBoolVariation("mood-flow", false),
    },
  };

  const ldc = useLDClient();

  useEffect(() => {
    // Identifies these components as this
    ldc
      .identify({ kind: "user", key: "example-user-key", name: "Sandy" })
      .catch((e: any) => Alert.alert(("Error: " + e) as string));
  }, []);

  const handlePress = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

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
      <Button type={"normal"}>
        <Button.Text>Hello There</Button.Text>
        <Button.Icon>
          <Ionicons name={"search"} />
        </Button.Icon>
      </Button>
      <MyScrollView width={"100%"} height={"100%"}>
        {FEATURE_FLAGS.DASHBOARD_CHARTS.REOCCURRING_WORDS && (
          <MyCard headerTitle="Reoccuring Words">
            <ReoccurringWords />
          </MyCard>
        )}
        {FEATURE_FLAGS.DASHBOARD_CHARTS.MOOD_CALENDAR && (
          <MyCard headerTitle="Mood Calendar">
            <Text>{val}</Text>
          </MyCard>
        )}
        {FEATURE_FLAGS.DASHBOARD_CHARTS.MOOD_FLOW && (
          <MyCard headerTitle="Mood Flow">
            <Text>Kunwari may Graph</Text>
          </MyCard>
        )}
        {FEATURE_FLAGS.DASHBOARD_CHARTS.MOOD_BAR && (
          <MyCard headerTitle="Mood Bar">
            <Text>Mood Bar</Text>
          </MyCard>
        )}
      </MyScrollView>
    </MyView>
  );
}
