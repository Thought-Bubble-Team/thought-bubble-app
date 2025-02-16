import { TextInput, TextInputProps, StyleSheet } from "react-native";
import { styled, YStack, XStack, TamaguiElement } from "tamagui";
import Ionicons from "@expo/vector-icons/Ionicons";

import Text from "@/components/Micro/Text";

import { forwardRef } from "react";

interface MyInputProps extends TextInputProps {
  label: string;
}

const MyInput = forwardRef<TamaguiElement, MyInputProps>((props, ref) => {
  const { label, ...restProps } = props;

  return (
    <ViewContainer>
      <InputContainer>
        <Text weight="light" fontSize={12} color={"$subtleTextColor"}>
          {label}
        </Text>
        <TextInput {...restProps} style={inputStyles.input} />
      </InputContainer>
      {!label && <Ionicons name="help" size={24} color={"#7c7876"} />}
      {label === "Email" && (
        <Ionicons name="mail" size={24} color={"#7c7876"} />
      )}
      {label === "Password" && (
        <Ionicons name="eye" size={24} color={"#7c7876"} />
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
  backgroundColor: "$coloredBackground",
});

const InputContainer = styled(YStack, {
  alignItems: "flex-start",
});

const inputStyles = StyleSheet.create({
  input: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    fontFamily: "Montserrat_500Medium",
    fontSize: 13,
    backgroundColor: "transparent",
    color: "$textColor",
    paddingVertical: 4,
  },
});

export default MyInput;
