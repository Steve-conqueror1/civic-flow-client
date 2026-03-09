import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ContactMapCard from "@/components/Contact/ContactMapCard";

describe("ContactMapCard", () => {
  it("renders the map image", () => {
    render(<ContactMapCard />);
    expect(screen.getByRole("img", { name: /map/i })).toBeDefined();
  });

  it("renders the Open in Maps label", () => {
    render(<ContactMapCard />);
    expect(screen.getByText(/open in maps/i)).toBeDefined();
  });
});
