import { XStack, XStackProps, View, styled } from "tamagui";

import { formatDate } from "@/utils/dateFormat";

import { Text, FontFamily } from "../Micro/Text";

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

interface ReoccuringWordsProps {
  emotions: EmotionType[];
}

export default function ReoccuringWords() {
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
    <XStack gap={"$2"} flexWrap="wrap">
      {moods.map((mood, index) => (
        <View key={index} backgroundColor={mood.color} borderRadius={"$8"}>
          <Text
            style={{ fontSize: 12, paddingVertical: 8, paddingHorizontal: 12 }}
          >
            {mood.emotion}
          </Text>
        </View>
      ))}
    </XStack>
  );
}
