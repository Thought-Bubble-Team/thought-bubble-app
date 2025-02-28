import { View } from "tamagui";
import Text from "@/components/Micro/Text";

import { Stack } from "expo-router";

const GratitudeJournal = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{ title: "Gratitude Journal" }} />
      <Text>Gratitude Journal</Text>
    </View>
  );
};

export default GratitudeJournal;
