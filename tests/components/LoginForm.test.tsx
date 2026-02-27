import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { LoginForm } from "@/components/auth/login";

describe("LoginForm", () => {
  it("renders the form element", () => {
    render(<LoginForm />);
    expect(screen.getByRole("form")).toBeDefined();
  });

  it("renders the Sign In heading", () => {
    render(<LoginForm />);
    expect(
      screen.getByRole("heading", { name: /sign in/i }),
    ).toBeDefined();
  });

  it("renders the Email Address field", () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/email address/i)).toBeDefined();
  });

  it("renders the Password field", () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/^password/i)).toBeDefined();
  });

  it("renders the toggle password visibility button", () => {
    render(<LoginForm />);
    expect(
      screen.getByRole("button", { name: /show password/i }),
    ).toBeDefined();
  });

  it("renders the Sign In submit button", () => {
    render(<LoginForm />);
    expect(
      screen.getByRole("button", { name: /sign in/i }),
    ).toBeDefined();
  });

  it("renders the Forgot password link", () => {
    render(<LoginForm />);
    expect(screen.getByRole("link", { name: /forgot password/i })).toBeDefined();
  });

  it("renders the create account link", () => {
    render(<LoginForm />);
    expect(screen.getByRole("link", { name: /create an account/i })).toBeDefined();
  });

  it("renders the Secure SSL Encryption badge", () => {
    render(<LoginForm />);
    expect(screen.getByText(/secure ssl encryption/i)).toBeDefined();
  });
});
