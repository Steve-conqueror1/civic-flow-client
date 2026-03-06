import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import LocationTipsCard from "@/components/requests/LocationTipsCard";

describe("LocationTipsCard", () => {
  it("renders the Location Tips heading", () => {
    render(<LocationTipsCard />);
    expect(screen.getByText(/location tips/i)).toBeDefined();
  });

  it("renders default tips", () => {
    render(<LocationTipsCard />);
    const items = screen.getAllByRole("listitem");
    expect(items.length).toBeGreaterThan(0);
  });

  it("renders custom tips when provided", () => {
    const tips = ["Tip one", "Tip two", "Tip three"];
    render(<LocationTipsCard tips={tips} />);
    tips.forEach((tip) => {
      expect(screen.getByText(tip)).toBeDefined();
    });
  });

  it("renders exactly the number of custom tips provided", () => {
    const tips = ["First tip", "Second tip"];
    render(<LocationTipsCard tips={tips} />);
    expect(screen.getAllByRole("listitem").length).toBe(2);
  });
});
