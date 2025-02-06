import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Select, Adapt, Sheet, YStack, Text } from "tamagui";

const MonthYearSelect = () => {
  const [selectedDate, setSelectedDate] = useState<string>("Jan 2025");

  // Generate months and years dynamically
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const startYear = 2025;
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth(); // 0-based index

  // Create an array of all available months and years
  const dateOptions: string[] = [];
  for (let year = startYear; year <= currentYear; year++) {
    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
      if (year === currentYear && monthIndex > currentMonth) break; // Stop at the current month
      dateOptions.push(`${months[monthIndex]} ${year}`);
    }
  }

  return (
    <YStack space="$4" padding="$4">
      <Text fontSize={16} fontWeight="bold">
        Select Month & Year:
      </Text>
      <Select value={selectedDate} onValueChange={setSelectedDate}>
        <Select.Trigger>
          <Select.Value />
        </Select.Trigger>
        <Adapt when="sm">
          <Sheet>
            <Sheet.Frame>
              <Sheet.ScrollView>
                <Adapt.Contents />
              </Sheet.ScrollView>
            </Sheet.Frame>
            <Sheet.Overlay />
          </Sheet>
        </Adapt>
        <Select.Content>
          <Select.Viewport>
            {dateOptions.map((date) => (
              <Select.Item
                key={date}
                value={date}
                index={dateOptions.indexOf(date)}
              >
                {date}
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select>
    </YStack>
  );
};

export default MonthYearSelect;
