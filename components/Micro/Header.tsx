// import { styled, View as TView, ViewProps as TViewProps } from "tamagui";
import {
  StyleSheet,
  View as RNView,
  ViewProps as RNViewProps,
  ViewStyle,
} from "react-native";

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
    // borderBottomColor: theme.colors.divider,
    width: "100%",
    // gap: theme.spacing.md,
    // padding: theme.spacing.md,
  },
});

export default function Header(props: HeaderProps) {
  const { children, style } = props;
  return <RNView style={[styles.container, style]}>{children}</RNView>;
}
