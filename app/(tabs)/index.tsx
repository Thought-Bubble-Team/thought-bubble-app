import MyScrollView from "@/components/MyScrollView";
import MyView from "@/components/MyView";
import MyCard from "@/components/MyCard";
import MyText from "@/components/MyText";
import ReoccuringWords from "@/components/ReoccuringWords";
import { View, Text, styled } from "tamagui";

export default function Index() {
  return (
    <MyView paddingHorizontal={"$3"} paddingVertical={"$1"}>
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
        <MyText bold fontSize={30}>
          Hello, User!
        </MyText>
        <MyText bold fontSize={14} color={"#7C7876"}>
          Jan 10, 2025
        </MyText>
      </View>
      <MyScrollView>
        <MyCard header="Reoccuring Words">
          <ReoccuringWords />
        </MyCard>
        <MyCard header="Mood Calendar">
          <MyText>Kunwari may Calendar</MyText>
        </MyCard>
        <MyCard header="Mood Flow">
          <MyText>Kunwari may Graph</MyText>
        </MyCard>
        <MyCard header="Mood Bar">
          <MyText>Mood Bar</MyText>
        </MyCard>
      </MyScrollView>
    </MyView>
  );
}
