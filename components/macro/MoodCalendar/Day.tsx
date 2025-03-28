import { styled, View } from "tamagui";

import Text from "@/components/atoms/Text";
import MoodIcons from "@/components/Icons/MoodIcons";

interface DayProps {
  day?: string;
  emotions?: string;
}

const DayContainer = styled(View, {
  width: "14.28%",
  height: 50,
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "$5",
  gap: "$1.5",
});

const EmotionSlot = styled(View, {
  width: 36,
  height: 36,
  borderRadius: 18,
  justifyContent: "center",
  alignItems: "center",
});

const BlankSlot = styled(View, {
  width: 36,
  height: 36,
  borderRadius: 32,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "$grey3",
});

const EmptySlot = styled(View, {
  width: 36,
  height: 36,
  borderRadius: 18,
});

const Day = (props: DayProps) => {
  const { day, emotions } = props;

  return (
    <DayContainer testID="day-container">
      {day && emotions && (
        <>
          <EmotionSlot testID="emotion-slot">
            <MoodIcons mood={emotions} size={36} />
          </EmotionSlot>
          <Text weight="bold" fontSize={"$sm"}>
            {day}
          </Text>
        </>
      )}
      {day && !emotions && (
        <>
          <BlankSlot testID="blank-slot" />
          <Text weight="medium" fontSize={"$sm"}>
            {day}
          </Text>
        </>
      )}
      {!day && <EmptySlot testID="empty-slot"></EmptySlot>}
    </DayContainer>
  );
};

export default Day;
