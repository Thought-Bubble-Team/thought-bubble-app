import { View, XStack, YStack } from "tamagui";

import Text from "@/components/atoms/Text";
// @ts-ignore
import SmugFace from "@/assets/icons/emojis/emoji-1";

import { processEmotionSummary } from "@/utils/others/tools";
import { EmotionSummaryType } from "@/utils/interfaces/dataTypes";

// TODO: Improve to handle dynamic data
export const MoodBarChart = ({
  emotion_summary,
}: {
  emotion_summary: EmotionSummaryType;
}) => {
  const processed_emotion_summary = processEmotionSummary(emotion_summary);
  return (
    <YStack gap="$3" alignItems="center">
      <XStack gap="$3" alignItems="flex-end">
        {emotion_summary.emotion_values.map((item) => (
          <EmojiValue key={`emotion-${item.emotion}`} value={item.value} />
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
  emoji?: string;
  value: string;
  size?: number;
}) => {
  return (
    <YStack gap={"$lg"} alignItems="center">
      <View>
        <SmugFace width={size} height={size} />
      </View>
      <View backgroundColor="$white" borderRadius="$10" paddingHorizontal="$3">
        <Text weight="bold" fontSize="$sm" color="$grey4" textAlign="center">
          {value}
        </Text>
      </View>
    </YStack>
  );
};
