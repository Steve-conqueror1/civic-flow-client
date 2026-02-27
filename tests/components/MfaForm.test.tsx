import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MfaForm } from "@/components/auth/mfa";

describe("MfaForm", () => {
  it("renders the Verify your identity heading", () => {
    render(<MfaForm />);
    expect(
      screen.getByRole("heading", { name: /verify your identity/i }),
    ).toBeDefined();
  });

  it("renders 6 digit inputs", () => {
    render(<MfaForm />);
    for (let i = 1; i <= 6; i++) {
      expect(screen.getByLabelText(`Digit ${i}`)).toBeDefined();
    }
  });

  it("renders the Verify Identity submit button", () => {
    render(<MfaForm />);
    expect(
      screen.getByRole("button", { name: /verify identity/i }),
    ).toBeDefined();
  });

  it("renders the Resend Code button", () => {
    render(<MfaForm />);
    expect(
      screen.getByRole("button", { name: /resend code/i }),
    ).toBeDefined();
  });

  it("renders the try another method link", () => {
    render(<MfaForm />);
    expect(
      screen.getByRole("link", { name: /try another authentication method/i }),
    ).toBeDefined();
  });

  it("renders the countdown timer", () => {
    render(<MfaForm />);
    expect(screen.getByText(/code expires in/i)).toBeDefined();
  });

  it("renders the progress bar", () => {
    render(<MfaForm />);
    expect(screen.getByRole("progressbar")).toBeDefined();
  });
});
