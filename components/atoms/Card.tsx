import {
  styled,
  View,
  XStack,
  ViewProps,
  YStack,
  withStaticProperties,
  createStyledContext,
} from "tamagui";

import Text from "@/components/atoms/Text";

export const CardContext = createStyledContext({
  elevationAndroid: 2,
});

export const CardFrame = styled(View, {
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  padding: 0,
  elevationAndroid: 2,
});

export const CardHeader = styled(XStack, {
  width: "100%",
  justifyContent: "flex-start",
  alignItems: "center",
  padding: "$xl",

  backgroundColor: "$grey2",
  borderTopRightRadius: "$4",
});

export const CardHeaderText = styled(Text, {
  weight: "bold",
  fontSize: "$md",
  color: "$black",
});

export const CardBody = styled(View, {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "$xxl",
  backgroundColor: "$grey0",
  borderBottomLeftRadius: "$4",
  borderBottomRightRadius: "$4",
  elevationAndroid: 2,
});

export const Card = withStaticProperties(CardFrame, {
  Header: CardHeader,
  Body: CardBody,
  HeaderText: CardHeaderText,
});
