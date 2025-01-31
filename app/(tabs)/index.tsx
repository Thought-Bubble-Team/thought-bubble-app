import MyScrollView from "@/components/MyScrollView";
import MyView from "@/components/MyView";
import MyCard from "@/components/MyCard";
import MyText from "@/components/MyText";
import ReoccuringWords from "@/components/ReoccuringWords";
import MySelect from "@/components/MySelect";

import { View, Text, styled } from "tamagui";
import { useState } from "react";

const months = [
  { id: 1, month: "Jan", year: 2025 },
  { id: 2, month: "Feb", year: 2025 },
  { id: 3, month: "Mar", year: 2025 },
  { id: 4, month: "Apr", year: 2025 },
  { id: 5, month: "May", year: 2025 },
  { id: 6, month: "Jun", year: 2025 },
  { id: 7, month: "Jul", year: 2025 },
  { id: 8, month: "Aug", year: 2025 },
  { id: 9, month: "Sep", year: 2025 },
  { id: 10, month: "Oct", year: 2025 },
  { id: 11, month: "Nov", year: 2025 },
  { id: 12, month: "Dec", year: 2025 },
];

export default function Index() {
  const [val, setVal] = useState<string>(months[0].month);

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
        <MyText bold fontSize={30} color={"$textColor"}>
          Hello, User!
        </MyText>
        <MySelect
          color={"$subtleTextColor"}
          val={val}
          setVal={setVal}
          months={months}
        />
      </View>
      <MyScrollView>
        <MyCard headerTitle="Reoccuring Words">
          <ReoccuringWords />
        </MyCard>
        <MyCard headerTitle="Mood Calendar">
          <MyText>{val}</MyText>
        </MyCard>
        <MyCard headerTitle="Mood Flow">
          <MyText>Kunwari may Graph</MyText>
        </MyCard>
        <MyCard headerTitle="Mood Bar">
          <MyText>Mood Bar</MyText>
        </MyCard>
      </MyScrollView>
    </MyView>
  );
}
