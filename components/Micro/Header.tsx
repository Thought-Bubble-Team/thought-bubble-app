import {
  StyleSheet,
  View as RNView,
  ViewProps as RNViewProps,
  ViewStyle,
} from "react-native";
import { useTheme } from "@rneui/themed";

interface HeaderProps extends RNViewProps {
  children?: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    width: "100%",
  },
});

export default function Header(props: HeaderProps) {
  const { children, style } = props;
  const { theme } = useTheme();

  const extraStyles = {
    borderBottomColor: theme.colors.divider,
    gap: theme.spacing.sm,
    padding: theme.spacing.sm,
  };

  return (
    <RNView style={[styles.container, extraStyles, style]}>{children}</RNView>
  );
}
