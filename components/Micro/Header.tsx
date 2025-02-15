import { forwardRef } from "react";
import {
  styled,
  TamaguiElement,
  View as TView,
  ViewProps as TViewProps,
} from "tamagui";

const ViewStyled = styled(TView, {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderBottomWidth: "$1",
  borderBottomColor: "#EAE2DE",
  width: "100%",
  gap: "$4",
  padding: "$4",
});

const Header = forwardRef<TamaguiElement, TViewProps>((props, ref) => {
  return <ViewStyled ref={ref} {...props} />;
});

export default Header;
