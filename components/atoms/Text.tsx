import { Text as TText, TextProps, styled, TamaguiTextElement } from "tamagui";
import { forwardRef } from "react";

interface MyTextProps extends TextProps {
  weight?: "light" | "regular" | "medium" | "bold";
  children?: React.ReactNode;
}

const TextStyled = styled(TText, {
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

const Text = forwardRef<TamaguiTextElement, MyTextProps>((props, ref) => {
  const { children, weight, color, ...restProps } = props;

  return (
    <TextStyled
      testID={"textID"}
      weight={weight}
      color={!color ? "$black" : color}
      {...restProps}
      ref={ref}
    >
      {children}
    </TextStyled>
  );
});

export default Text;
