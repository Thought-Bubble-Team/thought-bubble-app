// Style Imports
import { StyleSheet, Alert } from "react-native";
import { styled, View, XStack, YStack } from "tamagui";
import Ionicons from "@expo/vector-icons/Ionicons";

//@ts-ignore
import BackLine from "@/assets/icons/backLine.svg";

// Component Imports
import Text from "@/components/Micro/Text";
import MyScrollView from "@/components/Micro/MyScrollView";
import { Button } from "@/components/Micro/Button";
import { supabase } from "@/utils/supabase/supabase";

// Utility Imports
import { Session } from "@supabase/supabase-js";
import { Image } from "expo-image";
import { useTheme } from "tamagui";
import { router, Href } from "expo-router";
import { useSessionStore } from "@/utils/stores/useSessionStore";

interface UserProps {
  session: Session;
}

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const ButtonTester = () => {
  Alert.alert("Button Pressed");
};

const routerTester = (props: { href: Href }) => {
  const { href } = props;
  router.navigate(href);
};

export default function User(props: UserProps) {
  const { session } = props;

  const imageStyles = StyleSheet.create({
    image: {
      width: 85,
      height: 85,
      borderRadius: 48,
    },
  });

  return (
    <MainContainer>
      <UtilitiesContainer>
        <XStack gap="$5" alignItems="center">
          <Button type={"icon"} onPress={ButtonTester}>
            <BackLine width={24} height={24} />
          </Button>
          <Text weight="bold" fontSize="$xl">
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
          <Text weight="bold" fontSize="$xxl">
            John Doe
          </Text>
          <Text fontSize="$md" color={"$black"} opacity={0.57}>
            {session.user.email}
          </Text>
          <Button
            type={"normal"}
            width="80%"
            padding={5}
            marginTop={16}
            onPress={() =>
              routerTester({
                href: {
                  pathname: "/user/[id]/edit-profile",
                  params: { id: session.user.id },
                },
              })
            }
          >
            <Button.Text fontSize="$md">Edit Profile</Button.Text>
          </Button>
        </YStack>
      </ProfileContainer>
      <Settings session={session} />
    </MainContainer>
  );
}

const Settings = (props: { session: Session }) => {
  const { session } = props;
  const theme = useTheme();

  return (
    <SettingsContainer>
      <SettingsContent>
        <Text weight="medium" fontSize="$lg" marginVertical={16}>
          PERSONALIZE
        </Text>
        <Button
          type={"navigation"}
          onPress={() =>
            router.navigate({
              pathname: "/user/[id]/edit-profile",
              params: { id: session.user.id },
            })
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
            router.navigate({
              pathname: "/user/[id]/appearance",
              params: { id: session.user.id },
            })
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
        <Button type={"navigation"} onPress={ButtonTester}>
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
            router.navigate({
              pathname: "/user/[id]/my-data",
              params: { id: session.user.id },
            })
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
        <Button type={"navigation"} onPress={ButtonTester}>
          <Button.Text fontSize="$lg">Frequently Asked Questions</Button.Text>
          <Ionicons
            name="chevron-forward-outline"
            size={24}
            color={theme.black?.val}
          />
        </Button>
        <Button type={"navigation"} onPress={ButtonTester}>
          <Button.Text fontSize="$lg">Report Bugs</Button.Text>
          <Ionicons
            name="chevron-forward-outline"
            size={24}
            color={theme.black?.val}
          />
        </Button>
      </SettingsContent>
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
