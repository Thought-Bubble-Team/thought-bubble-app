import { styled, View } from "tamagui";

type ToolTipProps = {
  text: string;
  position: "top" | "bottom" | "left" | "right";
  children: React.ReactNode;
};

const ToolTip = (props: ToolTipProps) => {
  const { text, position, children } = props;

  return <View></View>;
};
