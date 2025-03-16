import { useMoodBarDataStore } from "@/utils/stores/useChartDataStore";
import { Card } from "../atoms/Card";
import { MoodBarChart } from "./MoodBarChart";
import { useSessionStore } from "@/utils/stores/useSessionStore";
import { MoodBarProps } from "@/utils/interfaces/componentPropTypes";
import { parseInitialDate } from "@/utils/dateFormat";
import { useEffect } from "react";
import { Spinner } from "tamagui";
import Text from "../atoms/Text";

const MoodBar = ({ initial_date }: MoodBarProps) => {
  const sessionStore = useSessionStore();
  const moodBarStore = useMoodBarDataStore();

  const currentMonth = parseInitialDate(initial_date);

  useEffect(() => {
    const Prepare = async () => {
      try {
        if (!sessionStore.session) {
          return;
        }

        await moodBarStore.fetchMoodBarData(
          sessionStore.session.user.id as string,
          currentMonth.getMonth() + 1,
          currentMonth.getFullYear()
        );

        if (moodBarStore.moodBarData) {
          console.log("Mood Bar Data: ", moodBarStore.moodBarData);
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    Prepare();
  }, []);

  return (
    <Card marginVertical="$3">
      <Card.Header>
        <Card.HeaderText>MoodBar</Card.HeaderText>
      </Card.Header>
      <Card.Body>
        {moodBarStore.loading && <Spinner size="large" color="$primary" />}
        {!moodBarStore.loading && moodBarStore.moodBarData && (
          <MoodBarChart emotion_summary={moodBarStore.moodBarData.emotions} />
        )}
        {!moodBarStore.loading &&
          moodBarStore.moodBarData?.emotions.length === 0 && (
            <Text weight="bold" fontSize="$sm">
              No data available
            </Text>
          )}
      </Card.Body>
    </Card>
  );
};

export default MoodBar;
