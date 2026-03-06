import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ServicesHero from "@/components/ServicesHero";

describe("ServicesHero", () => {
  it("renders the Services Directory heading", () => {
    render(<ServicesHero />);
    expect(
      screen.getByRole("heading", { level: 1, name: /services directory/i })
    ).toBeInTheDocument();
  });

  it("renders the tagline", () => {
    render(<ServicesHero />);
    expect(screen.getByText(/fast, simple, secure/i)).toBeInTheDocument();
  });

  it("renders the search input", () => {
    render(<ServicesHero />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders the Search button", () => {
    render(<ServicesHero />);
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });
});
