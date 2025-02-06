import { Card, CardProps, View, Text, styled } from "tamagui";

import MyText from "@/components/MyText";

import { formatTime } from "@/utils/dateFormat";

export type JournalEntryType = {
  entry_id: number;
  title: string;
  content: string;
  mood: string;
  created_at: string;
  updated_at: string;
};

interface MyCardProps extends CardProps {
  journalEntry?: JournalEntryType;
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
  const { journalEntry, children, ...restProps } = props;
  return (
    <CardStyled
      elevate
      {...restProps}
      padded
      borderRadius={"$0"}
      width={"100%"}
    >
      {journalEntry && (
        <Card.Header
          padded
          backgroundColor={"$coloredBackground"}
          borderTopRightRadius={"$4"}
          flexDirection="row"
          justifyContent="space-between"
        >
          <View
            display="flex"
            flexDirection="row"
            alignItems="flex-start"
            gap={"$2"}
          >
            <MyText weight="bold" fontSize={14} color={"$textColor"}>
              {journalEntry.mood}
            </MyText>
            <MyText weight="bold" fontSize={14} color={"$textColor"}>
              {journalEntry.title}
            </MyText>
          </View>
          <MyText weight="bold" fontSize={14} color={"$subtleTextColor"}>
            {formatTime(journalEntry.created_at)}
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
        {journalEntry && (
          <MyText fontSize={14} color={"$textColor"}>
            {journalEntry.content}
          </MyText>
        )}
        {children}
      </View>
    </CardStyled>
  );
}
