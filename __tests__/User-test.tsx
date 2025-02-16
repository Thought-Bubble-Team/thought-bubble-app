import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import UserTab from "@/app/(tabs)/user_tab";
import { supabase } from "@/utils/supabase/supabase";
import { useSessionStore } from "@/utils/stores/useSessionStore";

// Mock the supabase module
jest.mock("@/utils/supabase/supabase", () => ({
  supabase: {
    auth: {
      signOut: jest.fn(),
      onAuthStateChange: jest.fn(() => ({
        data: {
          subscription: {
            unsubscribe: jest.fn(),
          },
        },
      })),
      getSession: jest.fn(() => ({
        data: {
          session: {
            user: {
              id: "123",
              email: "johndoe@example.com",
            },
          },
        },
      })),
    },
  },
}));

// Mock the useSessionStore hook
jest.mock("@/utils/stores/useSessionStore", () => ({
  useSessionStore: jest.fn(),
}));

describe("User Component", () => {
  beforeEach(() => {
    (useSessionStore as unknown as jest.Mock).mockReturnValue({
      session: {
        user: {
          id: "123",
          email: "johndoe@example.com",
        },
      },
      setSession: jest.fn(),
    });
  });

  it("renders all elements correctly", () => {
    const { getByText } = render(<UserTab />);

    // Check if the profile elements are rendered
    expect(getByText("Edit Profile")).toBeTruthy();

    // Check if the settings elements are rendered
    expect(getByText("PERSONALIZE")).toBeTruthy();
    expect(getByText("Preferences")).toBeTruthy();
    expect(getByText("Appearance")).toBeTruthy();
    expect(getByText("ACCOUNT")).toBeTruthy();
  });

  it("calls signOut on SIGN OUT button press", () => {
    const { getByText } = render(<UserTab />);
    const signOutButton = getByText("SIGN OUT");

    // Simulate button press
    fireEvent.press(signOutButton);

    // Check if signOut was called
    expect(supabase.auth.signOut).toHaveBeenCalled();
  });
});
