import { useMoodBarDataStore } from "@/utils/stores/useChartDataStore";
import { Card } from "../atoms/Card";
import { MoodBarChart } from "./MoodBarChart";
import { MoodBarProps } from "@/utils/interfaces/componentPropTypes";
import { parseDateToMonthYear } from "@/utils/dateFormat";
import { useEffect } from "react";
import { Spinner } from "tamagui";
import Text from "../atoms/Text";
import { Button } from "../atoms/Button";
import { router } from "expo-router";
import { useSelectedDateStore } from "@/utils/stores/useSelectedDateStore";

const MoodBar = ({ initial_date }: MoodBarProps) => {
  const selectedDate = useSelectedDateStore((state) => state.selectedDate);
  const moodBarStore = useMoodBarDataStore();

  const stringDate = parseDateToMonthYear(selectedDate);

  useEffect(() => {
    const prepareComponent = () => {
      moodBarStore.setDate(selectedDate);
    };
    prepareComponent();
  }, [selectedDate]);

  return (
    <Card marginVertical="$3">
      <Card.Header>
        <Card.HeaderText fontSize="$lg">MoodBar</Card.HeaderText>
      </Card.Header>
      <Card.Body>
        {moodBarStore.loading && <Spinner size="large" color="$primary" />}
        {!moodBarStore.loading &&
          moodBarStore.moodBarData &&
          (moodBarStore.moodBarData.emotions.length > 0 ? (
            <Button
              type="icon"
              onPress={() =>
                router.push({
                  pathname: "/graph/[id]/mood-bar",
                  params: { id: stringDate },
                })
              }
            >
              <MoodBarChart
                emotion_summary={moodBarStore.moodBarData.emotions}
              />
            </Button>
          ) : (
            <Text weight="bold" fontSize="$sm">
              No data available
            </Text>
          ))}
      </Card.Body>
    </Card>
  );
};

export default MoodBar;
