import { View } from "tamagui";
import Text from "@/components/Micro/Text";

import { useLocalSearchParams, Stack } from "expo-router";

const MoodFlow = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{ headerTitle: "Mood Flow" }} />
      <Text>{id}</Text>
      <Text>Mood Flow</Text>
    </View>
  );
};

export default MoodFlow;
