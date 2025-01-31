import MyView from "@/components/MyView";
import MyText from "@/components/MyText";
import MyScrollView from "@/components/MyScrollView";
import MyCard from "@/components/MyCard";
import JournalEntry from "@/components/JournalEntry";

import { View, Text, XStack, useWindowDimensions } from "tamagui";
import { Keyboard } from "react-native";
import { useEffect, useState } from "react";

export default function Create() {
  const date = new Date(); // Example date

  // Get day, date, and month
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
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

  const day = days[date.getDay()]; // e.g., "Saturday"
  const dayOfMonth = date.getDate(); // e.g., 9
  const month = months[date.getMonth()]; // e.g., "Nov"

  const formattedDate = `, ${dayOfMonth} ${month}`;

  const { height } = useWindowDimensions();

  /* const [keyboardHeight, setKeyboardHeight] = useState<number | undefined>(
    undefined,
  );
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardHeight(undefined);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []); */

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
        borderBottomColor={"$textColor"}
        width={"100%"}
        gap={"$4"}
        padding={"$4"}
      >
        <XStack width={"100%"}>
          <MyText bold fontSize={20} color={"$textColor"}>
            {day}
          </MyText>
          <MyText bold fontSize={20} color={"$subtleTextColor"}>
            {formattedDate}
          </MyText>
        </XStack>
      </View>
      <MyScrollView width={"100%"}>
        <JournalEntry />
      </MyScrollView>
    </MyView>
  );
}
