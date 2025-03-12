// Style Imports
import React from "react";
import { StyleSheet, TouchableOpacity, Alert } from "react-native";
import { styled, View } from "tamagui";

// Component Imports
import Input from "@/components/atoms/Input";
import Text from "@/components/atoms/Text";
import { Button } from "@/components/atoms/Button";

// Utility Imports
import { useState } from "react";
import { supabase } from "@/utils/supabase/supabase";
import { useTheme } from "tamagui";

// @ts-ignore
import Logo from "../../assets/icons/logoTemp.svg";
import { useSessionStore } from "@/utils/stores/useSessionStore";
import { router } from "expo-router";

interface SignUpProps {
  setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SignUp(props: SignUpProps) {
  const { setIsSignUp, loading, setLoading } = props;
  const theme = useTheme();
  const sessionStore = useSessionStore();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const signUpWithEmail = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        Alert.alert("Error", error.message);
      }

      Alert.alert("Success", "Check your email for a verification link.");
      router.replace("/account_management");
    } catch (error: any) {
      Alert.alert("Error", error?.message || "Unexpected error occurred.");
    }
  };

  return (
    <MainContainer>
      <Logo width={100} height={100} />
      <Text weight="bold" fontSize="$xl" textAlign="center">
        Welcome to Thought Bubble!
      </Text>
      <Text weight="light" fontSize="$md" textAlign="center">
        Let your thoughts flow. Join us and start your journey today!
      </Text>
      <Input
        label="Email"
        placeholder="johnydoe@gmail.com"
        value={email}
        onChangeText={setEmail}
      />
      <Input
        label="Password"
        placeholder="********"
        secureTextEntry
        onChangeText={setPassword}
      />
      <Input
        label="Confirm Password"
        placeholder="********"
        secureTextEntry
        onChangeText={setConfirmPassword}
      />
      {/*<TouchableOpacity*/}
      {/*  style={[*/}
      {/*    buttonStyles.ButtonStyledColored,*/}
      {/*    { backgroundColor: theme.primary?.val },*/}
      {/*  ]}*/}
      {/*  onPress={signUpWithEmail}*/}
      {/*>*/}
      {/*  <Text weight="bold" fontSize="$lg" color={"$white"}>*/}
      {/*    SIGNUP*/}
      {/*  </Text>*/}
      {/*</TouchableOpacity>*/}
      <Button type={"normal"} onPress={signUpWithEmail}>
        {!loading && <Button.Text>SIGNUP</Button.Text>}
        {loading && <Button.Spinner />}
      </Button>
      <Footer>
        <Text weight="light">Already have an account?</Text>
        {/*<TouchableOpacity onPress={() => setIsSignUp(false)}>*/}
        {/*  <Text weight="bold" color={"$primary"}>*/}
        {/*    Login*/}
        {/*  </Text>*/}
        {/*</TouchableOpacity>*/}
        <Button
          type={"icon"}
          size={"$md"}
          padding={0}
          onPress={() => setIsSignUp(false)}
        >
          <Button.Text>Login</Button.Text>
        </Button>
      </Footer>
    </MainContainer>
  );
}

// Tamagui Styles
const MainContainer = styled(View, {
  width: "100%",
  gap: "$6",
  justifyContent: "center",
  alignItems: "center",
});

const Footer = styled(View, {
  flexDirection: "row",
  gap: "$2",
  alignItems: "center",
  marginTop: "$10",
});

// React Native Styles
const buttonStyles = StyleSheet.create({
  ButtonStyledColored: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 16,
    borderRadius: 32,
  },
});
