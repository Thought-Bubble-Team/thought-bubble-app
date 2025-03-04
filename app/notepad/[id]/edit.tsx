import { View } from "tamagui";
import Text from "@/components/atoms/Text";

import { useLocalSearchParams, Stack } from "expo-router";

const Edit = () => {
  const { id } = useLocalSearchParams();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{ title: "Edit Note" }} />
      <Text>{id}</Text>
      <Text>Edit Note</Text>
    </View>
  );
};

export default Edit;
