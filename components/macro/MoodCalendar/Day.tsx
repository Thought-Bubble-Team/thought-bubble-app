import React from "react";
import { styled, View } from "tamagui";
import { router } from "expo-router";

import Text from "@/components/atoms/Text";
import MoodIcons from "@/components/Icons/MoodIcons";

interface DayProps {
  day?: string;
  emotions?: string;
  date?: Date;
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
  const { day, emotions, date } = props;

  const handlePress = () => {
    if (date && day && emotions) {
      const month = date.getMonth();
      const day = date.getDate().toString();
      router.push({
        pathname: "/journals",
        params: {
          month: month.toString(),
          day: day,
        },
      });
    }
  };

  return (
    <DayContainer
      testID="day-container"
      onPress={handlePress}
      cursor={day && emotions ? "pointer" : "default"}
    >
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
