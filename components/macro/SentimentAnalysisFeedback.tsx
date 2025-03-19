import Ionicons from "@expo/vector-icons/Ionicons";
import { XStack, useTheme } from "tamagui";

import Text from "../atoms/Text";
import { Button } from "../atoms/Button";
import { useState } from "react";
import { submitFeedback } from "@/utils/supabase/db-crud";
import { Alert } from "react-native";

const SentimentAnalysisFeedback = ({
  entry_id,
  setShowFeedback,
}: {
  entry_id: number;
  setShowFeedback: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const theme = useTheme();
  const [loading, setLoading] = useState<boolean>(false);

  const handleFeedback = async (feedback: boolean) => {
    setLoading(true);

    try {
      await submitFeedback(entry_id, feedback);
      Alert.alert("Success", "Feedback submitted successfully");
      setShowFeedback(false);
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
            <Ionicons
              name="thumbs-down-outline"
              size={16}
              color={theme.error.get()}
            />
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
            <Ionicons
              name="thumbs-up-outline"
              size={16}
              color={theme.success.get()}
            />
          </Button.Icon>
        )}
      </Button>
    </XStack>
  );
};

export default SentimentAnalysisFeedback;
