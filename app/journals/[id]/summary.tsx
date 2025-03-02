import { View } from "tamagui";
import Text from "@/components/Micro/Text";

import { useLocalSearchParams, Stack } from "expo-router";

const Summary = () => {
  const { id } = useLocalSearchParams();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{ title: "Summary" }} />
      <Text>{id}</Text>
      <Text>Summary</Text>
    </View>
  );
};

export default Summary;
