import { useEffect, useState } from "react";
import { styled, View } from "tamagui";

import Login from "@/components/macro/Login";
import SignUp from "@/components/macro/SignUp";

import { useSessionStore } from "@/utils/stores/useSessionStore";
import { supabase } from "@/utils/supabase/supabase";

const AccountManagement = () => {
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

  return (
    <FormContainer>
      <View width="100%">
        {/** LOGIN SECTION */}
        {!isSignUp && (
          <Login
            setIsSignUp={setIsSignUp}
            loading={loading}
            setLoading={setLoading}
          />
        )}
        {isSignUp && (
          <SignUp
            setIsSignUp={setIsSignUp}
            loading={loading}
            setLoading={setLoading}
          />
        )}
      </View>
    </FormContainer>
  );
};

const FormContainer = styled(View, {
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  width: "100%",
  height: "90%",
  paddingHorizontal: "$4",
  paddingVertical: "$8",
  backgroundColor: "$grey1",
  borderTopLeftRadius: 32,
  borderTopRightRadius: 32,
  elevationAndroid: 8,
});

export default AccountManagement;
