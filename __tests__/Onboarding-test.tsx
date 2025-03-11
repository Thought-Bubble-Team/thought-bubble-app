import React from "react";
import { render, screen } from "@testing-library/react-native";
import { TamaguiProvider, Theme } from "tamagui";
import config from "@/tamagui.config";
import Onboarding from "@/components/macro/Onboarding";

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <TamaguiProvider config={config}>
    <Theme name="light">{children}</Theme>
  </TamaguiProvider>
);

const customRender = (ui: React.ReactElement) => {
  return render(ui, { wrapper: TestWrapper });
};

describe("Onboarding Test", () => {
  it("should render Onboarding component", () => {
    customRender(<Onboarding />);

    expect(screen.getByTestId("onboarding-component-container")).toBeTruthy();
  });

  it("should render all text content on all pages", () => {
    customRender(<Onboarding />);

    // Page 1 text content
    expect(screen.getByText("Thought Bubble")).toBeTruthy();
    expect(
      screen.getByText(
        "Start journaling with AI-powered sentiment insights to better understand your thoughts and emotions."
      )
    ).toBeTruthy();

    // Page 2 text content
    expect(
      screen.getByText("Capture your thoughts. Understand your emotions.")
    ).toBeTruthy();
    expect(
      screen.getByText(
        "Our AI analyzes your journal entries in real time, giving you sentiment-based insights to help you track and improve your emotional well-being."
      )
    ).toBeTruthy();

    // Page 3 text content
    expect(screen.getByText("Safe. Secure. Private")).toBeTruthy();
    expect(
      screen.getByText(
        "Your thoughts are yours alone. We never share or store your personal data. Your journal is encrypted for complete privacy."
      )
    ).toBeTruthy();

    // Page 4 text content
    expect(
      screen.getByText("Start your journaling journey today!")
    ).toBeTruthy();
    expect(
      screen.getByText(
        "Take the first step in understanding your emotions and improving your mental well-being."
      )
    ).toBeTruthy();
    expect(screen.getByText("Get Started")).toBeTruthy();
  });
});
