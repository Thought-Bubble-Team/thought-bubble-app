import React from "react";
import { render, screen } from "@testing-library/react-native";
import { TamaguiProvider, Theme } from "tamagui";
import config from "@/tamagui.config";
import Header from "@/components/atoms/Header";
import Text from "@/components/atoms/Text";

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <TamaguiProvider config={config}>
    <Theme name="light">{children}</Theme>
  </TamaguiProvider>
);

const customRender = (ui: React.ReactElement) => {
  return render(ui, { wrapper: TestWrapper });
};

describe("Header Component", () => {
  test("renders correctly", () => {
    customRender(
      <Header>
        <Text>Test Header</Text>
      </Header>
    );

    const textElement = screen.getByText("Test Header");
    expect(textElement).toBeTruthy();
  });
});
