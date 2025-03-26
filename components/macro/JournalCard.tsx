import {
  Card as TCard,
  CardProps as TCardProps,
  View as TView,
  styled,
} from "tamagui";

import { Card } from "@/components/atoms/Card";
import Text from "@/components/atoms/Text";
import MoodIcons from "@/components/Icons/MoodIcons";

import { formatTime } from "@/utils/dateFormat";
import { SentimentType } from "@/utils/interfaces/dataTypes";
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
  const { journalEntry, children, showSentimentData, emotion, ...restProps } =
    props;

  return (
    <Card>
      <Card.Header justifyContent="space-between">
        <TView flexDirection="row" alignItems="center" gap="$xs">
          {emotion && showSentimentData && (
            <TView>
              <MoodIcons mood={emotion} size={24} />
            </TView>
          )}
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
      </Card.Body>
    </Card>
  );
}
