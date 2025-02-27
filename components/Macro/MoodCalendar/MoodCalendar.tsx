import { styled, View, XStack } from "tamagui";

import Day from "@/components/Macro/MoodCalendar/Day";
import Text from "@/components/Micro/Text";

import { parseInitialDate } from "@/utils/dateFormat";
import {
  SimpleSentimentData,
  provideSampleSentimentData,
} from "@/utils/sampleSentimentData";

const DayContainer = styled(View, {
  width: "14.28%",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "$3",
  gap: "$1.5",
});

const XStackStyled = styled(XStack, {
  flexWrap: "wrap",
  justifyContent: "flex-start",
  alignItems: "center",
});

const MoodCalendar = (props: { initialDate: string | Date }) => {
  const { initialDate } = props;
  console.log("initialDate: ", initialDate);
  const currentMonth = parseInitialDate(initialDate);
  console.log("currentMonth: ", currentMonth);
  const sampleSentimentData = provideSampleSentimentData(initialDate);
  console.log("sampleSentimentData: ", sampleSentimentData);

  const renderCalendarCells = () => {
    const getDaysInMonth = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const getSentimentForDate = (
      date: Date
    ): SimpleSentimentData | undefined => {
      const dateString = date.toISOString().split("T")[0];

      return sampleSentimentData.find((item) => {
        const itemDate = new Date(item.created_at);
        const itemDateString = itemDate.toISOString().split("T")[0];
        return itemDateString === dateString;
      });
    };

    const days: { key: string; day?: string; emotions?: string }[] = [];
    const daysInMonth = getDaysInMonth(currentMonth);
    console.log("daysInMonth", daysInMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth);
    console.log("firstDayOfMonth", firstDayOfMonth);

    // Add empty cells for days before the first day of month
    console.log("EmptySlot Loop: \n");
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ key: `empty-${i}` });
      console.log(`empty-${i}`);
    }

    console.log("DaySlot & BlankSlot Loop: \n");
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        Date.UTC(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      );
      console.log("date", date);
      const sentimentData = getSentimentForDate(date);
      console.log(`\x1b[35mSentimentData: ${sentimentData}\x1b[0m`);

      days.push({
        key: sentimentData ? `day-${day}` : `blank-${day}`,
        day: `${day}`,
        emotions: sentimentData?.emotion,
      });
    }

    const totalCells = 35;
    const remainingCells = totalCells - days.length;
    console.log("remainingCells: ", remainingCells);

    console.log("ExtraEmptySlot Loop: \n");
    for (let i = 0; i < remainingCells; i++) {
      days.push({ key: `extra-empty-${i}` });
      console.log(`extra-empty-${i}`);
    }

    return days;
  };

  return (
    <View
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
    >
      <XStackStyled>
        <DayContainer>
          <Text>Sun</Text>
        </DayContainer>
        <DayContainer>
          <Text>Mon</Text>
        </DayContainer>
        <DayContainer>
          <Text>Tue</Text>
        </DayContainer>
        <DayContainer>
          <Text>Wed</Text>
        </DayContainer>
        <DayContainer>
          <Text>Thu</Text>
        </DayContainer>
        <DayContainer>
          <Text>Fri</Text>
        </DayContainer>
        <DayContainer>
          <Text>Sat</Text>
        </DayContainer>
      </XStackStyled>
      <XStackStyled>
        {renderCalendarCells().map((item) => (
          <Day key={item.key} day={item.day} emotions={item.emotions} />
        ))}
      </XStackStyled>
    </View>
  );
};

export default MoodCalendar;
