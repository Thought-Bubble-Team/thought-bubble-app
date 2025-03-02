import React from "react";
import { render, screen } from "@testing-library/react-native";
import { TamaguiProvider, Theme } from "tamagui";
import config from "@/tamagui.config";
import MoodCalendar from "@/components/Macro/MoodCalendar/MoodCalendar";
import { parseInitialDate } from "@/utils/dateFormat";
import { provideSampleSentimentData } from "@/utils/sampleSentimentData";

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <TamaguiProvider config={config}>
    <Theme name="light">{children}</Theme>
  </TamaguiProvider>
);

const customRender = (ui: React.ReactElement) => {
  return render(ui, { wrapper: TestWrapper });
};

jest.mock("@/utils/sampleSentimentData", () => [
  {
    created_at: "2023-05-01T00:00:00Z",
    emotion: "joy",
  },
  {
    created_at: "2023-05-02T00:00:00Z",
    emotion: "joy",
  },
  {
    created_at: "2023-05-03T00:00:00Z",
    emotion: "neutral",
  },
  {
    created_at: "2023-05-04T00:00:00Z",
    emotion: "anger",
  },
  {
    created_at: "2023-05-05T00:00:00Z",
    emotion: "sadness",
  },
  {
    created_at: "2023-05-06T00:00:00Z",
    emotion: "sadness",
  },
]);

jest.mock("@/utils/sampleSentimentData", () => ({
  provideSampleSentimentData: jest.fn(),
}));

describe("MoodCalendar Component", () => {
  test("renders correctly", () => {
    customRender(<MoodCalendar initialDate="May 2023" />);
    const {
      provideSampleSentimentData,
    } = require("@/utils/sampleSentimentData");
    provideSampleSentimentData.mockReturnValue([
      {
        created_at: "2025-02-01T00:00:00Z",
        emotion: "joy",
      },
      {
        created_at: "2025-02-02T00:00:00Z",
        emotion: "joy",
      },
      {
        created_at: "2025-02-03T00:00:00Z",
        emotion: "neutral",
      },
      {
        created_at: "2025-02-04T00:00:00Z",
        emotion: "anger",
      },
      {
        created_at: "2025-02-05T00:00:00Z",
        emotion: "sadness",
      },
      {
        created_at: "2025-02-06T00:00:00Z",
        emotion: "sadness",
      },
    ]);

    const dayContainer = screen.getAllByTestId("day-container");
    const emotionSlot = screen.getAllByTestId("emotion-slot");
    const emptySlot = screen.getAllByTestId("empty-slot");
    const blankSlot = screen.getAllByTestId("blank-slot");

    expect(dayContainer).toBeDefined();
    expect(emotionSlot).toBeDefined();
    expect(blankSlot).toBeDefined();
    expect(emptySlot).toBeDefined();
  });
  test("returns the correct date", () => {
    const testDate = "Feb 2023";
    const result = parseInitialDate(testDate);

    expect(result).toBeDefined();
    expect(result).toEqual(new Date("2023-02-01"));
  });
});
