import { Stack } from "expo-router";
import {
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_700Bold,
  useFonts,
} from "@expo-google-fonts/montserrat";
import * as SplashScreen from "expo-splash-screen";
import { TamaguiProvider } from "tamagui";
import { tamaguiConfig } from "@/tamagui.config";
import { ThemeProvider } from "@rneui/themed";
import { theme } from "@/utils/rneui/config";

import { useEffect } from "react";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    // add this
    <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
      <ThemeProvider theme={theme}>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
              contentStyle: { backgroundColor: "#fff" },
            }}
          />
        </Stack>
      </ThemeProvider>
    </TamaguiProvider>
  );
}
