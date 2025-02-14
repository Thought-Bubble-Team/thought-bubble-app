import {
  StyleSheet,
  View as RNView,
  ViewProps as RNViewProps,
  ViewStyle,
} from "react-native";
import { useTheme } from "@rneui/themed";

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
    gap: 18,
  },
});

export default function ScreenView(props: ViewProps) {
  const { children, style } = props;
  const {
    theme: { colors },
  } = useTheme();

  return (
    <RNView
      style={[styles.container, { backgroundColor: colors.background }, style]}
    >
      {children}
    </RNView>
  );
}
