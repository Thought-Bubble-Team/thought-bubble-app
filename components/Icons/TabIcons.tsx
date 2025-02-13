import { ColorSchemeName } from "react-native";

// @ts-ignore
import ChartLight from "@/assets/icons/chartLight.svg";
// @ts-ignore
import ChartDark from "@/assets/icons/chartDark.svg";
// @ts-ignore
import NoteLight from "@/assets/icons/noteLight.svg";
// @ts-ignore
import NoteDark from "@/assets/icons/noteDark.svg";
// @ts-ignore
import SolidPenLight from "@/assets/icons/solidPenLight.svg";
// @ts-ignore
import SolidPenDark from "@/assets/icons/solidPenDark.svg";
// @ts-ignore
import User from "@/assets/icons/user.svg";
// @ts-ignore
import UserFocused from "@/assets/icons/userFocused.svg";
// @ts-ignore
import Flower from "@/assets/icons/flower.svg";
// @ts-ignore
import FlowerFocused from "@/assets/icons/flowerFocused.svg";

interface TabIconsProps {
  colorScheme: ColorSchemeName;
  focused: boolean;
  type: "chart" | "note" | "pen" | "user" | "flower";
  size: number;
}

export default function TabIcons(props: TabIconsProps) {
  const { colorScheme, focused, type, size } = props;

  if (type === "chart") {
    return colorScheme === "light" ? (
      focused ? (
        <ChartLight width={size} height={size} />
      ) : (
        <ChartDark width={size} height={size} />
      )
    ) : focused ? (
      <ChartDark width={size} height={size} />
    ) : (
      <ChartLight width={size} height={size} />
    );
  } else if (type === "note") {
    return colorScheme === "light" ? (
      focused ? (
        <NoteLight width={size} height={size} />
      ) : (
        <NoteDark width={size} height={size} />
      )
    ) : focused ? (
      <NoteDark width={size} height={size} />
    ) : (
      <NoteLight width={size} height={size} />
    );
  } else if (type === "pen") {
    return colorScheme === "light" ? (
      focused ? (
        <SolidPenLight width={size} height={size} />
      ) : (
        <SolidPenDark width={size} height={size} />
      )
    ) : focused ? (
      <SolidPenDark width={size} height={size} />
    ) : (
      <SolidPenLight width={size} height={size} />
    );
  } else if (type === "user") {
    return focused ? (
      <UserFocused width={size} height={size} />
    ) : (
      <User width={size} height={size} />
    );
  } else if (type === "flower") {
    return focused ? (
      <FlowerFocused width={size} height={size} />
    ) : (
      <Flower width={size} height={size} />
    );
  }
}
