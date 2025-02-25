import { Card, CardProps, View, styled } from "tamagui";
//@ts-ignore
import SmugIcon from "@/assets/icons/smugIcon.svg";

import Text from "@/components/Micro/Text";

import { useEffect, useState } from "react";
import { formatTime } from "@/utils/dateFormat";
import { getJournalSentiment } from "@/utils/supabase/db-crud";

export type JournalEntryType = {
  entry_id: number;
  user_id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export type SentimentType = {
  sentiment_id: number;
  entry_id: number;
  sentiment: string;
  confidence_score: number;
  created_at: string;
  emotions: {
    joy: number;
    fear: number;
    love: number;
    anger: number;
    grief: number;
    pride: number;
    caring: number;
    desire: number;
    relief: number;
    disgust: number;
    neutral: number;
    remorse: number;
    sadness: number;
    approval: number;
    optimism: number;
    surprise: number;
    amusement: number;
    annoyance: number;
    confusion: number;
    curiosity: number;
    gratitude: number;
    admiration: number;
    excitement: number;
    disapproval: number;
    nervousness: number;
    realization: number;
    embarrassment: number;
    disappointment: number;
  };
};

interface MyCardProps extends CardProps {
  journalEntry: JournalEntryType;
  children?: React.ReactNode;
}

const CardStyled = styled(Card, {
  backgroundColor: "transparent",
});

const JournalDateText = styled(Text, {
  fontSize: 18,
  fontWeight: "bold",
});

export function getHighestEmotion(sentiment: SentimentType): string {
  const emotions = sentiment.emotions;
  let highestEmotion = "";
  let highestValue = -Infinity;

  for (const [emotion, value] of Object.entries(emotions)) {
    if (value > highestValue) {
      highestValue = value;
      highestEmotion = emotion;
    }
  }

  return highestEmotion;
}

export default function MyCard(props: MyCardProps) {
  const { journalEntry, children, ...restProps } = props;
  const [sentiment, setSentiment] = useState<SentimentType[] | null>(null);
  const [emotion, setEmotion] = useState<String | null>(null);

  useEffect(() => {
    getJournalSentiment(journalEntry.entry_id).then((data) => {
      if (data?.sentimentData) {
        setSentiment(data.sentimentData);
      }
    });
  }, []);

  return (
    <CardStyled
      elevate
      {...restProps}
      paddingVertical={"$3"}
      borderRadius={"$0"}
      width={"100%"}
    >
      {journalEntry && (
        <Card.Header
          padded
          backgroundColor={"$grey2"}
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
            {!emotion && <SmugIcon width={24} height={24} />}
            <Text weight="bold" fontSize="$lg" color={"$black"}>
              {journalEntry.title}
            </Text>
          </View>
          <Text weight="bold" fontSize="$lg" color={"$black"} opacity={0.4}>
            {formatTime(journalEntry.created_at)}
          </Text>
        </Card.Header>
      )}
      <View
        display="flex"
        alignItems="flex-start"
        justifyContent="center"
        padding={"$5"}
        backgroundColor={"$grey0"}
        borderBottomLeftRadius={"$4"}
        borderBottomRightRadius={"$4"}
      >
        {journalEntry && (
          <Text fontSize="$lg" color={"$black"}>
            {journalEntry.content}
          </Text>
        )}
        {children}
      </View>
    </CardStyled>
  );
}
