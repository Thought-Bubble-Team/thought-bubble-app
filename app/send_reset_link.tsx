import { styled, View, XStack, YStack } from "tamagui";

import Input from "@/components/atoms/Input";
import Text from "@/components/atoms/Text";
import { Button } from "@/components/atoms/Button";

const SendResetLink = () => {
  return (
    <FormContainer>
      <YStack padding="$3" gap="$3">
        <XStack justifyContent="center">
          <Text weight="bold" fontSize="$lg">
            Enter your email
          </Text>
        </XStack>
        <XStack>
          <Input placeholder="Email" label="Email" />
        </XStack>
        <XStack>
          <Button>
            <Button.Text>Send Reset Link</Button.Text>
          </Button>
        </XStack>
      </YStack>
    </FormContainer>
  );
};

const FormContainer = styled(View, {
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  width: "100%",
  height: "90%",
  paddingHorizontal: "$4",
  paddingVertical: "$8",
  backgroundColor: "$grey1",
  borderTopLeftRadius: 32,
  borderTopRightRadius: 32,
  elevationAndroid: 8,
});

export default SendResetLink;
