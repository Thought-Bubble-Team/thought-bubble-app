import { View } from "tamagui";
import { Card } from "@/components/atoms/Card";
import Text from "@/components/atoms/Text";

export const ReoccurringWords = () => {
  return (
    <Card>
      <Card.Header>
        <Card.HeaderText>Reoccurring Words</Card.HeaderText>
      </Card.Header>
      <Card.Body>
        <ReoccurringWordsChart />
      </Card.Body>
    </Card>
  );
};

export const ReoccurringWordsChart = () => {
  return (
    <View>
      <Text>ReoccurringWords</Text>
    </View>
  );
};
