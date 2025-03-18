// Libraries
import { styled, View, ViewProps, XStack } from "tamagui";

// Components
import Day from "@/components/macro/MoodCalendar/Day";
import Text from "@/components/atoms/Text";

// Utilities
import { parseInitialDate } from "@/utils/dateFormat";
import { useMoodCalendarDataStore } from "@/utils/stores/useChartDataStore";
import { useEffect } from "react";
import { MoodCalendarType } from "@/utils/interfaces/dataTypes";
import { useSessionStore } from "@/utils/stores/useSessionStore";
import { Alert } from "react-native";

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

// Main Component
const MoodCalendar = (props: MoodCalendarProps) => {
  const { initialDate, ...restProps } = props;
  const currentMonth = parseInitialDate(initialDate);
  const session = useSessionStore((state) => state.session);
  const { moodCalendarData, fetchMoodCalendarData } =
    useMoodCalendarDataStore();

  useEffect(() => {
    const Prepare = async () => {
      try {
        if (session) {
          await fetchMoodCalendarData(
            session.user.id,
            currentMonth.getMonth() + 1,
            currentMonth.getFullYear()
          );
        } else {
          return;
        }
      } catch (error) {
        console.error("[Component](Mood Calendar)", error);
        Alert.alert("There was an error fetching the data.");
      }
    };

    Prepare();
  }, [initialDate]);

  const renderCalendarCells = () => {
    const getDaysInMonth = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const getSentimentForDate = (date: Date): MoodCalendarType | undefined => {
      if (!moodCalendarData) return undefined;
      const dateString = date.toISOString().split("T")[0];

      return moodCalendarData.calendar.find((item) => {
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

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        Date.UTC(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      );
      const sentimentData = getSentimentForDate(date);

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
