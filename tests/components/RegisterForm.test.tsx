import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { RegisterForm } from "@/components/auth/signup";
import { renderWithProviders } from "../utils/render-with-providers";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

// Default useAuth mock
const mockMutate = vi.fn();
const mockRegisterMutation: {
  mutate: ReturnType<typeof vi.fn>;
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: Error | null;
} = {
  mutate: mockMutate,
  isPending: false,
  isError: false,
  isSuccess: false,
  error: null,
};

vi.mock("@/app/hooks/use-auth", () => ({
  useAuth: () => ({
    loginMutation: {
      mutate: vi.fn(),
      isPending: false,
      isError: false,
      error: null,
    },
    registerMutation: mockRegisterMutation,
    logout: vi.fn(),
    user: null,
    isAuthenticated: false,
    role: null,
  }),
}));

describe("RegisterForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockRegisterMutation.isPending = false;
    mockRegisterMutation.isError = false;
    mockRegisterMutation.error = null;
  });

  it("renders the form element", () => {
    renderWithProviders(<RegisterForm />);
    expect(screen.getByRole("form")).toBeDefined();
  });

  it("renders the Create your Account heading", () => {
    renderWithProviders(<RegisterForm />);
    expect(
      screen.getByRole("heading", { name: /create your account/i }),
    ).toBeDefined();
  });

  it("renders the First Name field", () => {
    renderWithProviders(<RegisterForm />);
    expect(screen.getByLabelText(/first name/i)).toBeDefined();
  });

  it("renders the Last Name field", () => {
    renderWithProviders(<RegisterForm />);
    expect(screen.getByLabelText(/last name/i)).toBeDefined();
  });

  it("renders the Phone Number field", () => {
    renderWithProviders(<RegisterForm />);
    expect(screen.getByLabelText(/phone number/i)).toBeDefined();
  });

  it("renders the Email Address field", () => {
    renderWithProviders(<RegisterForm />);
    expect(screen.getByLabelText(/email address/i)).toBeDefined();
  });

  it("renders the Residential Address field", () => {
    renderWithProviders(<RegisterForm />);
    expect(screen.getByLabelText(/residential address/i)).toBeDefined();
  });

  it("renders the Password field", () => {
    renderWithProviders(<RegisterForm />);
    expect(screen.getByLabelText(/^password/i)).toBeDefined();
  });

  it("renders the terms checkbox", () => {
    renderWithProviders(<RegisterForm />);
    expect(
      screen.getByRole("checkbox", { name: /terms of service/i }),
    ).toBeDefined();
  });

  it("renders the Create Account submit button", () => {
    renderWithProviders(<RegisterForm />);
    expect(
      screen.getByRole("button", { name: /create account/i }),
    ).toBeDefined();
  });

  it("renders the Secure SSL Encryption badge", () => {
    renderWithProviders(<RegisterForm />);
    expect(screen.getByText(/secure ssl encryption/i)).toBeDefined();
  });

  it("renders the toggle password visibility button", () => {
    renderWithProviders(<RegisterForm />);
    expect(
      screen.getByRole("button", { name: /show password/i }),
    ).toBeDefined();
  });

  it("shows validation errors on empty submit", async () => {
    renderWithProviders(<RegisterForm />);
    await userEvent.click(
      screen.getByRole("button", { name: /create account/i }),
    );
    await waitFor(() => {
      expect(screen.getByText(/first name is required/i)).toBeDefined();
    });
    expect(mockMutate).not.toHaveBeenCalled();
  });

  it("disables submit button when mutation is pending", () => {
    mockRegisterMutation.isPending = true;
    renderWithProviders(<RegisterForm />);
    const btn = screen.getByRole("button", {
      name: /create account/i,
    }) as HTMLButtonElement;
    expect(btn.disabled).toBe(true);
  });

  it("renders API error message when isError is true", () => {
    mockRegisterMutation.isError = true;
    mockRegisterMutation.error = new Error("Email already in use");
    renderWithProviders(<RegisterForm />);
    expect(screen.getByRole("alert")).toBeDefined();
    expect(screen.getByText(/email already in use/i)).toBeDefined();
  });
});
