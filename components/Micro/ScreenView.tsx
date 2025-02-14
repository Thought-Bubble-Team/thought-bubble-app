import {
  StyleSheet,
  View as RNView,
  ViewProps as RNViewProps,
  ViewStyle,
} from "react-native";

interface ViewProps extends RNViewProps {
  children?: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 2,
    // backgroundColor: theme.colors.background,
    gap: 18,
  },
});

export default function ScreenView(props: ViewProps) {
  const { children, style } = props;
  return <RNView style={[styles.container, style]}>{children}</RNView>;
}
