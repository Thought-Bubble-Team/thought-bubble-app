// Libraries Import
import { styled, useTheme, View, withStaticProperties, XStack } from "tamagui";

// Components Import
import { Button } from "@/components/atoms/Button";
import Text from "@/components/atoms/Text";
// @ts-ignore
import BackLine from "@/assets/icons/backLine.svg";

// Utilities Import
import { router } from "expo-router";

interface NavigationProps {
  title?: string;
  children?: React.ReactNode;
}

const NavigationFrame = ({ title, children }: NavigationProps) => {
  const theme = useTheme();
  return (
    <UtilitiesContainer>
      <XStack gap="$3" alignItems="center">
        <Button type={"icon"} onPress={() => router.back()}>
          <BackLine width={24} height={24} color={theme.black.get()} />
        </Button>
        <Text weight="bold" fontSize="$xl">
          {title}
        </Text>
      </XStack>
      <XStack
        flex={1}
        justifyContent="flex-end"
        alignItems="center"
        paddingHorizontal="$3"
      >
        {children}
      </XStack>
    </UtilitiesContainer>
  );
};

const Right = ({ children }: { children: React.ReactNode }) => {
  return <View padding={0}>{children}</View>;
};

const UtilitiesContainer = styled(View, {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingVertical: "$xs",
  width: "100%",
});

export const Navigation = withStaticProperties(NavigationFrame, {
  Right: Right,
});
