// Style Imports
import React from "react";
import { StyleSheet, TouchableOpacity, Alert } from "react-native";
import { styled, View } from "tamagui";

// Component Imports
import MyInput from "@/components/Inputs/MyInput";
import Text from "@/components/Micro/Text";
import { Button } from "@/components/Micro/Button";

// Utility Imports
import { useState } from "react";
import { supabase } from "@/utils/supabase/supabase";
import { useTheme } from "tamagui";

// @ts-ignore
import Logo from "../../assets/icons/logoTemp.svg";

interface SignUpProps {
  setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SignUp(props: SignUpProps) {
  const { setIsSignUp, loading, setLoading } = props;
  const theme = useTheme();

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
      <Text weight="bold" fontSize="$xl" textAlign="center">
        Welcome to Thought Bubble!
      </Text>
      <Text weight="light" fontSize="$md" textAlign="center">
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
      <Button
        type={"normal"}
        onPress={() => Alert.alert("Signup is not available yet!")}
      >
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
