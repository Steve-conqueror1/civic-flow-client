import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HowItWorksStep from "@/components/HowItWorksSection/HowItWorksStep";

describe("HowItWorksStep", () => {
  const defaultProps = {
    icon: <span data-testid="test-icon">icon</span>,
    title: "1. Submit Request",
    description: "Describe your issue in plain language.",
  };

  it("renders the title", () => {
    render(<HowItWorksStep {...defaultProps} />);
    expect(screen.getByText("1. Submit Request")).toBeDefined();
  });

  it("renders the description", () => {
    render(<HowItWorksStep {...defaultProps} />);
    expect(
      screen.getByText("Describe your issue in plain language.")
    ).toBeDefined();
  });

  it("renders the icon slot", () => {
    render(<HowItWorksStep {...defaultProps} />);
    expect(screen.getByTestId("test-icon")).toBeDefined();
  });

  it("renders different step content when given different props", () => {
    render(
      <HowItWorksStep
        icon={<span>icon</span>}
        title="2. AI Analysis"
        description="Our AI categorizes and routes your request."
      />
    );
    expect(screen.getByText("2. AI Analysis")).toBeDefined();
    expect(
      screen.getByText("Our AI categorizes and routes your request.")
    ).toBeDefined();
  });
});
