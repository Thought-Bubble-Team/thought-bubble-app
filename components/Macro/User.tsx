// Style Imports
import { StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Button, styled, TamaguiElement, View, XStack, YStack } from "tamagui";
import Ionicons from "@expo/vector-icons/Ionicons";

//@ts-ignore
import BackLine from "@/assets/icons/backLine.svg";

// Component Imports
import Text from "../Micro/Text";
import MyScrollView from "../Micro/MyScrollView";
import { supabase } from "@/utils/supabase/supabase";

// Utility Imports
import { Session } from "@supabase/supabase-js";
import { Image } from "expo-image";
import { forwardRef } from "react";

interface UserProps {
  session: Session;
}

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const ButtonTester = () => {
  Alert.alert("Button Pressed");
};

const User = forwardRef<TamaguiElement, UserProps>((props, ref) => {
  const { session } = props;
  return (
    <MainContainer ref={ref}>
      <UtilitiesContainer>
        <XStack gap="$5" alignItems="center">
          <TouchableOpacity
            style={buttonStyles.ButtonTransparent}
            onPress={ButtonTester}
          >
            <BackLine width={24} height={24} />
          </TouchableOpacity>
          <Text weight="bold" fontSize={20} color={"$textColor"}>
            Profile
          </Text>
        </XStack>
      </UtilitiesContainer>
      <ProfileContainer>
        <Image
          style={imageStyles.image}
          source="https://placecats.com/300/200"
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
        />
        <YStack gap={"$1"}>
          <Text weight="bold" fontSize={24} color={"$textColor"}>
            John Doe
          </Text>
          <Text fontSize={12} color={"$subtleTextColor"}>
            {session.user.email}
          </Text>
          <TouchableOpacity
            style={{ ...buttonStyles.ButtonStyledColored, marginTop: 16 }}
            onPress={ButtonTester}
          >
            <Text color="#fff" fontSize={12}>
              Edit Profile
            </Text>
          </TouchableOpacity>
        </YStack>
      </ProfileContainer>
      <Settings />
    </MainContainer>
  );
});

const Settings = () => {
  return (
    <SettingsContainer>
      <SettingsContent>
        <Text
          weight="medium"
          fontSize={16}
          color={"$textColor"}
          marginVertical={16}
        >
          PERSONALIZE
        </Text>
        <TouchableOpacity
          style={settingsButtonStyles.ButtonStyleSubtle}
          onPress={ButtonTester}
        >
          <Text weight="medium" fontSize={16} color={"$textColor"}>
            Preferences
          </Text>
          <Ionicons name="chevron-forward-outline" size={24} color="#443E3B" />
        </TouchableOpacity>
        <TouchableOpacity
          style={settingsButtonStyles.ButtonStyleSubtle}
          onPress={ButtonTester}
        >
          <Text weight="medium" fontSize={16} color={"$textColor"}>
            Appearance
          </Text>
          <Ionicons name="chevron-forward-outline" size={24} color="#443E3B" />
        </TouchableOpacity>
      </SettingsContent>
      <SettingsContent>
        <Text
          weight="medium"
          fontSize={16}
          color={"$textColor"}
          marginVertical={16}
        >
          ACCOUNT
        </Text>
        <TouchableOpacity
          style={settingsButtonStyles.ButtonStyleSubtle}
          onPress={ButtonTester}
        >
          <Text weight="medium" fontSize={16} color={"$textColor"}>
            About Premium
          </Text>
          <Ionicons name="chevron-forward-outline" size={24} color="#443E3B" />
        </TouchableOpacity>
        <TouchableOpacity
          style={settingsButtonStyles.ButtonStyleSubtle}
          onPress={ButtonTester}
        >
          <Text weight="medium" fontSize={16} color={"$textColor"}>
            Your Data
          </Text>
          <Ionicons name="chevron-forward-outline" size={24} color="#443E3B" />
        </TouchableOpacity>
      </SettingsContent>
      <SettingsContent>
        <Text
          weight="medium"
          fontSize={16}
          color={"$textColor"}
          marginVertical={16}
        >
          HELP AND SUPPORT
        </Text>
        <TouchableOpacity
          style={settingsButtonStyles.ButtonStyleSubtle}
          onPress={ButtonTester}
        >
          <Text weight="medium" fontSize={16} color={"$textColor"}>
            Frequently Asked Questions
          </Text>
          <Ionicons name="chevron-forward-outline" size={24} color="#443E3B" />
        </TouchableOpacity>
        <TouchableOpacity
          style={settingsButtonStyles.ButtonStyleSubtle}
          onPress={ButtonTester}
        >
          <Text weight="medium" fontSize={16} color={"$textColor"}>
            Report Bugs
          </Text>
          <Ionicons name="chevron-forward-outline" size={24} color="#443E3B" />
        </TouchableOpacity>
      </SettingsContent>
      <SettingsContainer marginBottom={16}>
        <TouchableOpacity
          style={{
            ...settingsButtonStyles.ButtonStyleSubtle,
            backgroundColor: "#F88379",
          }}
          onPress={() => supabase.auth.signOut()}
        >
          <Text weight="medium" fontSize={16} color={"$textColorAlt"}>
            SIGN OUT
          </Text>
        </TouchableOpacity>
      </SettingsContainer>
    </SettingsContainer>
  );
};

const MainContainer = styled(View, {
  height: "100%",
  width: "100%",
  backgroundColor: "$background",
  paddingHorizontal: "$3",
});

const UtilitiesContainer = styled(View, {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingVertical: 16,
  width: "100%",
});

const ProfileContainer = styled(View, {
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  width: "100%",
  paddingHorizontal: 12,
  paddingTop: 12,
  paddingBottom: 24,
  gap: "$5",
  borderBottomWidth: 2,
  borderBottomColor: "$coloredBackground",
});

const SettingsContainer = styled(MyScrollView, {
  width: "100%",
  paddingVertical: 8,
  gap: "$5",
});

const SettingsContent = styled(View, {
  width: "100%",
  paddingVertical: 8,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: 8,
});

const buttonStyles = StyleSheet.create({
  ButtonStyledColored: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 5,
    backgroundColor: "#CB806A",
    color: "#fff",
    borderRadius: 32,
  },
  ButtonStyleSubtle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 12,
    backgroundColor: "#F6EFEC",
    color: "#443E3B",
    borderRadius: 0,
  },
  ButtonTransparent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
});

const settingsButtonStyles = StyleSheet.create({
  ButtonStyleSubtle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 24,
    backgroundColor: "#F6EFEC",
  },
});

const imageStyles = StyleSheet.create({
  image: {
    width: 85,
    height: 85,
    borderRadius: 48,
  },
});

export default User;
