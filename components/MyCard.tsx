import {
  Card,
  CardProps,
  Button,
  View,
  Text,
  Paragraph,
  styled,
  XStack,
  YStack,
} from "tamagui";

import MyText from "@/components/MyText";

interface MyCardProps extends CardProps {
  headerTitle?: string | undefined;
  children?: React.ReactNode;
}

const CardStyled = styled(Card, {
  backgroundColor: "$colorTransparent",
});

const JournalDateText = styled(Text, {
  fontSize: 18,
  fontWeight: "bold",
});

export default function MyCard(props: MyCardProps) {
  const { headerTitle, children, ...restProps } = props;
  return (
    <CardStyled
      elevate
      {...restProps}
      padded
      borderRadius={"$0"}
      width={"100%"}
    >
      {headerTitle !== undefined && (
        <Card.Header
          padded
          backgroundColor={"$coloredBackground"}
          borderTopRightRadius={"$4"}
        >
          <MyText bold fontSize={14} color={"$textColor"}>
            {headerTitle}
          </MyText>
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
