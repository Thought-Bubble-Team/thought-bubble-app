import { styled, XStack, Spinner } from "tamagui";

import Screen from "../atoms/Screen";

import LogoAnimation from "../Icons/LogoAnimation";

const LoadingScreen = ({ children }: { children: React.ReactNode }) => {
  return (
    <Screen>
      <XStackStyled>
        <LogoAnimation />
      </XStackStyled>
      <XStackStyled>
        <Spinner size="large" color="$grey3" />
      </XStackStyled>
      {children}
    </Screen>
  );
};

const XStackStyled = styled(XStack, {
  justifyContent: "center",
  alignItems: "center",
  gap: "$sm",
});

export default LoadingScreen;
