import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AccessibilityComplianceTable } from "@/components/Accessibility/AccessibilityComplianceTable";

describe("AccessibilityComplianceTable", () => {
  it("renders the section heading", () => {
    render(<AccessibilityComplianceTable />);
    expect(
      screen.getByRole("heading", { name: /compliance status/i }),
    ).toBeDefined();
  });

  it("renders the table with correct column headers", () => {
    render(<AccessibilityComplianceTable />);
    expect(
      screen.getByRole("columnheader", { name: /platform section/i }),
    ).toBeDefined();
    expect(screen.getByRole("columnheader", { name: /status/i })).toBeDefined();
    expect(
      screen.getByRole("columnheader", { name: /wcag 2.1 level/i }),
    ).toBeDefined();
  });

  it("renders Main Dashboard row", () => {
    render(<AccessibilityComplianceTable />);
    expect(screen.getByText(/main dashboard/i)).toBeDefined();
  });

  it("renders Fully Compliant badge", () => {
    render(<AccessibilityComplianceTable />);
    const badges = screen.getAllByText(/fully compliant/i);
    expect(badges.length).toBeGreaterThan(0);
  });

  it("renders Partial badge", () => {
    render(<AccessibilityComplianceTable />);
    expect(screen.getByText(/partial/i)).toBeDefined();
  });
});
