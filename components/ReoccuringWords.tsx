import { XStack, XStackProps, View, Text, styled } from "tamagui";

import MyText from "./MyText";

interface Mood {
  emotion: string;
  color: string;
}

export default function ReoccuringWords() {
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
          <MyText fontSize={8} paddingVertical={"$2"} paddingHorizontal={"$3"}>
            {mood.emotion}
          </MyText>
        </View>
      ))}
    </XStack>
  );
}
