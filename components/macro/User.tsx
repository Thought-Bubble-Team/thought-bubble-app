// Libraries Imports
import { StyleSheet, Alert } from "react-native";
import { styled, AnimatePresence, View, XStack, YStack } from "tamagui";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  useBoolVariation,
  useLDClient,
} from "@launchdarkly/react-native-client-sdk";

// Component Imports
import Text from "@/components/atoms/Text";
import ScrollView from "@/components/atoms/ScrollView";
import { Button } from "@/components/atoms/Button";
import { supabase } from "@/utils/supabase/supabase";

// Utility Imports
import { Session } from "@supabase/supabase-js";
import { Image } from "expo-image";
import { useTheme } from "tamagui";
import { router } from "expo-router";
import {
  useSessionStore,
  useUserDataStore,
} from "@/utils/stores/useSessionStore";
import { useEffect } from "react";

interface UserProps {
  session?: Session;
}

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const ButtonTester = () => {
  Alert.alert("Button Pressed");
};

// TODO: Replace session props with session store
export default function User(props: UserProps) {
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
        await userDataStore.fetchUserData(sessionStore.session?.user.id || "");
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
            {userDataStore.userData?.username}
          </Text>
          <Text fontSize="$md" color={"$black"} opacity={0.57}>
            {sessionStore.session?.user.email}
          </Text>
          {!FEATURE_FLAGS.USER_SETTINGS && (
            <AnimatePresence>
              <ComponentContainer width="80%">
                <Button
                  type={"normal"}
                  width="100%"
                  pressStyle={{
                    width: "98%",
                  }}
                  padding={5}
                  marginTop={16}
                  onPress={() =>
                    !FEATURE_FLAGS.USER_SETTINGS
                      ? router.navigate({
                          pathname: "/user/[id]/edit-profile",
                          params: {
                            id: sessionStore.session?.user.id || "",
                            type: "update",
                          },
                        })
                      : ButtonTester()
                  }
                >
                  <Button.Text fontSize="$md">Edit Profile</Button.Text>
                </Button>
              </ComponentContainer>
            </AnimatePresence>
          )}
        </YStack>
      </ProfileContainer>
      <Settings featureFlags={FEATURE_FLAGS} />
    </MainContainer>
  );
}

const Settings = (props: { featureFlags: { USER_SETTINGS: boolean } }) => {
  const { featureFlags } = props;
  const sessionStore = useSessionStore();
  const theme = useTheme();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.replace("/account_management");
  };

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
                      params: { id: sessionStore.session?.user.id || "" },
                    })
                  : ButtonTester()
              }
            >
              <Button.Text fontSize="$lg">Preferences</Button.Text>
              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color={theme.black.get()}
              />
            </Button>
            <Button
              type={"navigation"}
              onPress={() =>
                featureFlags.USER_SETTINGS
                  ? router.navigate({
                      pathname: "/user/[id]/appearance",
                      params: { id: sessionStore.session?.user.id || "" },
                    })
                  : ButtonTester()
              }
            >
              <Button.Text fontSize="$lg">Appearance</Button.Text>
              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color={theme.black.get()}
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
                color={theme.black.get()}
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
                color={theme.black.get()}
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
                color={theme.black.get()}
              />
            </Button>
          </SettingsContent>
        </>
      )}
      <SettingsContent>
        <ComponentContainer justifyContent="flex-start">
          <Text weight="medium" fontSize="$lg" marginVertical={16}>
            ACCOUNT
          </Text>
        </ComponentContainer>
        <ComponentContainer>
          <Button
            type={"navigation"}
            onPress={() =>
              router.navigate({
                pathname: "/user/[id]/my-data",
                params: { id: sessionStore.session?.user.id || "" },
              })
            }
          >
            <Button.Text fontSize="$lg">Your Data</Button.Text>
            <Ionicons
              name="chevron-forward-outline"
              size={24}
              color={theme.black.get()}
            />
          </Button>
        </ComponentContainer>
      </SettingsContent>
      <SettingsContainer marginBottom={16}>
        <ComponentContainer>
          <Button
            type={"navigation"}
            onPress={() => handleSignOut()}
            backgroundColor="$error"
            pressStyle={{
              backgroundColor: "$errorPressed",
            }}
          >
            <Button.Text fontSize="$lg" color="$white">
              SIGN OUT
            </Button.Text>
          </Button>
        </ComponentContainer>
      </SettingsContainer>
    </SettingsContainer>
  );
};

const ComponentContainer = styled(XStack, {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
});

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
