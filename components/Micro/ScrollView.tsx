import {
  ScrollView as RNScrollView,
  ScrollViewProps as RNScrollViewProps,
} from "react-native";

interface ViewProps extends RNScrollViewProps {
  children?: React.ReactNode;
}

export default function ScrollView(props: ViewProps) {
  const { children, ...restProps } = props;
  return (
    <RNScrollView
      showsVerticalScrollIndicator={false}
      style={{ width: "100%", height: "100%" }}
      {...restProps}
    >
      {children}
    </RNScrollView>
  );
}
