import { TamaguiProvider, Theme } from "tamagui";
import config from "@/tamagui.config";
import {
  act,
  cleanup,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import Journals from "@/app/(tabs)/journals";

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <TamaguiProvider config={config}>
    <Theme name="light">{children}</Theme>
  </TamaguiProvider>
);

const customRender = (ui: React.ReactElement) => {
  return render(ui, { wrapper: TestWrapper });
};

jest.mock("@/utils/supabase/supabase", () => ({
  supabase: {
    auth: {
      getSession: jest.fn().mockResolvedValue({ data: { session: {} } }),
      onAuthStateChange: jest.fn((callback) => {
        return { data: { subscription: { unsubscribe: jest.fn() } } };
      }),
    },
  },
}));

jest.mock("@/utils/supabase/db-crud", () => ({
  getAllJournalEntries: jest.fn(),
}));

jest.mock("@/utils/stores/useSessionStore", () => ({
  useSessionStore: jest.fn((selector) => {
    if (selector.name === "state=>state.session") return {};
    if (selector.name === "state=>state.setSession") return jest.fn();
    return jest.fn();
  }),
}));

describe("Journals Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state initially", async () => {
    const { getAllJournalEntries } = require("@/utils/supabase/db-crud");

    let resolveGetAll: (value: any) => void;
    const pendingPromise = new Promise((resolve) => {
      resolveGetAll = resolve;
    });

    getAllJournalEntries.mockResolvedValue(pendingPromise);

    customRender(<Journals />);

    expect(screen.getByTestId("loading-spinner")).toBeTruthy();

    await act(async () => {
      resolveGetAll({ data: [] });
    });

    await waitFor(() => {
      expect(getAllJournalEntries).toHaveBeenCalledTimes(2);
      expect(screen.queryByTestId("loading-spinner")).toBeNull();
      expect(
        screen.queryByText("Looks like you haven't made any entries yet!")
      ).toBeTruthy();
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
    cleanup();
  });
});
