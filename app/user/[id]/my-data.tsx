import { View } from "tamagui";
import Text from "@/components/atoms/Text";

import { useLocalSearchParams, Stack } from "expo-router";

const MyData = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{ headerTitle: "My Data" }} />
      <Text></Text>
    </View>
  );
};

export default MyData;
