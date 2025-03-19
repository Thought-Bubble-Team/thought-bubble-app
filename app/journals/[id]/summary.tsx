import { View, YStack } from "tamagui";
import { useLocalSearchParams } from "expo-router";

import Text from "@/components/atoms/Text";
import Screen from "@/components/atoms/Screen";
import Header from "@/components/atoms/Header";
import { Navigation } from "@/components/macro/Navigation";
import { MoodBarChart } from "@/components/macro/MoodBarChart";
import { Button } from "@/components/atoms/Button";
import {
  createJournalAnalysis,
  getJournalSentiment,
} from "@/utils/supabase/db-crud";
import { useEffect, useState } from "react";
import { processEmotionsData } from "@/utils/others/tools";
import { Alert } from "react-native";
import LoadingScreen from "@/components/macro/LoadingScreen";
import EmotionDetails from "@/components/macro/EmotionDetails/EmotionDetails";

// TODO: Add contact numbers & divider
const Footer = ({}) => {
  return (
    <YStack
      backgroundColor="$grey3"
      width="100%"
      justifyContent="center"
      alignItems="center"
      padding="$lg"
      gap="$2.5"
    >
      <View>
        <Text fontSize={10}>
          If it ever feels like too much, there are people who can help lighten
          the load!
        </Text>
      </View>
      <View>
        <Text fontSize={10}>Something</Text>
      </View>
    </YStack>
  );
};

// TODO: Clean this
const Graph = ({
  emotion_summary,
}: {
  emotion_summary: { emotion: string; percentage: number }[];
}) => {
  return (
    <View>
      <MoodBarChart emotion_summary={emotion_summary} />
    </View>
  );
};

const Summary = () => {
  const { id } = useLocalSearchParams();
  const [localLoading, setLocalLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [analysis, setAnalysis] = useState<string>("");
  const [emotionSummary, setEmotionSummary] = useState<
    { emotion: string; percentage: number }[]
  >([]);
  const [noRecord, setNoRecord] = useState<boolean>(false);

  const handleAnalysis = async () => {
    setLocalLoading(true);
    try {
      await createJournalAnalysis(Number(id));
      Alert.alert("Success", "Analysis created successfully");
    } catch (error) {
      Alert.alert("Error", "Error creating analysis");
    }
    setLocalLoading(false);
  };

  useEffect(() => {
    const prepareSummary = async () => {
      setLoading(true);
      try {
        const result = await getJournalSentiment(Number(id));

        if (result.error && result.error.code === "PGRST116") {
          setNoRecord(true);
          setLoading(false);
          return;
        }

        if (result.result) {
          const processedEmotionSummary = processEmotionsData(
            result.result.emotions
          );
          setEmotionSummary(processedEmotionSummary);
          setAnalysis(result.result.analysis_feedback);
        }
      } catch (error) {
        Alert.alert("Error", "Error preparing summary");
      }
      setLoading(false);
    };

    prepareSummary();
  }, []);

  if (loading) {
    return (
      <Screen gap={0}>
        <Navigation title="Entry Summary" />
        <Screen
          backgroundColor="$grey0"
          padding="$lg"
          borderTopLeftRadius={"$8"}
          borderTopRightRadius={"$8"}
        >
          <LoadingScreen>
            <Text weight="bold">Loading Sentiment Analysis</Text>
          </LoadingScreen>
        </Screen>
        <Footer />
      </Screen>
    );
  }

  return (
    <Screen gap={0}>
      <Navigation title="Entry Summary" />
      <Screen
        backgroundColor="$grey0"
        padding="$lg"
        borderTopLeftRadius={"$8"}
        borderTopRightRadius={"$8"}
      >
        <Header>
          <Text weight="bold" fontSize="$xl" textAlign="center">
            Here's a breakdown of the emotions reflected in this entry
          </Text>
        </Header>
        {!noRecord && (
          <>
            <View padding="$lg">
              <Text weight="regular" fontSize="$md" textAlign="center">
                {analysis}
              </Text>
            </View>
            <View padding="$lg">
              <Graph emotion_summary={emotionSummary} />
            </View>
            <EmotionDetails emotion_summary={emotionSummary} />
          </>
        )}
        {noRecord && (
          <YStack
            width="100%"
            gap="$lg"
            padding="$lg"
            justifyContent="center"
            alignItems="center"
          >
            <Text fontSize="$lg">There is no analysis for this entry yet</Text>
            <Button type="normal" size="$md" onPress={handleAnalysis}>
              {!localLoading && <Button.Text>Analyze</Button.Text>}
              {localLoading && <Button.Spinner />}
            </Button>
          </YStack>
        )}
      </Screen>
      <Footer />
    </Screen>
  );
};

export default Summary;
