import Screen from "@/components/atoms/Screen";
import { Navigation } from "@/components/macro/Navigation";
import { XStack } from "tamagui";
import { Button } from "@/components/atoms/Button";

const Index = () => {
  return (
    <Screen justifyContent="flex-start">
      <Navigation title="My Data" />
      <Screen justifyContent="flex-start" padding="$3">
        <XStack>
          <Button type="navigation" size="$xl">
            <Button.Text>Change my password</Button.Text>
          </Button>
        </XStack>
        <XStack>
          <Button
            type="navigation"
            size="$xl"
            backgroundColor="$error"
            pressStyle={{ backgroundColor: "$errorPressed" }}
          >
            <Button.Text color="$grey0">Delete My Account</Button.Text>
          </Button>
        </XStack>
      </Screen>
    </Screen>
  );
};

export default Index;
