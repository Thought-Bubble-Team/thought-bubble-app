import { useTheme } from "tamagui";
import { ColorSchemeName } from "react-native";

import Chart from "@/assets/icons/chartLight.svg";
import Note from "@/assets/icons/noteLight.svg";
import Pen from "@/assets/icons/solidPenLight.svg";
import User from "@/assets/icons/user.svg";
import Flower from "@/assets/icons/flower.svg";

interface TabIconsProps {
  colorScheme: ColorSchemeName;
  focused: boolean;
  type: "chart" | "note" | "pen" | "user" | "flower";
  size: number;
}

export default function TabIcons(props: TabIconsProps) {
  const { colorScheme, focused, type, size } = props;
  const theme = useTheme();
  const activeColor = theme.black.get();
  const inactiveColor = theme.grey2.get();
  const penLightColor = theme.primary.get();
  const penDarkColor = theme.black.get();

  if (type === "chart") {
    return (
      <Chart
        width={size}
        height={size}
        color={focused ? activeColor : inactiveColor}
      />
    );
  } else if (type === "note") {
    return (
      <Note
        width={size}
        height={size}
        color={focused ? activeColor : inactiveColor}
      />
    );
  } else if (type === "pen") {
    return (
      <Pen
        width={size}
        height={size}
        color={colorScheme === "light" ? penLightColor : penDarkColor}
      />
    );
  } else if (type === "user") {
    return (
      <User
        width={size}
        height={size}
        color={focused ? activeColor : inactiveColor}
      />
    );
  } else if (type === "flower") {
    return (
      <Flower
        width={size}
        height={size}
        color={focused ? activeColor : inactiveColor}
      />
    );
  }
}
