// Libraries Import
import { styled, View, XStack } from "tamagui";

// Components Import
import { Button } from "@/components/Micro/Button";
import Text from "@/components/Micro/Text";
// @ts-ignore
import BackLine from "@/assets/icons/backLine.svg";

// Utilities Import
import { router } from "expo-router";

interface NavigationProps {
  title?: string;
}

const Navigation = ({ title }: NavigationProps) => {
  return (
    <UtilitiesContainer>
      <XStack gap="$3" alignItems="center">
        <Button type={"icon"} onPress={() => router.back()}>
          <BackLine width={24} height={24} />
        </Button>
        <Text weight="bold" fontSize="$xl">
          {title}
        </Text>
      </XStack>
    </UtilitiesContainer>
  );
};

const UtilitiesContainer = styled(View, {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingVertical: "$xs",
  width: "100%",
});

export default Navigation;
