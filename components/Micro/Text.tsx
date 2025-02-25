import { Text as TText, TextProps, styled } from "tamagui";

interface MyTextProps extends TextProps {
  weight?: "light" | "regular" | "medium" | "bold";
  children?: React.ReactNode;
}

const TextStyled = styled(TText, {
  name: "MyText",
  variants: {
    weight: {
      light: {
        fontFamily: "Montserrat_300Light",
      },
      regular: {
        fontFamily: "Montserrat_400Regular",
      },
      medium: {
        fontFamily: "Montserrat_500Medium",
      },
      bold: {
        fontFamily: "Montserrat_700Bold",
      },
    },
  },
});

export default function Text(props: MyTextProps) {
  const { children, weight, color, ...restProps } = props;

  return (
    <TextStyled
      testID={"textID"}
      weight={weight}
      color={!color ? "$black" : color}
      {...restProps}
    >
      {children}
    </TextStyled>
  );
}
