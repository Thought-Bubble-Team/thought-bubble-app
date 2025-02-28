import { View } from "tamagui";
import Text from "@/components/Micro/Text";

import { useLocalSearchParams, Stack } from "expo-router";

const MoodBar = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{ headerTitle: "Mood Bar" }} />
      <Text>{id}</Text>
      <Text>Mood Bar</Text>
    </View>
  );
};

export default MoodBar;
