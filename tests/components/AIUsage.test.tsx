import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AIUsage } from "@/components/ProvacyPolicy";

describe("AIUsage", () => {
  it("renders as a section landmark", () => {
    render(<AIUsage />);
    expect(screen.getByRole("region")).toBeDefined();
  });

  it("renders the AI usage heading", () => {
    render(<AIUsage />);
    expect(screen.getByRole("heading", { name: /how we use ai/i })).toBeDefined();
  });

  it("renders categorization item", () => {
    render(<AIUsage />);
    expect(screen.getByText(/categorization/i)).toBeDefined();
  });

  it("renders deduplication item", () => {
    render(<AIUsage />);
    expect(screen.getByText(/deduplication/i)).toBeDefined();
  });

  it("renders no automated decisions item", () => {
    render(<AIUsage />);
    expect(screen.getByText(/no automated decisions/i)).toBeDefined();
  });
});
