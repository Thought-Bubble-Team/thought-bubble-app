// Components Import
import MyScrollView from "@/components/Micro/MyScrollView";
import MyView from "@/components/Micro/MyView";
import MyCard from "@/components/Micro/MyCard";
import Text from "@/components/Micro/Text";
import ReoccuringWords from "@/components/Macro/ReoccuringWords";
import MySelect from "@/components/Micro/MySelect";
import Header from "@/components/Micro/Header";

// Utilities Import
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
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <MyView
      paddingHorizontal={"$3"}
      paddingVertical={"$1"}
      backgroundColor={"$background"}
    >
      <Header>
        <Text weight="bold" fontSize={30} color={"$textColor"}>
          Hello, User!
        </Text>
        <MySelect
          color={"$subtleTextColor"}
          val={val}
          setVal={setVal}
          date={dateOptions}
        />
      </Header>
      <MyScrollView width={"100%"} height={"100%"}>
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
