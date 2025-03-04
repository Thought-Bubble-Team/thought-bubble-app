import { View } from "tamagui";
import Text from "@/components/atoms/Text";

import { useLocalSearchParams, Stack } from "expo-router";

const ReoccurringWords = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{ headerTitle: "Reoccurring Words" }} />
      <Text>{id}</Text>
      <Text>Reoccurring Words</Text>
    </View>
  );
};

export default ReoccurringWords;
