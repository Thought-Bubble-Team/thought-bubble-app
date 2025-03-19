// Style Imports
import React from "react";
import { Alert } from "react-native";
import { styled, View, XStack } from "tamagui";
import { useState } from "react";
import { Link, router } from "expo-router";

// Component Imports
import Input from "@/components/atoms/Input";
import Text from "@/components/atoms/Text";
import { Button } from "@/components/atoms/Button";

// Utility Imports
import { supabase } from "@/utils/supabase/supabase";

import Logo from "@/assets/icons/tb_logo.svg";

interface SignUpProps {
  setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SignUp(props: SignUpProps) {
  const { setIsSignUp, loading, setLoading } = props;

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showInput, setShowInput] = useState<boolean>(false);

  const signUpWithEmail = async () => {
    // Check if email and password are not empty
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    setLoading(true);

    // Sign up with email and password
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        Alert.alert("Error", error.message);
        setLoading(false);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          throw error;
        }

        Alert.alert("Success", "Account Created");
        router.replace({ pathname: "/profile_setup", params: { type: "new" } });
      }
    } catch (error: any) {
      Alert.alert("Error", error?.message || "Unexpected error occurred.");
      setLoading(false);
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
        type="email"
        placeholder="johnydoe@gmail.com"
        value={email}
        onChangeText={setEmail}
        showInput={true}
      />
      <Input
        label="Password"
        type="password"
        placeholder="********"
        secureTextEntry
        onChangeText={setPassword}
        showInput={showInput}
        setShowInput={setShowInput}
      />
      <Input
        label="Confirm Password"
        type="password"
        placeholder="********"
        secureTextEntry
        onChangeText={setConfirmPassword}
        showInput={showInput}
        setShowInput={setShowInput}
      />
      <XStack gap="$3" alignItems="center">
        <Text weight="light" fontSize="$sm" textAlign="center">
          By signing up, you agree to our{" "}
          <Link href={{ pathname: "/agreement_page" }}>
            <Text weight="bold" color="$primary">
              Terms of Service
            </Text>
          </Link>
        </Text>
      </XStack>
      <Button type={"normal"} onPress={signUpWithEmail}>
        {!loading && <Button.Text>SIGNUP</Button.Text>}
        {loading && <Button.Spinner />}
      </Button>
      <Footer>
        <Text weight="light">Already have an account?</Text>
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
  marginTop: "$5",
});
