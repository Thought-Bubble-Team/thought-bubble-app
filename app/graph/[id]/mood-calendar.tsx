import { View } from "tamagui";
import Text from "@/components/atoms/Text";

import { useLocalSearchParams, Stack } from "expo-router";

const MoodCalendar = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{ headerTitle: "Mood Calendar" }} />
      <Text>{id}</Text>
      <Text>Mood Calendar</Text>
    </View>
  );
};

export default MoodCalendar;
