import { router, Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import { styled, View, useTheme } from "tamagui";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

import TabIcons from "@/components/Icons/TabIcons";
import { Button } from "@/components/atoms/Button";

import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import Text from "@/components/atoms/Text";
import { useState } from "react";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.black?.val,
        headerStyle: {
          backgroundColor: theme.background.val,
          elevation: 0,
        },
        headerShown: false,
        tabBarStyle: {
          height: 60,
          backgroundColor: theme.background.val,
          borderColor: "transparent",
          elevation: 0,
        },
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ size, focused }) => (
            <IconContainer>
              <TabIcons
                colorScheme={colorScheme}
                focused={focused}
                type={"chart"}
                size={size * 1.3}
              />
            </IconContainer>
          ),
        }}
      />
      <Tabs.Screen
        name="journals"
        options={{
          title: "Journals",
          tabBarIcon: ({ size, focused }) => (
            <IconContainer>
              <TabIcons
                colorScheme={colorScheme}
                focused={focused}
                type={"note"}
                size={size * 1.3}
              />
            </IconContainer>
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        initialParams={{ id: "new" }}
        options={{
          title: "Create",
          tabBarIcon: ({ size, focused }) => (
            <TabIcons
              colorScheme={colorScheme}
              focused={focused}
              type={"pen"}
              size={size * 2}
            />
          ),
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
      <Tabs.Screen
        name="gratitude"
        options={{
          title: "Gratitude",
          tabBarIcon: ({ size, focused }) => (
            <IconContainer>
              <TabIcons
                colorScheme={colorScheme}
                focused={focused}
                type={"flower"}
                size={size * 1.5}
              />
            </IconContainer>
          ),
        }}
      />
      <Tabs.Screen
        name="user_tab"
        options={{
          title: "User",
          tabBarIcon: ({ size, focused }) => (
            <IconContainer>
              <TabIcons
                colorScheme={colorScheme}
                focused={focused}
                type={"user"}
                size={size * 1.3}
              />
            </IconContainer>
          ),
        }}
      />
    </Tabs>
  );
}

const NotepadMenu = () => {
  return (
    <Animated.View
      // entering={SlideInDown}
      // exiting={SlideOutDown}
      entering={FadeIn}
      exiting={FadeOut}
      style={{
        position: "relative",
        alignItems: "center",
      }}
    >
      <View
        position="absolute"
        top={-195}
        left={-120}
        right={-120}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        backgroundColor="$grey3"
        padding={"$lg"}
        borderRadius={"$4"}
        gap={"$md"}
        elevationAndroid={5}
      >
        <Button
          type="normal"
          onPress={() =>
            router.push({
              pathname: "/notepad/journal-entry",
              params: { id: "null", type: "journal" },
            })
          }
          size="$sm"
        >
          <Button.Text>New Journal Entry</Button.Text>
        </Button>
        <Button
          type="normal"
          onPress={() =>
            router.push({
              pathname: "/notepad/gratitude-journal",
              params: { id: "0", type: "gratitude" },
            })
          }
          size="$sm"
          backgroundColor={"$grey5"}
        >
          <Button.Text>New Gratitude Entry</Button.Text>
        </Button>
      </View>
      <View
        position="absolute"
        top={-70}
        width={0}
        height={0}
        borderTopWidth={15}
        borderLeftWidth={15}
        borderRightWidth={15}
        borderStyle="solid"
        borderLeftColor="transparent"
        borderRightColor="transparent"
        borderTopColor="$grey3"
      ></View>
    </Animated.View>
  );
};

const CustomTabBarButton = ({ children, onPress }: BottomTabBarButtonProps) => {
  const [notepadMenu, setNotepadMenu] = useState<boolean>(false);

  return (
    <PenButton onPress={() => setNotepadMenu(!notepadMenu)}>
      <View>{children}</View>
      {notepadMenu && <NotepadMenu />}
    </PenButton>
  );
};

const IconContainer = styled(View, {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  top: 10,
});

const PenButton = styled(View, {
  width: 80,
  height: 80,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 50,
  backgroundColor: "$background",
  padding: 20,
  top: -25,
  elevationAndroid: 5,
});
