import { Card, CardProps, View, styled, XStack } from "tamagui";
//@ts-ignore
import SmugIcon from "@/assets/icons/smugIcon.svg";

import Text from "@/components/atoms/Text";

import { useEffect, useState } from "react";
import { formatTime } from "@/utils/dateFormat";
import { getJournalSentiment } from "@/utils/supabase/db-crud";
import { SentimentSummaryDataType } from "@/utils/interfaces/dataTypes";
import { sentimentSummary } from "@/utils/sampleSentimentData";

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
  showSentimentData?: boolean;
}

const CardStyled = styled(Card, {
  backgroundColor: "transparent",
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
  const { journalEntry, children, showSentimentData, ...restProps } = props;
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
      {...restProps}
      backgroundColor={"$grey2"}
      borderTopRightRadius={"$4"}
      marginVertical={"$sm"}
      width={"100%"}
      elevationAndroid={2}
    >
      {journalEntry && (
        <Card.Header
          padded
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
        <View width="100%">
          {journalEntry && (
            <Text
              fontSize="$lg"
              color={"$black"}
              numberOfLines={4}
              ellipsizeMode={"tail"}
              lineHeight="$xxl"
            >
              {journalEntry.content}
            </Text>
          )}
        </View>
        {showSentimentData && sentiment && (
          <View width="100%" marginVertical="$xs">
            <SentimentSummaryBar
              sentimentData={generateRandomSentimentSummary()}
            />
          </View>
        )}
      </View>
    </CardStyled>
  );
}

enum EmotionColor {
  joy = "#FAB9B9",
  neutral = "#F7C8BB",
  sadness = "#C8988A",
  anger = "#CB806A",
  love = "#846258",
}

// Temporary
export function generateRandomSentimentSummary(): SentimentSummaryDataType {
  return {
    message: "Sentiment data fetched successfully",
    data: {
      joy: Math.floor(Math.random() * 20) + 1, // Random number between 1-20
      neutral: Math.floor(Math.random() * 20) + 1,
      sadness: Math.floor(Math.random() * 20) + 1,
      anger: Math.floor(Math.random() * 20) + 1,
      love: Math.floor(Math.random() * 20) + 1,
    },
  };
}

const SentimentSummaryBar = ({
  sentimentData,
}: {
  sentimentData: SentimentSummaryDataType;
}) => {
  const { data } = sentimentData;
  const total = Object.values(data).reduce((acc, curr) => acc + curr, 0);
  return (
    <XStack width="100%" height="$sm">
      {Object.entries(data).map(([emotion, value]) => (
        <View
          key={emotion}
          backgroundColor={EmotionColor[emotion]}
          width={`${(value / total) * 100}%`}
          height="100%"
        />
      ))}
    </XStack>
  );
};
