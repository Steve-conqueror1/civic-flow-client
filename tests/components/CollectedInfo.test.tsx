import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CollectedInfo } from "@/components/ProvacyPolicy";

describe("CollectedInfo", () => {
  it("renders as a section landmark", () => {
    render(<CollectedInfo />);
    expect(screen.getByRole("region")).toBeDefined();
  });

  it("renders the section heading", () => {
    render(<CollectedInfo />);
    expect(
      screen.getByRole("heading", { name: /information we collect/i })
    ).toBeDefined();
  });

  it("renders Identifiers card", () => {
    render(<CollectedInfo />);
    expect(screen.getByText(/identifiers/i)).toBeDefined();
  });

  it("renders Location Data card", () => {
    render(<CollectedInfo />);
    expect(screen.getByText(/location data/i)).toBeDefined();
  });

  it("renders Request Details card", () => {
    render(<CollectedInfo />);
    expect(screen.getByText(/request details/i)).toBeDefined();
  });

  it("renders Technical Data card", () => {
    render(<CollectedInfo />);
    expect(screen.getByText(/technical data/i)).toBeDefined();
  });
});
