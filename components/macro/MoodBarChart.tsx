import { View, XStack, YStack } from "tamagui";

import Text from "@/components/atoms/Text";

import { processEmotionSummary } from "@/utils/others/tools";
import MoodIcons from "../Icons/MoodIcons";
// Remove the EmotionSummaryType import as we're redefining it below

type EmotionSummaryItem = {
  emotion: string;
  percentage: number;
};

// TODO: Improve to handle dynamic data
export const MoodBarChart = ({
  emotion_summary,
}: {
  emotion_summary: EmotionSummaryItem[];
}) => {
  const processed_emotion_summary = processEmotionSummary(emotion_summary);
  return (
    <YStack gap="$3" alignItems="center" width="100%">
      <XStack justifyContent="space-between" alignItems="center" width="100%">
        {emotion_summary.map((item) => (
          <EmojiValue
            key={`emotion-${item.emotion}`}
            value={`${parseFloat(item.percentage.toFixed(2))}%`}
            emoji={item.emotion}
          />
        ))}
      </XStack>
      <XStack>
        {processed_emotion_summary &&
          processed_emotion_summary.map((item) => (
            <View
              key={`emotion-${item?.emotion}`}
              backgroundColor={item?.color}
              width={item?.value}
              height="$sm"
            ></View>
          ))}
      </XStack>
    </YStack>
  );
};

export const EmojiValue = ({
  emoji,
  value,
  size = 40,
}: {
  emoji: string;
  value: string;
  size?: number;
}) => {
  return (
    <YStack gap={"$lg"} alignItems="center">
      <View>
        <MoodIcons mood={emoji} size={size} />
      </View>
      <View backgroundColor="$white" borderRadius="$10" paddingHorizontal="$2">
        <Text weight="bold" fontSize="$sm" color="$grey4" textAlign="center">
          {value}
        </Text>
      </View>
    </YStack>
  );
};
