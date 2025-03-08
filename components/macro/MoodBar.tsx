import { View, XStack, YStack } from "tamagui";

import Text from "@/components/atoms/Text";
// @ts-ignore
import SmugFace from "@/assets/icons/emojis/emoji-1";

// TODO: Improve to handle dynamic data
export const MoodBarChart = () => {
  return (
    <YStack gap="$3" alignItems="center">
      <XStack gap="$3" alignItems="flex-end">
        <EmojiValue value="20%" />
        <EmojiValue value="20%" />
        <EmojiValue value="20%" />
        <EmojiValue value="30%" size={60} />
        <EmojiValue value="10%" />
      </XStack>
      <XStack>
        <View backgroundColor="#FAB9B9" height="$sm" width="20%" />
        <View backgroundColor="#F7C8BB" height="$sm" width="20%" />
        <View backgroundColor="#C8988A" height="$sm" width="20%" />
        <View backgroundColor="#CB806A" height="$sm" width="30%" />
        <View backgroundColor="#846258" height="$sm" width="10%" />
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
