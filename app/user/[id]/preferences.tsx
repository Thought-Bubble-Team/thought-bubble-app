import { View } from "tamagui";
import Text from "@/components/atoms/Text";

import { useLocalSearchParams, Stack } from "expo-router";

const Preferences = () => {
  const { id } = useLocalSearchParams();
  return (
    <View
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      marginTop="$3"
    >
      <Stack.Screen options={{ headerTitle: "Preferences" }} />
      <Text>{id}</Text>
      <Text>Preferences</Text>
    </View>
  );
};

export default Preferences;
