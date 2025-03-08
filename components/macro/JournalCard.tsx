import {
  Card as TCard,
  CardProps as TCardProps,
  View as TView,
  styled,
  XStack,
} from "tamagui";
import { useEffect, useState } from "react";

//@ts-ignore
import SmugIcon from "@/assets/icons/smugIcon.svg";

import { Card } from "@/components/atoms/Card";
import Text from "@/components/atoms/Text";

import { formatTime } from "@/utils/dateFormat";
import { getJournalSentiment } from "@/utils/supabase/db-crud";
import { SentimentSummaryDataType } from "@/utils/interfaces/dataTypes";
import { sentimentSummary } from "@/utils/sampleSentimentData";
import { JournalEntryType, SentimentType } from "@/utils/interfaces/dataTypes";
import { JournalCardProps } from "@/utils/interfaces/componentPropInterfaces";

const CardStyled = styled(TCard, {
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

export default function JournalCard(props: JournalCardProps) {
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
    <Card>
      <Card.Header justifyContent="space-between">
        <TView flexDirection="row" alignItems="center" gap="$xs">
          {/** NOTE: DISABLED EMOJI TEMPORARILY **/}
          {/** !emotion && <SmugIcon width={24} height={24} /> **/}
          <Card.HeaderText ellipsizeMode="tail">
            {journalEntry.title}
          </Card.HeaderText>
        </TView>
        <TView>
          <Text weight="bold" fontSize="$lg" color={"$black"} opacity={0.4}>
            {formatTime(journalEntry.created_at)}
          </Text>
        </TView>
      </Card.Header>
      <Card.Body alignItems="flex-start">
        <TView width="100%">
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
        </TView>
        {showSentimentData && sentiment && (
          <TView width="100%" marginVertical="$xs">
            <SentimentSummaryBar
              sentimentData={generateRandomSentimentSummary()}
            />
          </TView>
        )}
      </Card.Body>
    </Card>
  );
}

enum EmotionColor {
  joy = "#FAB9B9",
  neutral = "#F7C8BB",
  sadness = "#C8988A",
  anger = "#CB806A",
  love = "#846258",
}

// NOTE: Temporary function to simulate sentiment summary
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
        <TView
          key={emotion}
          backgroundColor={EmotionColor[emotion]}
          width={`${(value / total) * 100}%`}
          height="100%"
        />
      ))}
    </XStack>
  );
};
