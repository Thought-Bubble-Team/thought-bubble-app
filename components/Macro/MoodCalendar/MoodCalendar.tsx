// Libraries
import { styled, View, ViewProps, XStack } from "tamagui";

// Components
import Day from "@/components/Macro/MoodCalendar/Day";
import Text from "@/components/atoms/Text";

// Utilities
import { parseInitialDate } from "@/utils/dateFormat";
import { useMoodCalendarDataStore } from "@/utils/stores/useChartDataStore";
import { useEffect } from "react";
import {
  MoodCalendarDataType,
  MoodCalendarType,
} from "@/utils/interfaces/dataTypes";
import { useSessionStore } from "@/utils/stores/useSessionStore";
import { provideSampleSentimentData } from "@/utils/sampleSentimentData";

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
// TODO: Add a way to fetch data at startup by storing the date locally/offline
// TODO: Update logs to use a logger

// Main Component
const MoodCalendar = (props: MoodCalendarProps) => {
  const { initialDate, ...restProps } = props;
  const currentMonth = parseInitialDate(initialDate);
  const session = useSessionStore((state) => state.session);
  // const { moodCalendarData, fetchMoodCalendarData } =
  //   useMoodCalendarDataStore();
  const sampleMoodCalendarData = {
    message: "Success",
    calendar: provideSampleSentimentData(initialDate),
  };

  useEffect(() => {
    // if (session) {
    //   void fetchMoodCalendarData(
    //     session.user.id,
    //     currentMonth.getMonth() + 1,
    //     currentMonth.getFullYear(),
    //   );
    // }
  }, [initialDate]);

  const sampleSentimentData = sampleMoodCalendarData;

  const renderCalendarCells = () => {
    const getDaysInMonth = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const getSentimentForDate = (date: Date): MoodCalendarType | undefined => {
      if (!sampleSentimentData?.calendar) return undefined;
      const dateString = date.toISOString().split("T")[0];

      return sampleSentimentData.calendar.find((item) => {
        const itemDate = new Date(item.date);
        const itemDateString = itemDate.toISOString().split("T")[0];
        return itemDateString === dateString;
      });
    };

    const days: { key: string; day?: string; emotions?: string }[] = [];
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth);

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ key: `empty-${i}` });
    }

    // console.log("DaySlot & BlankSlot Loop: \n");
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        Date.UTC(currentMonth.getFullYear(), currentMonth.getMonth(), day),
      );
      const sentimentData = getSentimentForDate(date);
      // console.log(`\x1b[35mSentimentData: ${sentimentData}\x1b[0m`);

      days.push({
        key: sentimentData ? `day-${day}` : `blank-${day}`,
        day: `${day}`,
        emotions: sentimentData ? sentimentData.emotions : undefined,
      });
    }

    const totalCells = 35;
    const remainingCells = totalCells - days.length;
    for (let i = 0; i < remainingCells; i++) {
      days.push({ key: `extra-empty-${i}` });
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
