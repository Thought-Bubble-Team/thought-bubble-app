import { styled, View } from "tamagui";

import UpdatePassword from "@/components/macro/UpdatePassword";
import { useEffect } from "react";
import { supabase } from "@/utils/supabase/supabase";

const ResetPasswordPage = () => {
  useEffect(() => {
    console.log("ResetPasswordPage");
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        const newPassword = prompt(
          "What would you like your new password to be?"
        );
        const { data, error } = await supabase.auth.updateUser({
          password: newPassword as string,
        });
        if (data) alert("Password updated successfully!");
        if (error) alert("There was an error updating your password.");
      }
    });
  }, []);

  return (
    <FormContainer>
      <UpdatePassword />
    </FormContainer>
  );
};

const FormContainer = styled(View, {
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  width: "100%",
  height: "90%",
  paddingHorizontal: "$4",
  paddingVertical: "$8",
  backgroundColor: "$grey1",
  borderTopLeftRadius: 32,
  borderTopRightRadius: 32,
  elevationAndroid: 8,
});

export default ResetPasswordPage;
