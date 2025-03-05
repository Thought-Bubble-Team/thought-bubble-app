// Libraries
import { styled, View, ViewProps, XStack } from "tamagui";

// Components
import Day from "@/components/Macro/MoodCalendar/Day";
import Text from "@/components/atoms/Text";

// Utilities
import { parseInitialDate } from "@/utils/dateFormat";
import {
  SimpleSentimentData,
  provideSampleSentimentData,
} from "@/utils/sampleSentimentData";
import { useMoodCalendarDataStore } from "@/utils/stores/useChartDataStore";
import { MoodCalendarDataType } from "@/utils/interfaces/dataTypes";
import { useEffect } from "react";

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

interface MoodCalendarProps extends ViewProps {
  initialDate: string | Date;
}

// TODO: Create a skeleton for this component
// TODO: Modify MoodCalendar Data structure to add missing days
// TODO: Add a way to fetch data at startup by storing the date locally/offline
// FIX: fetchMoodCalendarData errors code 502

// Main Component
const MoodCalendar = (props: MoodCalendarProps) => {
  const { initialDate, ...restProps } = props;
  console.log("initialDate: ", initialDate);
  const currentMonth = parseInitialDate(initialDate);
  console.log("currentMonth: ", currentMonth);
  const sampleSentimentData = provideSampleSentimentData(initialDate);
  console.log("sampleSentimentData: ", sampleSentimentData);
  const { moodCalendarData, fetchMoodCalendarData } =
    useMoodCalendarDataStore();

  useEffect(() => {
    fetchMoodCalendarData(
      "f55522f3-3089-413d-9338-e82ae53c2fe2",
      2,
      currentMonth.getFullYear(),
    );
  }, [fetchMoodCalendarData]);
  console.log(
    `\x1b[35m"fetchData result: ", ${moodCalendarData?.message}\x1b[0m`,
  );

  const renderCalendarCells = () => {
    const getDaysInMonth = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const getSentimentForDate = (
      date: Date,
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
        Date.UTC(currentMonth.getFullYear(), currentMonth.getMonth(), day),
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
      {...restProps}
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
