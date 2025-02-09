import MyScrollView from "@/components/MyScrollView";
import MyView from "@/components/MyView";
import MyCard from "@/components/MyCard";
import Text from "@/components/Text";
import ReoccuringWords from "@/components/ReoccuringWords";
import MySelect from "@/components/MySelect";
import MonthYearSelect from "@/components/MonthYearSelect";

import { View, styled } from "tamagui";
import { useState } from "react";

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
const currentMonth = new Date().getMonth();

const dateOptions: { id: number; date: string }[] = [];
for (let year = startYear; year <= currentYear; year++) {
  for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
    if (year === currentYear && monthIndex > currentMonth) break;
    dateOptions.push({
      id: dateOptions.length,
      date: `${months[monthIndex]} ${year}`,
    });
  }
}

export default function Index() {
  const [val, setVal] = useState<string>("Jan 2025");

  return (
    <MyView
      paddingHorizontal={"$3"}
      paddingVertical={"$1"}
      backgroundColor={"$background"}
    >
      <View
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderBottomWidth={"$1"}
        borderBottomColor={"#EAE2DE"}
        width={"100%"}
        gap={"$4"}
        padding={"$4"}
      >
        <Text weight="bold" fontSize={30} color={"$textColor"}>
          Hello, User!
        </Text>
        <MySelect
          color={"$subtleTextColor"}
          val={val}
          setVal={setVal}
          date={dateOptions}
        />
      </View>
      <MyScrollView>
        <MyCard headerTitle="Reoccuring Words">
          <ReoccuringWords />
        </MyCard>
        <MyCard headerTitle="Mood Calendar">
          <Text>{val}</Text>
        </MyCard>
        <MyCard headerTitle="Mood Flow">
          <Text>Kunwari may Graph</Text>
        </MyCard>
        <MyCard headerTitle="Mood Bar">
          <Text>Mood Bar</Text>
        </MyCard>
      </MyScrollView>
    </MyView>
  );
}
