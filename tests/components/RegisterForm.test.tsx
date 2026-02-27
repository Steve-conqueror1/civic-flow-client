import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { RegisterForm } from "@/components/auth/signup";

describe("RegisterForm", () => {
  it("renders the form element", () => {
    render(<RegisterForm />);
    expect(screen.getByRole("form")).toBeDefined();
  });

  it("renders the Create your Account heading", () => {
    render(<RegisterForm />);
    expect(
      screen.getByRole("heading", { name: /create your account/i }),
    ).toBeDefined();
  });

  it("renders the Full Name field", () => {
    render(<RegisterForm />);
    expect(screen.getByLabelText(/full name/i)).toBeDefined();
  });

  it("renders the Phone Number field", () => {
    render(<RegisterForm />);
    expect(screen.getByLabelText(/phone number/i)).toBeDefined();
  });

  it("renders the Email Address field", () => {
    render(<RegisterForm />);
    expect(screen.getByLabelText(/email address/i)).toBeDefined();
  });

  it("renders the Residential Address field", () => {
    render(<RegisterForm />);
    expect(screen.getByLabelText(/residential address/i)).toBeDefined();
  });

  it("renders the Password field", () => {
    render(<RegisterForm />);
    expect(screen.getByLabelText(/^password/i)).toBeDefined();
  });

  it("renders the terms checkbox", () => {
    render(<RegisterForm />);
    expect(
      screen.getByRole("checkbox", { name: /terms of service/i }),
    ).toBeDefined();
  });

  it("renders the Create Account submit button", () => {
    render(<RegisterForm />);
    expect(
      screen.getByRole("button", { name: /create account/i }),
    ).toBeDefined();
  });

  it("renders the Secure SSL Encryption badge", () => {
    render(<RegisterForm />);
    expect(screen.getByText(/secure ssl encryption/i)).toBeDefined();
  });

  it("renders the toggle password visibility button", () => {
    render(<RegisterForm />);
    expect(
      screen.getByRole("button", { name: /show password/i }),
    ).toBeDefined();
  });
});
