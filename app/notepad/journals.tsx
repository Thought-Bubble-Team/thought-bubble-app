import { View } from "tamagui";
import Text from "@/components/atoms/Text";

import { Stack } from "expo-router";

const Journals = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{ title: "Journals" }} />
      <Text>Journals</Text>
    </View>
  );
};

export default Journals;
