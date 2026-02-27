import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ResetPasswordForm } from "@/components/auth/reset-password";

describe("ResetPasswordForm", () => {
  it("renders the Set New Password heading", () => {
    render(<ResetPasswordForm />);
    expect(
      screen.getByRole("heading", { name: /set new password/i }),
    ).toBeDefined();
  });

  it("renders the New Password field", () => {
    render(<ResetPasswordForm />);
    expect(screen.getByLabelText(/^new password/i)).toBeDefined();
  });

  it("renders the Confirm New Password field", () => {
    render(<ResetPasswordForm />);
    expect(screen.getByLabelText(/confirm new password/i)).toBeDefined();
  });

  it("renders show/hide toggles for both password fields", () => {
    render(<ResetPasswordForm />);
    const toggles = screen.getAllByRole("button", { name: /show password/i });
    expect(toggles.length).toBe(2);
  });

  it("renders the Password Requirements section", () => {
    render(<ResetPasswordForm />);
    expect(screen.getByText(/password requirements/i)).toBeDefined();
  });

  it("renders all three requirement items", () => {
    render(<ResetPasswordForm />);
    expect(screen.getByText(/minimum 8 characters/i)).toBeDefined();
    expect(screen.getByText(/at least one number/i)).toBeDefined();
    expect(screen.getByText(/includes a special character/i)).toBeDefined();
  });

  it("renders the Reset Password button", () => {
    render(<ResetPasswordForm />);
    expect(
      screen.getByRole("button", { name: /reset password/i }),
    ).toBeDefined();
  });

  it("renders the Back to login link", () => {
    render(<ResetPasswordForm />);
    expect(
      screen.getByRole("link", { name: /back to login/i }),
    ).toBeDefined();
  });
});
