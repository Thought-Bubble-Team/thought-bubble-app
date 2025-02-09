// Style Imports
import "react-native-url-polyfill/auto";
import { useEffect, useState } from "react";
import { StyleSheet, Alert, TouchableOpacity } from "react-native";
import { styled, View } from "tamagui";

// Component Imports
import MyView from "@/components/MyView";
import MyText from "@/components/MyText";
import Login from "@/components/Macro/Login";
import SignUp from "@/components/Macro/SignUp";

// Utility Imports
import { supabase } from "@/utils/supabase/supabase";
import { Session } from "@supabase/supabase-js";

export default function User() {
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

  return (
    <MainContainer>
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
      {/** LOGIN SECTION */}
      {!session && !isSignUp && (
        <Login setIsSignUp={setIsSignUp} setLoading={setLoading} />
      )}
      {!session && isSignUp && (
        <SignUp setIsSignUp={setIsSignUp} setLoading={setLoading} />
      )}
    </MainContainer>
  );
}

// Tamagui Styles
const MainContainer = styled(View, {
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  padding: "$8",
  backgroundColor: "$background",
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
