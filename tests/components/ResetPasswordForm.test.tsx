import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ResetPasswordForm } from "@/components/auth/reset-password";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

describe("ResetPasswordForm", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders the Set New Password heading", () => {
    render(<ResetPasswordForm token="abc123" />);
    expect(
      screen.getByRole("heading", { name: /set new password/i }),
    ).toBeDefined();
  });

  it("renders the New Password field", () => {
    render(<ResetPasswordForm token="abc123" />);
    expect(screen.getByLabelText(/^new password/i)).toBeDefined();
  });

  it("renders the Confirm New Password field", () => {
    render(<ResetPasswordForm token="abc123" />);
    expect(screen.getByLabelText(/confirm new password/i)).toBeDefined();
  });

  it("renders show/hide toggles for both password fields", () => {
    render(<ResetPasswordForm token="abc123" />);
    const toggles = screen.getAllByRole("button", { name: /show password/i });
    expect(toggles.length).toBe(2);
  });

  it("renders the Password Requirements section", () => {
    render(<ResetPasswordForm token="abc123" />);
    expect(screen.getByText(/password requirements/i)).toBeDefined();
  });

  it("renders all three requirement items", () => {
    render(<ResetPasswordForm token="abc123" />);
    expect(screen.getByText(/minimum 8 characters/i)).toBeDefined();
    expect(screen.getByText(/at least one number/i)).toBeDefined();
    expect(screen.getByText(/includes a special character/i)).toBeDefined();
  });

  it("renders the Reset Password button", () => {
    render(<ResetPasswordForm token="abc123" />);
    expect(
      screen.getByRole("button", { name: /reset password/i }),
    ).toBeDefined();
  });

  it("renders the Back to login link", () => {
    render(<ResetPasswordForm token="abc123" />);
    expect(
      screen.getByRole("link", { name: /back to login/i }),
    ).toBeDefined();
  });

  it("shows invalid token alert when token is null", () => {
    render(<ResetPasswordForm token={null} />);
    expect(screen.getByRole("alert")).toBeDefined();
    expect(screen.getByText(/invalid or expired reset link/i)).toBeDefined();
  });

  it("shows validation errors on empty submit", async () => {
    render(<ResetPasswordForm token="abc123" />);
    await userEvent.click(screen.getByRole("button", { name: /reset password/i }));
    await waitFor(() => {
      expect(screen.getByText(/password must be at least 8 characters/i)).toBeDefined();
    });
  });

  it("shows passwords do not match error", async () => {
    render(<ResetPasswordForm token="abc123" />);
    await userEvent.type(screen.getByLabelText(/^new password/i), "Password1!");
    await userEvent.type(
      screen.getByLabelText(/confirm new password/i),
      "Different1!",
    );
    await userEvent.click(screen.getByRole("button", { name: /reset password/i }));
    await waitFor(() => {
      expect(screen.getByText(/passwords do not match/i)).toBeDefined();
    });
  });

  it("shows success state after API call succeeds", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) }),
    );
    render(<ResetPasswordForm token="abc123" />);
    await userEvent.type(screen.getByLabelText(/^new password/i), "Password1!");
    await userEvent.type(
      screen.getByLabelText(/confirm new password/i),
      "Password1!",
    );
    await userEvent.click(screen.getByRole("button", { name: /reset password/i }));
    await waitFor(() => {
      expect(screen.getByText(/password reset successfully/i)).toBeDefined();
    });
    expect(screen.getByRole("link", { name: /sign in/i })).toBeDefined();
  });

  it("shows error message when API call fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ message: "Token has expired" }),
      }),
    );
    render(<ResetPasswordForm token="abc123" />);
    await userEvent.type(screen.getByLabelText(/^new password/i), "Password1!");
    await userEvent.type(
      screen.getByLabelText(/confirm new password/i),
      "Password1!",
    );
    await userEvent.click(screen.getByRole("button", { name: /reset password/i }));
    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeDefined();
      expect(screen.getByText(/token has expired/i)).toBeDefined();
    });
  });
});
