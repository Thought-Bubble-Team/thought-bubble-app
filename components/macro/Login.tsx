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
import Logo from "@/assets/icons/logoTemp.svg";
import { router } from "expo-router";
import { useSessionStore } from "@/utils/stores/useSessionStore";

interface LoginProps {
  setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>;
  loading?: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Login(props: LoginProps) {
  const { setIsSignUp, loading, setLoading } = props;
  const theme = useTheme();
  const sessionStore = useSessionStore();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const signInWithEmail = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        Alert.alert("Error", error.message);
        return;
      }

      if (!sessionStore.session) {
        Alert.alert("Error", "Something went wrong. Please try again.");
        return;
      }

      if (!sessionStore.userData) {
        await sessionStore.fetchUserData();
      }

      if (sessionStore.userData?.first_time_user) {
        router.navigate({ pathname: "/onboarding_page" });
      } else {
        router.navigate("/(tabs)");
      }
    } catch (error: any) {
      Alert.alert("Error", error?.message || "Unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainContainer>
      <Logo width={100} height={100} />
      <Text weight="bold" fontSize="$xl">
        Welcome to Thought Bubble!
      </Text>
      <Text weight="light" fontSize="$md">
        Welcome back! Login to continue your journey.
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
      {/* <TouchableOpacity
        style={[
          buttonStyles.ButtonStyledColored,
          { backgroundColor: theme.primary?.val },
        ]}
        onPress={signInWithEmail}
      >
        <Text weight="bold" fontSize="$lg" color={"$white"}>
          LOGIN
        </Text>
      </TouchableOpacity> */}
      <Button type={"normal"} size={"$md"} onPress={signInWithEmail}>
        {!loading && <Button.Text>LOGIN</Button.Text>}
        {loading && <Button.Spinner />}
      </Button>
      <Footer>
        <Text weight="light">Don't have an account?</Text>
        {/*<TouchableOpacity onPress={() => setIsSignUp(true)}>*/}
        {/*  <Text weight="bold" color={"$primary"}>*/}
        {/*    Signup*/}
        {/*  </Text>*/}
        {/*</TouchableOpacity>*/}
        <Button
          type={"icon"}
          size={"$md"}
          padding={0}
          onPress={() => setIsSignUp(true)}
        >
          <Button.Text>Signup</Button.Text>
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
  marginTop: "$13",
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
