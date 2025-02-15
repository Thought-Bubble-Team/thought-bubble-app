import {
  StyleSheet,
  View as RNView,
  ViewProps as RNViewProps,
  ViewStyle as RNViewStyle,
} from "react-native";
// import { Text, FontFamily } from "@/components/Micro/Text";
import { Text } from "tamagui";
import { useTheme } from "@rneui/themed";
import React from "react";

interface CardProps extends RNViewProps {
  headerTitle?: string | undefined;
  children?: React.ReactNode;
  style?: RNViewStyle | RNViewStyle[];
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  header: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#E9DED9",
    borderTopRightRadius: 12,
  },
});

export default function Card(props: CardProps) {
  const { headerTitle, children, style, ...restProps } = props;
  const {
    theme: { colors },
  } = useTheme();

  return (
    <RNView
      style={[styles.container, style, { backgroundColor: colors.background }]}
      {...restProps}
    >
      <RNView
        style={[styles.header, { backgroundColor: colors.searchBg }]}
      ></RNView>
      <RNView>{children}</RNView>
    </RNView>
  );
}
