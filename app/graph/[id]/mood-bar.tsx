import { View } from "tamagui";

import Text from "@/components/atoms/Text";
import { Navigation } from "@/components/macro/Navigation";
import EmotionDetails from "@/components/macro/EmotionDetails/EmotionDetails";
import Screen from "@/components/atoms/Screen";
import LoadingScreen from "@/components/macro/LoadingScreen";

import { useMoodBarDataStore } from "@/utils/stores/useChartDataStore";

const MoodBar = () => {
  const moodBarDataStore = useMoodBarDataStore();
  return (
    <Screen marginTop="$3">
      <Navigation title="Monthly Emotions" />
      <Screen padding={"$sm"} justifyContent="flex-start">
        <View>
          <Text weight="bold" fontSize="$lg">
            Here are your strongest emotions this month
          </Text>
        </View>
        {moodBarDataStore.loading && (
          <LoadingScreen>
            <Text>Fetching Mood Bar Data</Text>
          </LoadingScreen>
        )}
        {!moodBarDataStore.moodBarData && <Text>No Data For This Month</Text>}
        {moodBarDataStore.moodBarData && (
          <EmotionDetails
            emotion_summary={moodBarDataStore.moodBarData.emotions}
          />
        )}
      </Screen>
    </Screen>
  );
};

export default MoodBar;
