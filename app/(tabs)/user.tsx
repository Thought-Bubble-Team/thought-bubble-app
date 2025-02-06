// This is a React Native file
import "react-native-url-polyfill/auto";
import { useEffect, useState } from "react";
import { StyleSheet, Alert, TextInput, TouchableOpacity } from "react-native";
import { styled, View } from "tamagui";
import { supabase } from "@/utils/supabase/supabase";
import { Session } from "@supabase/supabase-js";

import Logo from "@/assets/icons/logoTemp.svg";

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
          <MyText weight="bold">Welcome {session.user.email}</MyText>
          <TouchableOpacity
            style={buttonStyles.ButtonStyledColored}
            onPress={() => supabase.auth.signOut()}
          >
            Sign Out
          </TouchableOpacity>
        </View>
      )}
      {!session && !isSignUp && (
        <View
          width={"100%"}
          gap={"$6"}
          justifyContent="center"
          alignItems="center"
        >
          <Logo width={100} height={100} />
          <MyText weight="bold" fontSize={18}>
            Welcome to Thought Bubble!
          </MyText>
          <MyText weight="light" fontSize={13}>
            Welcome back! Login to continue your journey.
          </MyText>
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
          <TouchableOpacity
            style={buttonStyles.ButtonStyledColored}
            onPress={signInWithEmail}
          >
            <MyText weight="bold" fontSize={16} color={"$textColorAlt"}>
              LOGIN
            </MyText>
          </TouchableOpacity>
          <View
            flexDirection="row"
            gap={"$2"}
            alignItems="center"
            marginTop={"$15"}
          >
            <MyText weight="light">Don't have an account?</MyText>
            <TouchableOpacity onPress={() => setIsSignUp(true)}>
              <MyText weight="bold" color={"$accent"}>
                Signup
              </MyText>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {isSignUp && (
        <View width={"100%"} gap={"$2"}>
          <MyText weight="bold">Please Sign Up</MyText>
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
          <TouchableOpacity onPress={signUpWithEmail}>
            <MyText>Submit</MyText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsSignUp(false)}>
            <MyText>Have an account? Sign In</MyText>
          </TouchableOpacity>
        </View>
      )}
    </MyView>
  );
}

// const ButtonStyled = styled(Button, {
//   padding: 0,
//   margin: 0,
//   backgroundColor: "$background",
//   color: "$colorText",
// });

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
