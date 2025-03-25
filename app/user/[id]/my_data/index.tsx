import Screen from "@/components/atoms/Screen";
import { Navigation } from "@/components/macro/Navigation";
import { XStack } from "tamagui";
import { Button } from "@/components/atoms/Button";
import { router } from "expo-router";

const Index = () => {
  return (
    <Screen justifyContent="flex-start">
      <Navigation title="My Data" />
      <Screen justifyContent="flex-start" padding="$3">
        <XStack>
          <Button
            type="navigation"
            size="$lg"
            onPress={() =>
              router.push({
                pathname: "/user/[id]/my_data/change_password_page",
                params: { id: 0, type: "update" },
              })
            }
          >
            <Button.Text>Change my password</Button.Text>
          </Button>
        </XStack>
        <XStack>
          <Button
            type="navigation"
            size="$lg"
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
