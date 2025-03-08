import { forwardRef } from "react";
import {
  ScrollView as TScrollView,
  ScrollViewProps as TScrollViewProps,
} from "tamagui";

const ScrollView = forwardRef<TScrollView, TScrollViewProps>((props, ref) => {
  return (
    <TScrollView showsVerticalScrollIndicator={false} ref={ref} {...props} />
  );
});

export default ScrollView;
