import { View, XStack, YStack } from "tamagui";
import { useLocalSearchParams } from "expo-router";

import Text from "@/components/atoms/Text";
import Screen from "@/components/atoms/Screen";
import Header from "@/components/atoms/Header";
import { Navigation } from "@/components/macro/Navigation";
import { MoodBarChart } from "@/components/macro/MoodBar";

// NOTE: Sample data
const emotion_summary = {
  emotion_values: [
    { emotion: "joy", value: "20%" },
    { emotion: "optimism", value: "20%" },
    { emotion: "excitement", value: "30%" },
    { emotion: "realization", value: "13%" },
    { emotion: "approval", value: "17%" },
  ],
  description:
    "It seems you’re feeling mostly happy and grateful, with some moments of balance and growth. Remember to acknowledge these positive feelings as a sign of your resilience and progress!",
};

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
const Graph = ({}) => {
  return (
    <View>
      <MoodBarChart emotion_summary={emotion_summary} />
    </View>
  );
};

// TODO: Using entry_id passed, fetch sentiment summary
const Summary = () => {
  const { id } = useLocalSearchParams();

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
          <Text weight="bold" fontSize="$lg" textAlign="center">
            Here's a breakdown of the emotions reflected in this entry
          </Text>
        </Header>
        <View padding="$lg">
          <Text weight="regular" fontSize="$sm" textAlign="center">
            {emotion_summary.description}
          </Text>
        </View>
        <View padding="$lg">
          <Graph />
        </View>
      </Screen>
      <Footer />
    </Screen>
  );
};

export default Summary;
