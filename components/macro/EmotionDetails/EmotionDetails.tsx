import ScrollView from "@/components/atoms/ScrollView";
import EmotionDetailsCard from "./EmotionDetailsCard";
import Text from "@/components/atoms/Text";

import { processEmotionSummary } from "@/utils/others/tools";

type EmotionDetailsProps = {
  emotion_summary: { emotion: string; percentage: number }[];
};

const EmotionDetails = (props: EmotionDetailsProps) => {
  const { emotion_summary } = props;
  const processed_emotion_summary = processEmotionSummary(emotion_summary);
  return (
    <ScrollView width={"100%"}>
      {!processed_emotion_summary && <Text>No emotions detected</Text>}
      {processed_emotion_summary.map((item) =>
        item ? (
          <EmotionDetailsCard
            key={`emotion-${item.emotion}`}
            emotion={item.emotion}
            value={item.value}
            color={item.color || "$grey3"}
          />
        ) : null
      )}
    </ScrollView>
  );
};

export default EmotionDetails;
