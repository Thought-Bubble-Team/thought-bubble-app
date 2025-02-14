import { Text as RNEText, TextProps as RNETextProps } from "@rneui/themed";

export enum FontFamily {
  Light = "Montserrat_300Light",
  Regular = "Montserrat_400Regular",
  Medium = "Montserrat_500Medium",
  Bold = "Montserrat_700Bold",
}

interface MyTextProps extends RNETextProps {
  weight?: FontFamily;
  children?: React.ReactNode;
}

export function Text(props: MyTextProps) {
  const { children, weight, ...restProps } = props;

  const textStyle = {
    h1Style: {
      fontFamily: weight,
    },
    h2Style: {
      fontFamily: weight,
    },
    h3Style: {
      fontFamily: weight,
    },
    h4Style: {
      fontFamily: weight,
    },
    h5Style: {
      fontFamily: weight,
    },
    h6Style: {
      fontFamily: weight,
    },
    pStyle: {
      fontFamily: weight,
    },
    smStyle: {
      fontFamily: weight,
    },
  };

  return (
    <RNEText {...textStyle} {...restProps}>
      {children}
    </RNEText>
  );
}
