import { render } from "@testing-library/react-native";

import Flower from "@/app/(tabs)/flower";

describe("<Flower />", () => {
  test("Text renders correctly on Flower", () => {
    const { getByText } = render(<Flower />);
    getByText("Welcome to Flower Page");
  });
});
