import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ProcessStepCard from "@/components/ProcessStepCard";

describe("ProcessStepCard", () => {
  const defaultProps = {
    stepNumber: 1,
    icon: <span data-testid="test-icon">icon</span>,
    title: "Submit Request",
    description: "Citizens easily submit service requests.",
  };

  it("renders the step number badge", () => {
    render(<ProcessStepCard {...defaultProps} />);
    expect(screen.getByText("1")).toBeDefined();
  });

  it("renders the icon", () => {
    render(<ProcessStepCard {...defaultProps} />);
    expect(screen.getByTestId("test-icon")).toBeDefined();
  });

  it("renders the title", () => {
    render(<ProcessStepCard {...defaultProps} />);
    expect(screen.getByRole("heading", { name: /submit request/i })).toBeDefined();
  });

  it("renders the description", () => {
    render(<ProcessStepCard {...defaultProps} />);
    expect(screen.getByText(/citizens easily submit service requests/i)).toBeDefined();
  });

  it("renders different step numbers", () => {
    render(<ProcessStepCard {...defaultProps} stepNumber={4} />);
    expect(screen.getByText("4")).toBeDefined();
  });
});
