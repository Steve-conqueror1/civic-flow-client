import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { LoginForm } from "@/components/auth/login";
import { renderWithProviders } from "../utils/render-with-providers";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

// Default useAuth mock
const mockMutate = vi.fn();
const mockLoginMutation: {
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
    loginMutation: mockLoginMutation,
    registerMutation: {
      mutate: vi.fn(),
      isPending: false,
      isError: false,
      error: null,
    },
    logout: vi.fn(),
    user: null,
    isAuthenticated: false,
    role: null,
  }),
}));

describe("LoginForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLoginMutation.isPending = false;
    mockLoginMutation.isError = false;
    mockLoginMutation.error = null;
  });

  it("renders the form element", () => {
    renderWithProviders(<LoginForm />);
    expect(screen.getByRole("form")).toBeDefined();
  });

  it("renders the Sign In heading", () => {
    renderWithProviders(<LoginForm />);
    expect(screen.getByRole("heading", { name: /sign in/i })).toBeDefined();
  });

  it("renders the Email Address field", () => {
    renderWithProviders(<LoginForm />);
    expect(screen.getByLabelText(/email address/i)).toBeDefined();
  });

  it("renders the Password field", () => {
    renderWithProviders(<LoginForm />);
    expect(screen.getByLabelText(/^password/i)).toBeDefined();
  });

  it("renders the toggle password visibility button", () => {
    renderWithProviders(<LoginForm />);
    expect(
      screen.getByRole("button", { name: /show password/i }),
    ).toBeDefined();
  });

  it("renders the Sign In submit button", () => {
    renderWithProviders(<LoginForm />);
    expect(screen.getByRole("button", { name: /sign in/i })).toBeDefined();
  });

  it("renders the Forgot password link", () => {
    renderWithProviders(<LoginForm />);
    expect(
      screen.getByRole("link", { name: /forgot password/i }),
    ).toBeDefined();
  });

  it("renders the create account link", () => {
    renderWithProviders(<LoginForm />);
    expect(
      screen.getByRole("link", { name: /create an account/i }),
    ).toBeDefined();
  });

  it("renders the Secure SSL Encryption badge", () => {
    renderWithProviders(<LoginForm />);
    expect(screen.getByText(/secure ssl encryption/i)).toBeDefined();
  });

  it("shows validation errors when submitted with empty fields", async () => {
    renderWithProviders(<LoginForm />);
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));
    await waitFor(() => {
      expect(screen.getByText(/enter a valid email/i)).toBeDefined();
      expect(screen.getByText(/password is required/i)).toBeDefined();
    });
    expect(mockMutate).not.toHaveBeenCalled();
  });

  it("disables submit button when mutation is pending", () => {
    mockLoginMutation.isPending = true;
    renderWithProviders(<LoginForm />);
    const btn = screen.getByRole("button", {
      name: /sign in/i,
    }) as HTMLButtonElement;
    expect(btn.disabled).toBe(true);
  });

  it("renders API error message when isError is true", () => {
    mockLoginMutation.isError = true;
    mockLoginMutation.error = new Error("Invalid credentials");
    renderWithProviders(<LoginForm />);
    expect(screen.getByRole("alert")).toBeDefined();
    expect(screen.getByText(/invalid credentials/i)).toBeDefined();
  });
});
