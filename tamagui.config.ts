import { tokens, media, animations } from "@tamagui/config/v3";
import { createTamagui, createTokens } from "tamagui";

const { color, ...restTokens } = tokens;

const myTokens = createTokens({
  color: {
    white: "#ffffff",
    lightGrey: "#F6EFEC",
    grey: "#D8C6BD",
    darkGrey: "#7C7876",
    redOrange: "#CB806A",
    darkRedOrange: "#4F3F39",
    brown: "#9B8177",
    black: "#443E3B",

    red: "#C95F4A",
    darkRed: "#B34E3A",
    softRed: "#D87A64",

    orange: "#D28A5E",
    darkOrange: "#BF7448",
    softOrange: "#E19C72",

    yellow: "#D9B27C",
    darkYellow: "#C29C67",
    softYellow: "#E4C18E",

    green: "#8F9775",
    darkGreen: "#7A8363",
    softGreen: "#A5AD89",

    blue: "#6E7B8F",
    darkBlue: "#5B687B",
    softBlue: "#8793A5",

    purple: "#8A6D85",
    darkPurple: "#745770",
    softPurple: "#9F819A",

    pink: "#C78C8F",
    darkPink: "#B3797C",
    softPink: "#D39FA2",
  },
  ...restTokens,
});

const themes = {
  light: {
    primary: "#FF5733",
    secondary: "#33A1FF",
    background: "#F5F5F5",
    text: "#1a141f",
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
  },
  dark: {
    background: myTokens.color.darkRedOrange,
    subtleBackground: myTokens.color.darkRedOrange,
    coloredBackground: myTokens.color.brown,
    textColor: myTokens.color.white,
    subtleTextColor: myTokens.color.darkGrey,
  },
};

export const tamaguiConfig = createTamagui({
  tokens: myTokens,
  media,
  animations,
  themes,
});

export default tamaguiConfig;

export type Conf = typeof tamaguiConfig;

declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}
