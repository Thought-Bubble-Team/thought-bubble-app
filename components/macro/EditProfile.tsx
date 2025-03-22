import { View, XStack, YStack } from "tamagui";
import { useState } from "react";

import Screen from "@/components/atoms/Screen";
import Text from "@/components/atoms/Text";
import Input from "../atoms/Input";
import { Button } from "../atoms/Button";

import { useSessionStore } from "@/utils/stores/useSessionStore";
import { createUserData, updateUserData } from "@/utils/supabase/db-crud";
import { UserDataType } from "@/utils/interfaces/dataTypes";
import { Alert } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

const EditProfile = () => {
  const { type } = useLocalSearchParams();

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

      // Create user data object
      const userData: Partial<UserDataType> = {
        user_id: sessionStore.session?.user.id,
        username: username,
        first_time_user: false,
      };

      // Check if user is logged in
      if (!sessionStore.session?.user?.id) {
        Alert.alert("Error", "User not logged in");
        return;
      }

      if (type === "new") {
        // Create
        const result = await createUserData(userData);

        if (result?.error) {
          Alert.alert("Error", "Failed to create username");
          setLocalLoading(false);
        } else {
          Alert.alert("Success", "Username created successfully");
          setLocalLoading(false);
          router.replace({ pathname: "/(tabs)" });
        }
      }

      if (type === "update") {
        // Update
        const result = await updateUserData(
          sessionStore.session.user.id,
          userData,
        );
        if (result?.error) {
          Alert.alert("Error", "Failed to update username");
          setLocalLoading(false);
        } else {
          Alert.alert("Success", "Username updated successfully");
          setLocalLoading(false);
          router.back();
        }
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
      <YStack width="100%" gap="$4" alignItems="flex-end">
        <Input
          label="Username"
          value={username}
          onChangeText={setUsername}
          placeholder="Enter your name"
        />
        <XStack width="50%" justifyContent="center">
          <Button type="normal" onPress={handleSave}>
            {!localLoading && <Button.Text>Save</Button.Text>}
            {localLoading && <Button.Spinner />}
          </Button>
        </XStack>
      </YStack>
    </Screen>
  );
};

export default EditProfile;
