import Screen from "@/components/atoms/Screen";
import Text from "@/components/atoms/Text";
import EditProfile from "@/components/macro/EditProfile";
import { Navigation } from "@/components/macro/Navigation";

import { useLocalSearchParams, Stack } from "expo-router";

const EditProfileScreen = () => {
  const { id } = useLocalSearchParams();
  return (
    <Screen testID="edit-profile-screen" justifyContent="flex-start">
      <Navigation title="Edit Profile" />
      <Screen justifyContent="flex-start">
        <EditProfile />
      </Screen>
    </Screen>
  );
};

export default EditProfileScreen;
