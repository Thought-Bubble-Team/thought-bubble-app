import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useColorScheme } from "react-native";

import TabIcons from "@/components/Icons/TabIcons";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colorScheme === "light" ? "#1a141f" : "#fdfcfd",
        headerStyle: {
          backgroundColor: colorScheme === "dark" ? "#1a141f" : "#fdfcfd",
        },
        headerShown: false,
        tabBarStyle: {
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
          tabBarIcon: ({ color, focused }) => (
            // <Ionicons
            //   name={focused ? "bar-chart-sharp" : "bar-chart-outline"}
            //   color={color}
            //   size={24}
            // />
            <TabIcons
              colorScheme={colorScheme}
              focused={focused}
              type={"chart"}
              size={32}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="journals"
        options={{
          title: "Journals",
          tabBarIcon: ({ color, focused }) => (
            // <Ionicons
            //   name={focused ? "calendar-sharp" : "calendar-outline"}
            //   color={color}
            //   size={24}
            // />
            <TabIcons
              colorScheme={colorScheme}
              focused={focused}
              type={"note"}
              size={32}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          tabBarIcon: ({ color, focused }) => (
            // <Ionicons
            //   name={focused ? "pencil-sharp" : "pencil-outline"}
            //   color={color}
            //   size={24}
            // />
            <TabIcons
              colorScheme={colorScheme}
              focused={focused}
              type={"pen"}
              size={40}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="flower"
        options={{
          title: "Flower",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "flower-sharp" : "flower-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: "User",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person-sharp" : "person-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}
