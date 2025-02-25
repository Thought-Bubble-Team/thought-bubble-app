// Style Imports
import "react-native-url-polyfill/auto";
import { ReactElement, useEffect, useState } from "react";
import { styled, View } from "tamagui";

// Component Imports
import Login from "@/components/Macro/Login";
import SignUp from "@/components/Macro/SignUp";
import User from "@/components/Macro/User";

// Utility Imports
import { supabase } from "@/utils/supabase/supabase";
import { useSessionStore } from "@/utils/stores/useSessionStore";

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
      },
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
        {/** LOGIN SECTION */}
        {!isSignUp && (
          <Login setIsSignUp={setIsSignUp} setLoading={setLoading} />
        )}
        {isSignUp && (
          <SignUp setIsSignUp={setIsSignUp} setLoading={setLoading} />
        )}
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
