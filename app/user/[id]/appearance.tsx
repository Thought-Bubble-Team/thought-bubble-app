import { View } from "tamagui";
import Text from "@/components/Micro/Text";

import { useLocalSearchParams, Stack } from "expo-router";

const Appearance = () => {
  const { id } = useLocalSearchParams();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{ headerTitle: "Appearance" }} />
      <Text>{id}</Text>
      <Text>Appearance</Text>
    </View>
  );
};

export default Appearance;
