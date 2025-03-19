// Style Imports
import { Alert } from "react-native";
import { styled, View } from "tamagui";
import { router } from "expo-router";

// Component Imports
import Input from "@/components/atoms/Input";
import Text from "@/components/atoms/Text";
import { Button } from "@/components/atoms/Button";

// Utility Imports
import { useState } from "react";
import { supabase } from "@/utils/supabase/supabase";

import Logo from "@/assets/icons/tb_logo.svg";

interface LoginProps {
  setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>;
  loading?: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Login(props: LoginProps) {
  const { setIsSignUp, loading, setLoading } = props;

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showInput, setShowInput] = useState<boolean>(false);

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

      router.navigate("/(tabs)");
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
      <Button type={"normal"} size={"$md"} onPress={signInWithEmail}>
        {!loading && <Button.Text>LOGIN</Button.Text>}
        {loading && <Button.Spinner />}
      </Button>
      <Footer>
        <Text weight="light">Don't have an account?</Text>
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
