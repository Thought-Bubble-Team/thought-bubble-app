import { styled, View, XStack, YStack } from "tamagui";

import Input from "@/components/atoms/Input";
import Text from "@/components/atoms/Text";
import { Button } from "@/components/atoms/Button";
import { useState } from "react";
import { Alert } from "react-native";
import { supabase } from "@/utils/supabase/supabase";
import * as Linking from "expo-linking";

const SendResetLink = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter an email");
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert("Error", "Please enter a valid email");
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email);

      if (error) {
        throw error;
      }

      Alert.alert("Success", "Reset link sent to email");
    } catch (error) {
      Alert.alert("Error", "Failed to send reset link");
      console.log("Error: ", error);
    }
    setLoading(false);
  };

  return (
    <FormContainer>
      <YStack padding="$3" gap="$3">
        <XStack justifyContent="center">
          <Text weight="bold" fontSize="$lg">
            Enter your email
          </Text>
        </XStack>
        <XStack>
          <Input
            label="Email"
            type="email"
            placeholder="user@gmail.com"
            value={email}
            onChangeText={setEmail}
            showInput={true}
          />
        </XStack>
        <XStack>
          <Button onPress={handleSubmit}>
            {loading && <Button.Spinner />}
            {!loading && <Button.Text>Send Reset Link</Button.Text>}
          </Button>
        </XStack>
      </YStack>
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
  marginTop: "$3",
});

export default SendResetLink;
