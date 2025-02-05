import { ColorSchemeName } from "react-native";

import ChartLight from "@/assets/icons/chartLight.svg";
import ChartDark from "@/assets/icons/chartDark.svg";
import NoteLight from "@/assets/icons/noteLight.svg";
import NoteDark from "@/assets/icons/noteDark.svg";
import SolidPenLight from "@/assets/icons/solidPenLight.svg";
import SolidPenDark from "@/assets/icons/solidPenDark.svg";

interface TabIconsProps {
  colorScheme: ColorSchemeName;
  focused: boolean;
  type: "chart" | "note" | "pen";
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
  }
}
