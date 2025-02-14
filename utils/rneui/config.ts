import { createTheme } from "@rneui/themed";
export const theme = createTheme({
  lightColors: {
    primary: "#CB806A",
    secondary: "#9B8177",
    background: "#F5F5F5",
    white: "#FFFFFF",
    black: "#443E3B",
    grey0: "#F6EFEC",
    grey1: "#EAE2DE",
    grey2: "#E9D9D0",
    grey3: "#D8C6BD",
    grey4: "#BCA49D",
    grey5: "#90766F",
    greyOutline: "#BBADA6",
    searchBg: "#E9DED9",
    success: "#FAB9B9",
    warning: "#FFC107",
    error: "#B34E3A",
    disabled: "#BCA49D",
    divider: "#EAE2DE",
  },
  spacing: {
    xs: 2,
    sm: 12,
    md: 18,
    lg: 24,
    xl: 46,
    xxl: 52,
    xxxl: 64,
  },
  components: {
    Button: {
      raised: true,
    },
  },
});
