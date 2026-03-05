import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PolicyHeading } from "@/components/ProvacyPolicy";

describe("PolicyHeading", () => {
  it("renders successfully", () => {
    render(<PolicyHeading number="01" title="Introduction" />);
    expect(screen.getByRole("heading", { level: 2 })).toBeDefined();
  });

  it("renders the section number", () => {
    render(<PolicyHeading number="01" title="Introduction" />);
    expect(screen.getByText("01")).toBeDefined();
  });

  it("renders the section title", () => {
    render(<PolicyHeading number="01" title="Introduction" />);
    expect(screen.getByText("Introduction")).toBeDefined();
  });

  it("renders different number and title props", () => {
    render(<PolicyHeading number="05" title="Citizen Rights" />);
    expect(screen.getByText("05")).toBeDefined();
    expect(screen.getByText("Citizen Rights")).toBeDefined();
  });
});
