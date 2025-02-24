import { TextInput, TextInputProps, StyleSheet } from "react-native";
import { styled, YStack, XStack, TamaguiElement } from "tamagui";
import Ionicons from "@expo/vector-icons/Ionicons";

import Text from "@/components/Micro/Text";

import { forwardRef } from "react";
import { useTheme } from "tamagui";

interface MyInputProps extends TextInputProps {
  label: string;
}

const MyInput = forwardRef<TamaguiElement, MyInputProps>((props, ref) => {
  const { label, ...restProps } = props;
  const theme = useTheme();

  const inputStyles = StyleSheet.create({
    input: {
      display: "flex",
      width: "100%",
      justifyContent: "flex-start",
      alignItems: "center",
      fontFamily: "Montserrat_500Medium",
      fontSize: 13,
      backgroundColor: "transparent",
      color: "$black",
      paddingVertical: 4,
    },
  });

  return (
    <ViewContainer ref={ref}>
      <InputContainer>
        <Text weight="light" fontSize={12} color={"$black"} opacity={0.57}>
          {label}
        </Text>
        <TextInput {...restProps} style={inputStyles.input} />
      </InputContainer>
      {!label && <Ionicons name="help" size={24} color={theme.black?.val} />}
      {label === "Email" && (
        <Ionicons
          name="mail"
          size={24}
          color={theme.black?.val}
          style={{ opacity: 0.55 }}
        />
      )}
      {label === "Password" && (
        <Ionicons
          name="eye"
          size={24}
          color={theme.black?.val}
          style={{ opacity: 0.55 }}
        />
      )}
    </ViewContainer>
  );
});

const ViewContainer = styled(XStack, {
  width: "100%",
  borderRadius: 40,
  paddingHorizontal: 32,
  paddingVertical: 6,
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "$grey2",
});

const InputContainer = styled(YStack, {
  alignItems: "flex-start",
});

export default MyInput;
