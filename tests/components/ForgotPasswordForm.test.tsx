import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ForgotPasswordForm } from "@/components/auth/forgot-password";

describe("ForgotPasswordForm", () => {
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
});
