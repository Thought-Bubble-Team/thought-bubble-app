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
import Logo from "../../assets/icons/logoTemp.svg";

interface SignUpProps {
  setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SignUp(props: SignUpProps) {
  const { setIsSignUp, setLoading } = props;

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const signUpWithEmail = async () => {
    setLoading(true);

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert("Please check your inbox for email verification!");
      setIsSignUp(false);
    }
    setLoading(false);
  };

  return (
    <MainContainer>
      <Logo width={100} height={100} />
      <Text weight="bold" fontSize={18} textAlign="center">
        Welcome to Thought Bubble!
      </Text>
      <Text weight="light" fontSize={13} textAlign="center">
        Let your thoughts flow. Join us and start your journey today!
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
      <MyInput
        label="Confirm Password"
        placeholder="********"
        secureTextEntry
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity
        style={buttonStyles.ButtonStyledColored}
        onPress={signUpWithEmail}
      >
        <Text weight="bold" fontSize={16} color={"$textColorAlt"}>
          SIGNUP
        </Text>
      </TouchableOpacity>
      <Footer>
        <Text weight="light">Already have an account?</Text>
        <TouchableOpacity onPress={() => setIsSignUp(false)}>
          <Text weight="bold" color={"$accent"}>
            Login
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
    backgroundColor: "#CB806A",
    color: "#fff",
    borderRadius: 32,
  },
});
