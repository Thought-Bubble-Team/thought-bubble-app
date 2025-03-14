// Libraries Imports
import { StyleSheet, Alert } from "react-native";
import { styled, View, XStack, YStack } from "tamagui";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  useBoolVariation,
  useLDClient,
} from "@launchdarkly/react-native-client-sdk";

//@ts-ignore
import BackLine from "@/assets/icons/backLine.svg";

// Component Imports
import Text from "@/components/atoms/Text";
import ScrollView from "@/components/atoms/ScrollView";
import { Button } from "@/components/atoms/Button";
import { supabase } from "@/utils/supabase/supabase";

// Utility Imports
import { Session } from "@supabase/supabase-js";
import { Image } from "expo-image";
import { useTheme } from "tamagui";
import { router, Href } from "expo-router";
import {
  useSessionStore,
  useUserDataStore,
} from "@/utils/stores/useSessionStore";
import { useEffect } from "react";

interface UserProps {
  session: Session;
}

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const ButtonTester = () => {
  Alert.alert("Button Pressed");
};

// TODO: Replace session props with session store
export default function User(props: UserProps) {
  const { session } = props;
  const sessionStore = useSessionStore();
  const userDataStore = useUserDataStore();

  const FEATURE_FLAGS = {
    USER_SETTINGS: useBoolVariation("user-settings", false),
  };
  const ldc = useLDClient();

  useEffect(() => {
    const Prepare = async () => {
      try {
        ldc
          .identify({ kind: "user", key: "example-user-key", name: "Sandy" })
          .catch((e: any) => Alert.alert(("Error: " + e) as string));
        await userDataStore.fetchUserData(session.user.id);
      } catch (e) {
        console.error(e);
      }
    };
    Prepare();
  }, []);

  const imageStyles = StyleSheet.create({
    image: {
      width: 85,
      height: 85,
      borderRadius: 48,
    },
  });

  return (
    <MainContainer>
      <ProfileContainer>
        <Image
          style={imageStyles.image}
          source="https://placecats.com/300/200"
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
        />
        <YStack gap={"$1"}>
          <Text weight="bold" fontSize="$xxl">
            {sessionStore.userData?.username}
          </Text>
          <Text fontSize="$md" color={"$black"} opacity={0.57}>
            {session.user.email}
          </Text>
          {!FEATURE_FLAGS.USER_SETTINGS && (
            <Button
              type={"normal"}
              width="80%"
              padding={5}
              marginTop={16}
              onPress={() =>
                !FEATURE_FLAGS.USER_SETTINGS
                  ? router.navigate({
                      pathname: "/user/[id]/edit-profile",
                      params: { id: session.user.id, type: "update" },
                    })
                  : ButtonTester()
              }
            >
              <Button.Text fontSize="$md">Edit Profile</Button.Text>
            </Button>
          )}
        </YStack>
      </ProfileContainer>
      <Settings session={session} featureFlags={FEATURE_FLAGS} />
    </MainContainer>
  );
}

const Settings = (props: {
  session: Session;
  featureFlags: { USER_SETTINGS: boolean };
}) => {
  const { session, featureFlags } = props;
  const theme = useTheme();

  return (
    <SettingsContainer>
      {featureFlags.USER_SETTINGS && (
        <>
          <SettingsContent>
            <Text weight="medium" fontSize="$lg" marginVertical={16}>
              PERSONALIZE
            </Text>
            <Button
              type={"navigation"}
              onPress={() =>
                featureFlags.USER_SETTINGS
                  ? router.navigate({
                      pathname: "/user/[id]/edit-profile",
                      params: { id: session.user.id },
                    })
                  : ButtonTester()
              }
            >
              <Button.Text fontSize="$lg">Preferences</Button.Text>
              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color={theme.black?.val}
              />
            </Button>
            <Button
              type={"navigation"}
              onPress={() =>
                featureFlags.USER_SETTINGS
                  ? router.navigate({
                      pathname: "/user/[id]/appearance",
                      params: { id: session.user.id },
                    })
                  : ButtonTester()
              }
            >
              <Button.Text fontSize="$lg">Appearance</Button.Text>
              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color={theme.black?.val}
              />
            </Button>
          </SettingsContent>
          <SettingsContent>
            <Text weight="medium" fontSize="$lg" marginVertical={16}>
              ACCOUNT
            </Text>
            <Button
              type={"navigation"}
              onPress={() =>
                featureFlags.USER_SETTINGS ? ButtonTester() : ButtonTester()
              }
            >
              <Button.Text fontSize="$lg">About Premium</Button.Text>
              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color={theme.black?.val}
              />
            </Button>
            <Button
              type={"navigation"}
              onPress={() =>
                featureFlags.USER_SETTINGS
                  ? router.navigate({
                      pathname: "/user/[id]/my-data",
                      params: { id: session.user.id },
                    })
                  : ButtonTester()
              }
            >
              <Button.Text fontSize="$lg">Your Data</Button.Text>
              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color={theme.black?.val}
              />
            </Button>
          </SettingsContent>
          <SettingsContent>
            <Text weight="medium" fontSize="$lg" marginVertical={16}>
              HELP AND SUPPORT
            </Text>
            <Button
              type={"navigation"}
              onPress={() =>
                featureFlags.USER_SETTINGS ? ButtonTester() : ButtonTester()
              }
            >
              <Button.Text fontSize="$lg">
                Frequently Asked Questions
              </Button.Text>
              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color={theme.black?.val}
              />
            </Button>
            <Button
              type={"navigation"}
              onPress={() =>
                featureFlags.USER_SETTINGS ? ButtonTester() : ButtonTester()
              }
            >
              <Button.Text fontSize="$lg">Report Bugs</Button.Text>
              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color={theme.black?.val}
              />
            </Button>
          </SettingsContent>
        </>
      )}
      <SettingsContainer marginBottom={16}>
        <Button
          type={"navigation"}
          onPress={() => supabase.auth.signOut()}
          backgroundColor="#F88379"
        >
          <Button.Text fontSize="$lg" color="$white">
            SIGN OUT
          </Button.Text>
        </Button>
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
  borderBottomColor: "$grey2",
});

const SettingsContainer = styled(ScrollView, {
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
