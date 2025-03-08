import { XStack, View, ViewProps } from "tamagui";

import Text from "@/components/atoms/Text";
import { Card } from "@/components/atoms/Card";

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

const ReoccurringWords = () => {
  return (
    <Card>
      <Card.Header>
        <Card.HeaderText>Reoccurring Words</Card.HeaderText>
      </Card.Header>
      <Card.Body>
        <ReoccurringWordsChart />
      </Card.Body>
    </Card>
  );
};

const ReoccurringWordsChart = (props: ViewProps) => {
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
};

export default ReoccurringWords;
