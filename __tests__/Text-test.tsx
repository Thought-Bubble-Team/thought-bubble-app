import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react-native";
import { TamaguiProvider, Theme } from "tamagui";
import config from "@/tamagui.config";
import Text from "@/components/Micro/Text";

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <TamaguiProvider config={config}>
    <Theme name="light">{children}</Theme>
  </TamaguiProvider>
);

const customRender = (ui: React.ReactElement) => {
  return render(ui, { wrapper: TestWrapper });
};

describe("Text Component", () => {
  test("renders correctly", () => {
    customRender(<Text>Test Text</Text>);

    const textElement = screen.getByText("Test Text");
    expect(textElement).toBeTruthy();
  });
});
