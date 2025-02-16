import { forwardRef } from "react";
import { ScrollView, ScrollViewProps } from "tamagui";

const MyScrollView = forwardRef<ScrollView, ScrollViewProps>((props, ref) => {
  return <ScrollView ref={ref} {...props} />;
});

export default MyScrollView;
