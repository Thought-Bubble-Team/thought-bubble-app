import { View } from "tamagui";
import Text from "@/components/Micro/Text";

import { Stack } from "expo-router";

const JournalEntry = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{ title: "Journal Entry" }} />
      <Text>Journal Entry</Text>
    </View>
  );
};

export default JournalEntry;
