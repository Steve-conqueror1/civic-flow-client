import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DocumentRequirements } from "@/components/requests";

describe("DocumentRequirements", () => {
  it("renders the Document Requirements heading", () => {
    render(<DocumentRequirements />);
    expect(screen.getByText(/document requirements/i)).toBeDefined();
  });

  it("renders the default requirements list", () => {
    render(<DocumentRequirements />);
    const items = screen.getAllByRole("listitem");
    expect(items.length).toBeGreaterThan(0);
  });

  it("renders custom requirements when provided", () => {
    const requirements = ["Must be in colour", "Must be signed"];
    render(<DocumentRequirements requirements={requirements} />);
    requirements.forEach((req) => {
      expect(screen.getByText(req)).toBeDefined();
    });
  });

  it("renders exactly the number of custom requirements provided", () => {
    const requirements = ["First rule", "Second rule"];
    render(<DocumentRequirements requirements={requirements} />);
    expect(screen.getAllByRole("listitem").length).toBe(2);
  });
});
