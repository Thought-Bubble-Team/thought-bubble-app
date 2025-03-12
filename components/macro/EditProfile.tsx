import { View } from "tamagui";
import { useState } from "react";

import Screen from "@/components/atoms/Screen";
import Text from "@/components/atoms/Text";
import Input from "../atoms/Input";
import { Button } from "../atoms/Button";

import { useSessionStore } from "@/utils/stores/useSessionStore";
import { updateUserData } from "@/utils/supabase/db-crud";
import { UserDataType } from "@/utils/interfaces/dataTypes";
import { Alert } from "react-native";
import { router } from "expo-router";

// FIX: Button Text not aligned in center
const EditProfile = () => {
  const sessionStore = useSessionStore();
  const [username, setUsername] = useState<string>("");
  const [localLoading, setLocalLoading] = useState<boolean>(false);

  const handleSave = async () => {
    if (!username) {
      Alert.alert("Warning", "Username cannot be empty");
      return;
    }
    try {
      setLocalLoading(true);
      const userData: Partial<UserDataType> = {
        username: username,
      };

      if (!sessionStore.session?.user?.id) {
        Alert.alert("Error", "User not logged in");
        return;
      }

      const result = await updateUserData(
        sessionStore.session.user.id,
        userData
      );

      if (result?.error) {
        Alert.alert("Error", "Failed to update username");
        setLocalLoading(false);
      } else {
        Alert.alert("Success", "Username updated successfully");
        setLocalLoading(false);
        router.back();
      }
    } catch (error) {
      console.error("Unexpected error: ", error);
      Alert.alert("Error", "An unexpected error occurred.");
      setLocalLoading(false);
    }
  };

  return (
    <Screen
      justifyContent="flex-start"
      alignItems="center"
      padding="$3"
      gap="$4"
    >
      <View>
        <Text weight="bold" fontSize="$xl">
          Enter New Username
        </Text>
      </View>
      <View width="100%" justifyContent="center" alignItems="center" gap="$4">
        <Input
          label="Username"
          value={username}
          onChangeText={setUsername}
          placeholder="Enter your name"
        />
        <Button type="normal" size="$md" width="80%" onPress={handleSave}>
          {localLoading && <Button.Spinner />}
          {!localLoading && <Button.Text>Save</Button.Text>}
        </Button>
      </View>
    </Screen>
  );
};

export default EditProfile;
