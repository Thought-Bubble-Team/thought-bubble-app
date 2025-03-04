import { View } from "tamagui";
import Text from "@/components/atoms/Text";

import { useLocalSearchParams, Stack } from "expo-router";

const EditProfileScreen = () => {
  const { id } = useLocalSearchParams();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{ headerTitle: "Edit Profile" }} />
      <Text>{id}</Text>
      <Text>Edit Profile</Text>
    </View>
  );
};

export default EditProfileScreen;
