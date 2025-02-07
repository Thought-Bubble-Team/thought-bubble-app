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
  },
  ...restTokens,
});

const themes = {
  light: {
    background: myTokens.color.white,
    subtleBackground: myTokens.color.lightGrey,
    coloredBackground: myTokens.color.grey,
    textColor: myTokens.color.black,
    subtleTextColor: myTokens.color.darkGrey,
    textColorAlt: myTokens.color.white,
    accent: myTokens.color.redOrange,
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
  tokens,
  media,
  animations,
  themes,
});

export default tamaguiConfig;

export type Conf = typeof tamaguiConfig;

declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}
