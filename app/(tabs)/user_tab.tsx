// Style Imports
import "react-native-url-polyfill/auto";
import { useEffect } from "react";
import { styled, View } from "tamagui";

// Component Imports
import User from "@/components/macro/User";

// Utility Imports
import { useSessionStore } from "@/utils/stores/useSessionStore";

export default function UserTab() {
  const sessionStore = useSessionStore();

  useEffect(() => {
    sessionStore.listener();
  }, []);

  if (sessionStore.session && sessionStore.session.user) {
    return (
      <UserContainer>
        <User />
      </UserContainer>
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
  marginTop: "$3",
});

const FormContainer = styled(View, {
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  padding: "$xxxl",
  backgroundColor: "$background",
});
