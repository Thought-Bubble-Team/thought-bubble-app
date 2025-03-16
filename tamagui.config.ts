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
    primary: "#FF5733",
    secondary: "#33A1FF",
    background: "#443E3B",
    white: "#E9D9D0",
    black: "#000000",
    grey0: "#90766F",
    grey1: "#BCA49D",
    grey2: "#BBADA6",
    grey3: "#D8C6BD",
    grey4: "#E9D9D0",
    grey5: "#F6EFEC",
    greyOutline: "#90766F",
    searchBg: "#443E3B",
    success: "#4CAF50",
    warning: "#FFC107",
    error: "#F44336",
    disabled: "#BCA49D",
    divider: "#90766F",
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
