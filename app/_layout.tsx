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
  LDProvider,
  ReactNativeLDClient,
} from "@launchdarkly/react-native-client-sdk";
import { useCallback, useEffect, useState } from "react";

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
    debug: true,
    applicationInfo: {
      id: "ld-rn-test-app",
      version: "0.0.1",
    },
  },
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

  useEffect(() => {
    const prepareApp = () => {
      try {
        if (loaded && !error) {
          // Fetch Data here
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
      <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <Stack>
              <Stack.Screen
                name="(tabs)"
                options={{
                  headerShown: false,
                  contentStyle: { backgroundColor: "#fff" },
                }}
              />
            </Stack>
          </View>
        </ThemeProvider>
      </TamaguiProvider>
    </LDProvider>
  );
}
