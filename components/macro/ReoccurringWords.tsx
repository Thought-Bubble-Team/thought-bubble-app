import { XStack, View, ViewProps } from "tamagui";

import Text from "@/components/atoms/Text";

interface Mood {
  emotion: string;
  color: string;
}

type EmotionType = {
  emotions: {
    joy: number;
    sadness: number;
    anger: number;
    fear: number;
    disgust: number;
    surprise: number;
  };
  created_at: string;
};

// interface ReoccurringWordsProps {
//   emotions: EmotionType[];
// }

export default function ReoccurringWords(props: ViewProps) {
  // const { emotions } = props;

  // const selectedDate = formatDate(emotions[0].created_at);

  const moods: Mood[] = [
    { emotion: "grateful", color: "#F7C8BB" },
    { emotion: "exhausting", color: "#D6C8C3" },
    { emotion: "tired", color: "#E0B7AB" },
    { emotion: "fine", color: "#DFC4BB" },
    { emotion: "tough", color: "#E0B7AB" },
    { emotion: "tough", color: "#E0B7AB" },
    { emotion: "tough", color: "#E0B7AB" },
    { emotion: "tough", color: "#E0B7AB" },
    { emotion: "tough", color: "#E0B7AB" },
  ];

  return (
    <XStack gap={"$xs"} flexWrap="wrap" {...props}>
      {moods.map((mood, index) => (
        <View key={index} backgroundColor={mood.color} borderRadius={"$8"}>
          <Text
            fontSize="$md"
            paddingVertical={"$xs"}
            paddingHorizontal={"$sm"}
          >
            {mood.emotion}
          </Text>
        </View>
      ))}
    </XStack>
  );
}
