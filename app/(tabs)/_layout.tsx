import { Tabs } from "expo-router";
import { useColorScheme, StyleSheet, View } from "react-native";
import { Button } from "@rneui/themed";

import TabIcons from "@/components/Icons/TabIcons";

import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colorScheme === "light" ? "#1a141f" : "#fdfcfd",
        headerStyle: {
          backgroundColor: colorScheme === "dark" ? "#1a141f" : "#fdfcfd",
          elevation: 0,
        },
        headerShown: false,
        tabBarStyle: {
          height: 60,
          backgroundColor: colorScheme === "dark" ? "#1a141f" : "#ffffff",
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
            <View>
              <TabIcons
                colorScheme={colorScheme}
                focused={focused}
                type={"chart"}
                size={size * 1.3}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="journals"
        options={{
          title: "Journals",
          tabBarIcon: ({ size, focused }) => (
            <View>
              <TabIcons
                colorScheme={colorScheme}
                focused={focused}
                type={"note"}
                size={size * 1.3}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="create"
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
            <View style={styles.IconContainer}>
              <TabIcons
                colorScheme={colorScheme}
                focused={focused}
                type={"flower"}
                size={size * 1.5}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="user_tab"
        options={{
          title: "User",
          tabBarIcon: ({ size, focused }) => (
            <View style={styles.IconContainer}>
              <TabIcons
                colorScheme={colorScheme}
                focused={focused}
                type={"user"}
                size={size * 1.3}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const CustomTabBarButton = ({ children, onPress }: BottomTabBarButtonProps) => {
  return (
    <Button
      containerStyle={styles.PenButton}
      size="lg"
      radius="xxxl"
      color="white"
      onPress={onPress}
    >
      <View>{children}</View>
    </Button>
  );
};

const styles = StyleSheet.create({
  IconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: 10,
  },
  PenButton: {
    width: 80,
    height: 80,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    padding: 20,
    top: -25,
    elevation: 5,
  },
});
