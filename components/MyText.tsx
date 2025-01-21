import { Text, TextProps, styled } from "tamagui";

interface MyTextProps extends TextProps {
  bold?: boolean;
  children?: React.ReactNode;
}

export default function MyText(props: MyTextProps) {
  const { children, bold, ...restProps } = props;

  const TextStyled = styled(Text, {
    fontFamily: bold ? "Montserrat_700Bold" : "Montserrat_400Regular",
  });

  return <TextStyled {...restProps}>{children}</TextStyled>;
}
