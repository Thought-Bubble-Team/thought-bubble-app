import { Card, CardProps, View, styled } from "tamagui";
//@ts-ignore
import SmugIcon from "@/assets/icons/smugIcon.svg";

import Text from "@/components/Text";

import { formatTime } from "@/utils/dateFormat";

export type JournalEntryType = {
  entry_id: number;
  user_id: string;
  title: string;
  content: string;
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
          alignItems="center"
        >
          <View
            display="flex"
            flexDirection="row"
            justifyContent="flex-start"
            alignItems="center"
            gap={"$2"}
          >
            {/* <Text weight="bold" fontSize={14} color={"$textColor"}>
              {journalEntry.mood}
            </Text> */}
            <SmugIcon width={24} height={24} />
            <Text weight="bold" fontSize={14} color={"$textColor"}>
              {journalEntry.title}
            </Text>
          </View>
          <Text weight="bold" fontSize={14} color={"$subtleTextColor"}>
            {formatTime(journalEntry.created_at)}
          </Text>
        </Card.Header>
      )}
      <View
        display="flex"
        alignItems="flex-start"
        justifyContent="center"
        padding={"$5"}
        backgroundColor={"$subtleBackground"}
        borderBottomLeftRadius={"$4"}
        borderBottomRightRadius={"$4"}
      >
        {journalEntry && (
          <Text fontSize={14} color={"$textColor"}>
            {journalEntry.content}
          </Text>
        )}
        {children}
      </View>
    </CardStyled>
  );
}
