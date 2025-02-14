import {
  Card,
  CardProps,
  Button,
  View,
  Paragraph,
  styled,
  XStack,
  YStack,
} from "tamagui";

import { Text, FontFamily } from "@/components/Micro/Text";

interface MyCardProps extends CardProps {
  headerTitle?: string | undefined;
  children?: React.ReactNode;
}

const CardStyled = styled(Card, {
  backgroundColor: "$colorTransparent",
});

export default function MyCard(props: MyCardProps) {
  const { headerTitle, children, ...restProps } = props;
  return (
    <CardStyled
      elevate
      {...restProps}
      paddingVertical={"$3"}
      borderRadius={"$0"}
      width={"100%"}
    >
      {headerTitle !== undefined && (
        <Card.Header
          padded
          backgroundColor={"$coloredBackground"}
          borderTopRightRadius={"$4"}
        >
          <Text weight={FontFamily.Bold} style={{ fontSize: 18 }}>
            {headerTitle}
          </Text>
        </Card.Header>
      )}
      <View
        display="flex"
        alignItems="center"
        justifyContent="center"
        padding={"$5"}
        backgroundColor={"$subtleBackground"}
        borderBottomLeftRadius={"$4"}
        borderBottomRightRadius={"$4"}
      >
        {children}
      </View>
    </CardStyled>
  );
}
