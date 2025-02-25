import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { TamaguiProvider, Theme } from "tamagui";
import config from "@/tamagui.config";
import { Button } from "@/components/Micro/Button";
// @ts-ignore
import ChartLight from "@/assets/icons/chartLight.svg";

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <TamaguiProvider config={config}>
    <Theme name="light">{children}</Theme>
  </TamaguiProvider>
);

const customRender = (ui: React.ReactElement) => {
  return render(ui, { wrapper: TestWrapper });
};

describe("Text Component", () => {
  test("renders self and children correctly", () => {
    customRender(
      <Button type="normal">
        <Button.Icon>
          <ChartLight width={24} height={24} />
        </Button.Icon>
        <Button.Text>Text Working</Button.Text>
        <Button.Spinner />
      </Button>,
    );

    const textElement = screen.getByText("Text Working");
    expect(textElement).toBeTruthy();
  });
});
