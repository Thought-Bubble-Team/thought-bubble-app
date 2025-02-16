// Style Imports
import React from "react";
import { StyleSheet, TouchableOpacity, Alert } from "react-native";
import { styled, View } from "tamagui";

// Component Imports
import MyInput from "../Inputs/MyInput";
import Text from "../Micro/Text";

// Utility Imports
import { useState } from "react";
import { supabase } from "@/utils/supabase/supabase";

// @ts-ignore
import Logo from "@/assets/icons/logoTemp.svg";

interface LoginProps {
  setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Login(props: LoginProps) {
  const { setIsSignUp, setLoading } = props;

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const signInWithEmail = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      Alert.alert("Error", error.message);
    }
    setLoading(false);
  };

  return (
    <MainContainer>
      <Logo width={100} height={100} />
      <Text weight="bold" fontSize={18}>
        Welcome to Thought Bubble!
      </Text>
      <Text weight="light" fontSize={13}>
        Welcome back! Login to continue your journey.
      </Text>
      <MyInput
        label="Email"
        placeholder="johnydoe@gmail.com"
        value={email}
        onChangeText={setEmail}
      />
      <MyInput
        label="Password"
        placeholder="********"
        secureTextEntry
        onChangeText={setPassword}
      />
      <TouchableOpacity
        style={buttonStyles.ButtonStyledColored}
        onPress={signInWithEmail}
      >
        <Text weight="bold" fontSize={16} color={"$textColorAlt"}>
          LOGIN
        </Text>
      </TouchableOpacity>
      <Footer>
        <Text weight="light">Don't have an account?</Text>
        <TouchableOpacity onPress={() => setIsSignUp(true)}>
          <Text weight="bold" color={"$accent"}>
            Signup
          </Text>
        </TouchableOpacity>
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
    backgroundColor: "#CB806A",
    color: "#fff",
    borderRadius: 32,
  },
});
