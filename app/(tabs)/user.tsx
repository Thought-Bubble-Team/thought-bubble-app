// This is a React Native file
import "react-native-url-polyfill/auto";
import { useEffect, useState } from "react";
import { Alert, TextInput } from "react-native";
import { styled, View, Button } from "tamagui";
import { supabase } from "@/utils/supabase/supabase";
import { Session } from "@supabase/supabase-js";

import MyView from "@/components/MyView";
import MyText from "@/components/MyText";
import MyInput from "@/components/Inputs/MyInput";

export default function User() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [session, setSession] = useState<Session | null>(null);

  const [isSignUp, setIsSignUp] = useState<boolean>(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

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

  const signUpWithEmail = async () => {
    setLoading(true);
    const { data: session, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      Alert.alert("Error", error.message);
    }
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  };

  return (
    <MyView padding={"$8"} backgroundColor={"$background"}>
      {session && session.user && (
        <View width={"100%"} gap={"$2"}>
          <MyText bold>Welcome {session.user.email}</MyText>
          <ButtonStyledColored onPress={() => supabase.auth.signOut()}>
            <MyText>Sign Out</MyText>
          </ButtonStyledColored>
        </View>
      )}
      {!session && !isSignUp && (
        <View width={"100%"} gap={"$2"}>
          <MyText bold>Please Sign In</MyText>
          <MyInput
            label="Email"
            placeholder="johnydoe@gmail.com"
            value={email}
            onChangeText={setEmail}
          />
          {/* <TextInput
            placeholder="Password"
            secureTextEntry
            onChangeText={setPassword}
          /> */}
          <MyInput
            label="Password"
            placeholder="********"
            secureTextEntry
            onChangeText={setPassword}
          />
          <ButtonStyledColored onPress={signInWithEmail}>
            <MyText>Login</MyText>
          </ButtonStyledColored>
          <ButtonStyled>
            <MyText>Sign Up</MyText>
          </ButtonStyled>
        </View>
      )}
      {isSignUp && (
        <View width={"100%"} gap={"$2"}>
          <MyText bold>Please Sign Up</MyText>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            onChangeText={setPassword}
          />
          <ButtonStyledColored onPress={signUpWithEmail}>
            <MyText>Submit</MyText>
          </ButtonStyledColored>
          <ButtonStyled onPress={() => setIsSignUp(false)}>
            <MyText>Have an account? Sign In</MyText>
          </ButtonStyled>
        </View>
      )}
    </MyView>
  );
}

const ButtonStyled = styled(Button, {
  padding: 0,
  margin: 0,
  backgroundColor: "$background",
  color: "$colorText",
});

const ButtonStyledColored = styled(Button, {
  padding: "$2",
  margin: "$2",
  backgroundColor: "$subtleBackground",
  color: "$colorText",
  borderWidth: 0,
  textAlign: "center",
});
