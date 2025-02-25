import { forwardRef } from "react";
import { TamaguiElement, View, ViewProps, styled } from "tamagui";

const ViewStyled = styled(View, {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  gap: "$sm",
});

const MyView = forwardRef<TamaguiElement, ViewProps>((props, ref) => {
  return <ViewStyled ref={ref} {...props} />;
});

export default MyView;
