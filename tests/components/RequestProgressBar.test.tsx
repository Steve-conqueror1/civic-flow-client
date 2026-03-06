import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import RequestProgressBar from "@/components/RequestProgressBar";

const DEFAULT_STEPS = ["Description", "Location", "Upload", "Review"];

describe("RequestProgressBar", () => {
  it("renders all step labels", () => {
    render(<RequestProgressBar steps={DEFAULT_STEPS} currentStep={1} />);
    DEFAULT_STEPS.forEach((step) => {
      expect(screen.getByText(step)).toBeDefined();
    });
  });

  it("highlights the current step", () => {
    render(<RequestProgressBar steps={DEFAULT_STEPS} currentStep={2} />);
    const activeStep = screen.getByText("Location");
    expect(activeStep.className).toMatch(/text-primary/);
  });

  it("renders the progress bar", () => {
    render(<RequestProgressBar steps={DEFAULT_STEPS} currentStep={1} />);
    expect(screen.getByRole("progressbar")).toBeDefined();
  });

  it("sets correct progress width for step 1 of 4", () => {
    render(<RequestProgressBar steps={DEFAULT_STEPS} currentStep={1} />);
    const bar = screen.getByTestId("progress-fill");
    expect(bar.style.width).toBe("25%");
  });

  it("sets correct progress width for step 3 of 4", () => {
    render(<RequestProgressBar steps={DEFAULT_STEPS} currentStep={3} />);
    const bar = screen.getByTestId("progress-fill");
    expect(bar.style.width).toBe("75%");
  });
});
