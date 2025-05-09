import Screen from "@/components/atoms/Screen";
import { Navigation } from "@/components/macro/Navigation";
import UpdatePassword from "@/components/macro/UpdatePassword";

const ChangePasswordPage = () => {
  return (
    <Screen justifyContent="flex-start" marginTop="$3">
      <Navigation title="Change Password" />
      <UpdatePassword />
    </Screen>
  );
};

export default ChangePasswordPage;
