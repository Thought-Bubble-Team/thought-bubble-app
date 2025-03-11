import { forwardRef } from "react";
import {
  TamaguiElement,
  View as TView,
  ViewProps as TViewProps,
  styled,
} from "tamagui";

const ViewStyled = styled(TView, {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  gap: "$sm",
});

// TODO: Add TView props to the Screen component
const Screen = forwardRef<TamaguiElement, TViewProps>((props, ref) => {
  return <ViewStyled ref={ref} {...props} />;
});

export default Screen;
