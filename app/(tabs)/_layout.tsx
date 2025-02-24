import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import { styled, View, useTheme } from "tamagui";

import TabIcons from "@/components/Icons/TabIcons";

import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";

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
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
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
        name="flower"
        options={{
          title: "Flower",
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

const CustomTabBarButton = ({ children, onPress }: BottomTabBarButtonProps) => {
  return (
    <PenButton onPress={onPress}>
      <View>{children}</View>
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
