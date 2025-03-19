import Ionicons from "@expo/vector-icons/Ionicons";
import { XStack } from "tamagui";

import Text from "../atoms/Text";
import { Button } from "../atoms/Button";
import { useState } from "react";
import { submitFeedback } from "@/utils/supabase/db-crud";
import { Alert } from "react-native";

const SentimentAnalysisFeedback = ({ entry_id }: { entry_id: number }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleFeedback = async (feedback: boolean) => {
    setLoading(true);

    try {
      await submitFeedback(entry_id, feedback);
      Alert.alert("Success", "Feedback submitted successfully");
    } catch (error) {
      console.error("Error submitting feedback: ", error);
    }
    setLoading(false);
  };

  return (
    <XStack width="100%" justifyContent="space-between" alignItems="center">
      <Button type="icon" onPress={() => handleFeedback(false)}>
        {loading && <Button.Spinner />}
        {!loading && (
          <Button.Icon>
            <Ionicons name="thumbs-down-outline" size={16} color="red" />
          </Button.Icon>
        )}
      </Button>
      <Text weight="bold" fontSize="$lg">
        Rate This Analysis
      </Text>
      <Button type="icon" onPress={() => handleFeedback(true)}>
        {loading && <Button.Spinner />}
        {!loading && (
          <Button.Icon>
            <Ionicons name="thumbs-up-outline" size={16} color="green" />
          </Button.Icon>
        )}
      </Button>
    </XStack>
  );
};

export default SentimentAnalysisFeedback;
