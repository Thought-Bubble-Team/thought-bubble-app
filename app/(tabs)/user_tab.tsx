// Style Imports
import "react-native-url-polyfill/auto";
import { useEffect, useState } from "react";
import { styled, View } from "tamagui";
import { router } from "expo-router";

// Component Imports
import Login from "@/components/macro/Login";
import SignUp from "@/components/macro/SignUp";
import User from "@/components/macro/User";
import Text from "@/components/atoms/Text";

// Utility Imports
import { supabase } from "@/utils/supabase/supabase";
import { useSessionStore } from "@/utils/stores/useSessionStore";
import { Button } from "@/components/atoms/Button";

export default function UserTab() {
  const [loading, setLoading] = useState<boolean>(false);
  const session = useSessionStore((state) => state.session);
  const setSession = useSessionStore((state) => state.setSession);
  const [isSignUp, setIsSignUp] = useState<boolean>(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session !== session) setSession(data.session);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  if (session && session.user) {
    return (
      <UserContainer>
        <User session={session} />
      </UserContainer>
    );
  }

  if (!session) {
    return (
      <FormContainer>
        <Text weight="bold" fontSize="$xl">
          Welcome to Thought Bubble!
        </Text>
        <Button
          type="normal"
          onPress={() => router.navigate({ pathname: "/account_management" })}
        >
          <Button.Text>Login</Button.Text>
        </Button>
      </FormContainer>
    );
  }
}

// Tamagui Styles
const UserContainer = styled(View, {
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  width: "100%",
  height: "100%",
  backgroundColor: "$background",
});

const FormContainer = styled(View, {
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  padding: "$xxxl",
  backgroundColor: "$background",
});
