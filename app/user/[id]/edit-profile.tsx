import Screen from "@/components/atoms/Screen";
import EditProfile from "@/components/macro/EditProfile";
import { Navigation } from "@/components/macro/Navigation";

const EditProfileScreen = () => {
  return (
    <Screen testID="edit-profile-screen" justifyContent="flex-start">
      <Navigation title="Edit Profile" />
      <EditProfile />
    </Screen>
  );
};

export default EditProfileScreen;
