import { tokens, media, animations } from "@tamagui/config/v3";
import { createTamagui, createTokens } from "tamagui";
import { createAnimations } from "@tamagui/animations-moti";

const { size, space, ...restTokens } = tokens;

const myTokens = createTokens({
  size: {
    ...size,
    xs: 8,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 30,
  },
  space: {
    ...space,
    xs: 8,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 30,
  },
  ...restTokens,
});

const themes = {
  light: {
    primary: "#CB806A",
    secondary: "#33A1FF",
    background: "#F5F5F5",
    black: "#443E3B",
    white: "#ffffff",
    grey0: "#F6EFEC",
    grey1: "#EAE2DE",
    grey2: "#E9D9D0",
    grey3: "#D8C6BD",
    grey4: "#BCA49D",
    grey5: "#90766F",
    greyOutline: "#BBADA6",
    searchBg: "#F6EFEC",
    success: "#4CAF50",
    warning: "#FFC107",
    error: "#F44336",
    disabled: "#BCA49D",
    divider: "#BBADA6",
    primaryPressed: "#B36A53",
    secondaryPressed: "#1A8CD6",
    backgroundPressed: "#E5E5E5",
    blackPressed: "#3D3936",
    whitePressed: "#E9D9D0",
    grey0Pressed: "#E9D9D0",
    grey1Pressed: "#D8C6BD",
    grey2Pressed: "#BCA49D",
    grey3Pressed: "#90766F",
    grey4Pressed: "#90766F",
    grey5Pressed: "#90766F",
    greyOutlinePressed: "#BBADA6",
    searchBgPressed: "#E5E5E5",
    successPressed: "#43A047",
    warningPressed: "#FFB300",
    errorPressed: "#E53935",
    disabledPressed: "#BCA49D",
    dividerPressed: "#BBADA6",
  },
  dark: {
    primary: "#4A90E2", // A vibrant blue.
    secondary: "#50E3C2", // A complementary turquoise.
    background: "#0A0A0A", // Inversion of light mode "#F5F5F5"
    white: "#E5E5E5", // Soft off-white for text and highlights
    black: "#BBC1C4", // Inversion of "#443E3B"
    grey0: "#091013", // Inversion of "#F6EFEC" – very dark
    grey1: "#151D21", // Inversion of "#EAE2DE"
    grey2: "#16262F", // Inversion of "#E9D9D0"
    grey3: "#273942", // Inversion of "#D8C6BD"
    grey4: "#435B62", // Inversion of "#BCA49D"
    grey5: "#6F8990", // Inversion of "#90766F"
    greyOutline: "#445259", // Inversion of "#BBADA6"
    searchBg: "#0A0A0A",
    success: "#2A7A70",
    warning: "#FFC107",
    error: "#6B5CA6",
    disabled: "#BCA49D",
    divider: "#BBADA6",
    primaryPressed: "#3F7BD2", // Darker blue.
    secondaryPressed: "#45C0AF", // Darker turquoise.
    backgroundPressed: "#1A1A1A", // Slight lift from "#0A0A0A"
    blackPressed: "#C2C6C9", // (A lightening of black inversion)
    whitePressed: "#D1CCC7",
    grey0Pressed: "#16262F", // Inversion of light mode’s grey0Pressed "#E9D9D0"
    grey1Pressed: "#273942", // Inversion of "#D8C6BD"
    grey2Pressed: "#435B62", // Inversion of "#BCA49D"
    grey3Pressed: "#6F8990", // Inversion of "#90766F"
    grey4Pressed: "#6F8990",
    grey5Pressed: "#6F8990",
    greyOutlinePressed: "#445259", // Same as greyOutline inversion
    searchBgPressed: "#1A1A1A", // Slightly lighter than searchBg
    successPressed: "#246B65",
    warningPressed: "#FFB300",
    errorPressed: "#5C4C94",
    disabledPressed: "#BCA49D",
    dividerPressed: "#BBADA6",
  },
};

const myAnimations = createAnimations({
  fast: {
    type: "spring",
    damping: 20,
    mass: 1.2,
    stiffness: 250,
  },
  medium: {
    type: "spring",
    damping: 10,
    mass: 0.9,
    stiffness: 100,
  },
  slow: {
    type: "spring",
    damping: 20,
    stiffness: 60,
  },
});

export const tamaguiConfig = createTamagui({
  tokens: myTokens,
  media,
  animations: myAnimations,
  themes,
});

export default tamaguiConfig;

export type Conf = typeof tamaguiConfig;

declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}
