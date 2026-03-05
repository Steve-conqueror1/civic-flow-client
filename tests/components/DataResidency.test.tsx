import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DataResidency } from "@/components/ProvacyPolicy";

describe("DataResidency", () => {
  it("renders successfully", () => {
    render(<DataResidency />);
    expect(screen.getByRole("region")).toBeDefined();
  });

  it("renders the Alberta data residency item", () => {
    render(<DataResidency />);
    expect(screen.getAllByText(/alberta/i).length).toBeGreaterThan(0);
  });

  it("renders the encryption item", () => {
    render(<DataResidency />);
    expect(screen.getAllByText(/encrypt/i).length).toBeGreaterThan(0);
  });

  it("renders the retention item", () => {
    render(<DataResidency />);
    expect(screen.getAllByText(/retention/i).length).toBeGreaterThan(0);
  });

  it("renders the breach notification item", () => {
    render(<DataResidency />);
    expect(screen.getAllByText(/breach/i).length).toBeGreaterThan(0);
  });
});
