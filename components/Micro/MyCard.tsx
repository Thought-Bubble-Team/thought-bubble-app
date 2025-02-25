import { Card, CardProps, View, styled } from "tamagui";

import Text from "@/components/Micro/Text";

interface MyCardProps extends CardProps {
  headerTitle?: string | undefined;
  children?: React.ReactNode;
}

const CardStyled = styled(Card, {
  backgroundColor: "transparent",
});

// const JournalDateText = styled(Text, {
//   fontSize: 18,
//   fontWeight: "bold",
// });

export default function MyCard(props: MyCardProps) {
  const { headerTitle, children, ...restProps } = props;
  return (
    <CardStyled
      elevate
      {...restProps}
      paddingVertical={"$sm"}
      borderRadius={"$0"}
      width={"100%"}
    >
      {headerTitle !== undefined && (
        <Card.Header
          padded
          backgroundColor={"$grey2"}
          borderTopRightRadius={"$4"}
        >
          <Text weight="bold" fontSize="$md" color={"$black"}>
            {headerTitle}
          </Text>
        </Card.Header>
      )}
      <View
        display="flex"
        alignItems="center"
        justifyContent="center"
        padding={"$xxl"}
        backgroundColor={"$grey0"}
        borderBottomLeftRadius={"$4"}
        borderBottomRightRadius={"$4"}
      >
        {children}
      </View>
    </CardStyled>
  );
}
