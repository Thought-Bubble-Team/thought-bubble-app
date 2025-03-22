import { useMoodBarDataStore } from "@/utils/stores/useChartDataStore";
import { Card } from "../atoms/Card";
import { MoodBarChart } from "./MoodBarChart";
import { MoodBarProps } from "@/utils/interfaces/componentPropTypes";
import { parseInitialDate } from "@/utils/dateFormat";
import { useEffect } from "react";
import { Spinner } from "tamagui";
import Text from "../atoms/Text";
import { Button } from "../atoms/Button";
import { router } from "expo-router";

const MoodBar = ({ initial_date }: MoodBarProps) => {
  const moodBarStore = useMoodBarDataStore();

  const currentMonth = parseInitialDate(initial_date);

  useEffect(() => {
    const prepareComponent = async () => {
      moodBarStore.setDate(currentMonth);
    };
    prepareComponent();
  }, [initial_date]);

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
                  params: { id: initial_date },
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
