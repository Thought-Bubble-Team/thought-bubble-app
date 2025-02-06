import { Text, TextProps, styled } from "tamagui";

interface MyTextProps extends TextProps {
  weight?: "light" | "regular" | "medium" | "bold";
  children?: React.ReactNode;
}

export default function MyText(props: MyTextProps) {
  const { children, ...restProps } = props;

  const TextStyled = styled(Text, {
    fontFamily: fontWeight(props.weight || "regular"),
  });

  return <TextStyled {...restProps}>{children}</TextStyled>;
}

const fontWeight = (weight: "light" | "regular" | "medium" | "bold") => {
  switch (weight) {
    case "light":
      return "Montserrat_300Light";
    case "regular":
      return "Montserrat_400Regular";
    case "medium":
      return "Montserrat_500Medium";
    case "bold":
      return "Montserrat_700Bold";
    default:
      return "Montserrat_400Regular";
  }
};
