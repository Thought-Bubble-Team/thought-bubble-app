import { Navigation } from "@/components/macro/Navigation";
import Ionicons from "@expo/vector-icons/Ionicons";
import Screen from "@/components/atoms/Screen";
import { XStack, YStack } from "tamagui";
import { Button } from "@/components/atoms/Button";
import Text from "@/components/atoms/Text";
import useTBTheme from "@/utils/stores/usePersonalStore";

const Appearance = () => {
  const setTheme = useTBTheme((state) => state.setTheme);
  return (
    <Screen justifyContent="flex-start" marginTop="$3">
      <Navigation title="Appearance" />
      <YStack gap="$3" padding="$3">
        <XStack>
          <Text weight="bold" fontSize="$lg">
            Theme
          </Text>
        </XStack>
        <XStack>
          <Button
            type="navigation"
            size="$lg"
            onPress={() => setTheme("light")}
          >
            <Button.Text>Light Coffee</Button.Text>
            <Button.Icon>
              <Ionicons name="cafe-outline" />
            </Button.Icon>
          </Button>
        </XStack>
        <XStack>
          <Button type="navigation" size="$lg" onPress={() => setTheme("dark")}>
            <Button.Text>Night Owl</Button.Text>
            <Button.Icon>
              <Ionicons name="moon-outline" />
            </Button.Icon>
          </Button>
        </XStack>
      </YStack>
    </Screen>
  );
};

export default Appearance;
