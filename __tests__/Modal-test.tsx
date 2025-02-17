import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Text } from "react-native";
import Modal from "../components/Micro/Modal";
import { TamaguiProvider, Theme } from "tamagui";
import config from "../tamagui.config";

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <TamaguiProvider config={config}>
    <Theme name="light">{children}</Theme>
  </TamaguiProvider>
);

const customRender = (ui: React.ReactElement) => {
  return render(ui, { wrapper: TestWrapper });
};

describe("Modal Component", () => {
  it("renders correctly when visible", () => {
    const { getByText } = customRender(
      <Modal modalVisible={true} setModalVisible={() => {}}>
        <Text>Test Modal Content</Text>
      </Modal>
    );

    expect(getByText("Test Modal Content")).toBeTruthy();
  });

  it("does not render when not visible", () => {
    const { queryByText } = customRender(
      <Modal modalVisible={false} setModalVisible={() => {}}>
        <Text>Test Modal Content</Text>
      </Modal>
    );

    expect(queryByText("Test Modal Content")).toBeNull();
  });

  it("calls setModalVisible when closed", () => {
    const setModalVisible = jest.fn();
    const { getByTestId } = customRender(
      <Modal modalVisible={true} setModalVisible={setModalVisible}>
        <Text>Test Modal Content</Text>
      </Modal>
    );

    // Since Modal uses onRequestClose, we need to trigger it manually
    fireEvent(getByTestId("modal"), "onRequestClose");
    expect(setModalVisible).toHaveBeenCalledWith(false);
  });
});
