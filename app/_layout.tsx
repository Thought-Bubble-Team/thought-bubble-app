import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { useColorScheme, View } from "react-native";
import { TamaguiProvider } from "tamagui";
import {
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_700Bold,
  useFonts,
} from "@expo-google-fonts/montserrat";

import { tamaguiConfig } from "@/tamagui.config";
import * as SplashScreen from "expo-splash-screen";
import Constants from "expo-constants";
import {
  AutoEnvAttributes,
  BasicLogger,
  LDProvider,
  ReactNativeLDClient,
} from "@launchdarkly/react-native-client-sdk";
import { useCallback, useEffect, useState } from "react";
import { useSessionStore } from "@/utils/stores/useSessionStore";
import { useSelectedDateStore } from "@/utils/stores/useSelectedDateStore";

SplashScreen.preventAutoHideAsync();
const isExpoGo = Constants.executionEnvironment === "bare";

if (!isExpoGo) {
  SplashScreen.setOptions({
    duration: 1000,
    fade: true,
  });
}

const featureClient = new ReactNativeLDClient(
  "mob-d54fc957-ac80-4b9a-ab93-af276a5f6ff2",
  AutoEnvAttributes.Enabled,
  {
    debug: false,
    applicationInfo: {
      id: "ld-rn-test-app",
      version: "0.0.1",
    },
    logger: new BasicLogger({
      level: "none",
    }),
  }
);

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
  });
  const [appIsReady, setAppIsReady] = useState<boolean>(false);
  const sessionStore = useSessionStore();

  useEffect(() => {
    const prepareApp = async () => {
      try {
        if (loaded && !error) {
          await sessionStore.fetchSession();
          setAppIsReady(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    prepareApp();
  }, [loaded, error]);

  const onLayoutRootView = useCallback(() => {
    if (appIsReady) {
      SplashScreen.hide();
    }
  }, [appIsReady]);

  if (!loaded || !appIsReady) return null;

  return (
    // add this
    <LDProvider client={featureClient}>
      <TamaguiProvider config={tamaguiConfig} defaultTheme={"light"}>
        <ThemeProvider
          // value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          value={DefaultTheme}
        >
          <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <Stack
              screenOptions={({ navigation }) => ({
                headerShown: false,
              })}
            >
              <Stack.Screen name="index" options={{ presentation: "modal" }} />
              <Stack.Screen
                name="(tabs)"
                options={{
                  headerShown: false,
                  contentStyle: { backgroundColor: "#fff" },
                }}
              />
              <Stack.Screen
                name="user"
                options={{
                  title: "User",
                  contentStyle: { backgroundColor: "#fff" },
                }}
              />
              <Stack.Screen
                name="my_data"
                options={{
                  title: "My Data",
                  contentStyle: { backgroundColor: "#fff" },
                }}
              />
              <Stack.Screen
                name="graph"
                options={{
                  title: "Graph",
                  contentStyle: { backgroundColor: "#F5F5F5" },
                }}
              />
              <Stack.Screen
                name="notepad"
                options={{
                  title: "Notepad",
                  contentStyle: { backgroundColor: "#F5F5F5" },
                }}
              />
              <Stack.Screen
                name="journals"
                options={{
                  title: "Journals",
                  contentStyle: { backgroundColor: "#F5F5F5" },
                }}
              />
              <Stack.Screen
                name="onboarding_page"
                options={{
                  presentation: "modal",
                  animation: "slide_from_bottom",
                }}
              />
              <Stack.Screen
                name="account_management"
                options={{
                  presentation: "modal",
                  animation: "slide_from_bottom",
                }}
              />
              <Stack.Screen
                name="profile_setup"
                options={{
                  presentation: "modal",
                  animation: "slide_from_bottom",
                }}
              />
              <Stack.Screen
                name="agreement_page"
                options={{
                  presentation: "modal",
                  animation: "slide_from_bottom",
                }}
              />
              <Stack.Screen
                name="reset_password_page"
                options={{
                  presentation: "modal",
                }}
              />
            </Stack>
          </View>
        </ThemeProvider>
      </TamaguiProvider>
    </LDProvider>
  );
}
