import { render } from "@testing-library/react-native";

import Flower from "@/app/(tabs)/gratitude";

describe("<Flower />", () => {
  test("Text renders correctly on Flower", () => {
    const { getByText } = render(<Flower />);
    getByText("Welcome to Flower Page");
  });
});
