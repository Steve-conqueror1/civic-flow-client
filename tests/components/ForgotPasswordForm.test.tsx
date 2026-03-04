import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ForgotPasswordForm } from "@/components/auth/forgot-password";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

describe("ForgotPasswordForm", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders the Forgot Password heading", () => {
    render(<ForgotPasswordForm />);
    expect(
      screen.getByRole("heading", { name: /forgot password/i }),
    ).toBeDefined();
  });

  it("renders the Email Address field", () => {
    render(<ForgotPasswordForm />);
    expect(screen.getByLabelText(/email address/i)).toBeDefined();
  });

  it("renders the email hint text", () => {
    render(<ForgotPasswordForm />);
    expect(
      screen.getByText(/enter the email associated with your account/i),
    ).toBeDefined();
  });

  it("renders the Send Reset Link button", () => {
    render(<ForgotPasswordForm />);
    expect(
      screen.getByRole("button", { name: /send reset link/i }),
    ).toBeDefined();
  });

  it("renders the Back to login link", () => {
    render(<ForgotPasswordForm />);
    expect(
      screen.getByRole("link", { name: /back to login/i }),
    ).toBeDefined();
  });

  it("shows validation error on invalid email", async () => {
    render(<ForgotPasswordForm />);
    await userEvent.click(screen.getByRole("button", { name: /send reset link/i }));
    await waitFor(() => {
      expect(screen.getByText(/enter a valid email/i)).toBeDefined();
    });
  });

  it("shows success state after API call succeeds", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) }),
    );
    render(<ForgotPasswordForm />);
    await userEvent.type(
      screen.getByLabelText(/email address/i),
      "jane@example.com",
    );
    await userEvent.click(screen.getByRole("button", { name: /send reset link/i }));
    await waitFor(() => {
      expect(screen.getByText(/check your email/i)).toBeDefined();
      expect(screen.getByText(/jane@example.com/)).toBeDefined();
    });
  });

  it("shows error message when API call fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ message: "Too many requests" }),
      }),
    );
    render(<ForgotPasswordForm />);
    await userEvent.type(
      screen.getByLabelText(/email address/i),
      "jane@example.com",
    );
    await userEvent.click(screen.getByRole("button", { name: /send reset link/i }));
    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeDefined();
      expect(screen.getByText(/too many requests/i)).toBeDefined();
    });
  });
});
