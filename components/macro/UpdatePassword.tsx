import { XStack, YStack } from "tamagui";
import { router, useLocalSearchParams } from "expo-router";

import Input from "../atoms/Input";
import { Button } from "../atoms/Button";
import { useState } from "react";

import { supabase } from "@/utils/supabase/supabase";
import { Alert } from "react-native";

enum UpdatePasswordType {
  RESET = "reset",
  UPDATE = "update",
}

const UpdatePassword = () => {
  const { type } = useLocalSearchParams();

  if (type === "reset") {
    return <UpdatePasswordForm type={UpdatePasswordType.RESET} />;
  }

  return <UpdatePasswordForm type={UpdatePasswordType.UPDATE} />;
};

const UpdatePasswordForm = ({ type }: { type: UpdatePasswordType }) => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showInput, setShowInput] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (password.length === 0 || confirmPassword.length === 0) {
      Alert.alert("Error", "Password is required");
      return;
    }

    if (password.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters long");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase.auth.updateUser({
        password: password,
      });
      if (error) {
        throw error;
      }

      if (data) {
        Alert.alert("Success", "Password updated successfully");
        router.back();
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong please try again later");
      console.error(`[Supabase](UpdatePassworrd) error: ${error}`);
    }
    setLoading(false);
  };
  return (
    <YStack gap="$3" padding="$3">
      <Input
        label={"New Password"}
        placeholder="password"
        type="password"
        value={password}
        onChangeText={setPassword}
        showInput={showInput}
        setShowInput={setShowInput}
      />
      <Input
        label={"Confirm New Password"}
        placeholder="confirm password"
        type="password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        showInput={showInput}
        setShowInput={setShowInput}
      />
      <XStack justifyContent="center">
        <Button size="$lg" onPress={handleSubmit}>
          {loading && <Button.Spinner />}
          {!loading && (
            <Button.Text>
              {type === UpdatePasswordType.RESET ? "Reset" : "Update"}
            </Button.Text>
          )}
        </Button>
      </XStack>
    </YStack>
  );
};

export default UpdatePassword;
