import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CitizenRights } from "@/components/ProvacyPolicy";

describe("CitizenRights", () => {
  it("renders successfully", () => {
    render(<CitizenRights />);
    expect(screen.getByRole("region")).toBeDefined();
  });

  it("renders the FOIP description", () => {
    render(<CitizenRights />);
    expect(screen.getByText(/foip/i)).toBeDefined();
  });

  it("renders the 'Request Access to My Data' action", () => {
    render(<CitizenRights />);
    expect(screen.getByText(/request access to my data/i)).toBeDefined();
  });

  it("renders the 'Correct My Information' action", () => {
    render(<CitizenRights />);
    expect(screen.getByText(/correct my information/i)).toBeDefined();
  });

  it("renders two action links", () => {
    render(<CitizenRights />);
    const links = screen.getAllByRole("link");
    expect(links.length).toBe(2);
  });
});
