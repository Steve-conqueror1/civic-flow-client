import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ServicesHero } from "@/components/services";

describe("ServicesHero", () => {
  it("renders the Services Directory heading", () => {
    render(<ServicesHero />);
    expect(
      screen.getByRole("heading", { level: 1, name: /services directory/i })
    ).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    render(<ServicesHero />);
    expect(
      screen.getByText(/instant access to provincial services/i)
    ).toBeInTheDocument();
  });

  it("renders the official portal badge", () => {
    render(<ServicesHero />);
    expect(
      screen.getByText(/official alberta services portal/i)
    ).toBeInTheDocument();
  });

  it("renders the Advanced AI Search label", () => {
    render(<ServicesHero />);
    expect(screen.getByText(/advanced ai search/i)).toBeInTheDocument();
  });

  it("renders the Sign In button", () => {
    render(<ServicesHero />);
    expect(
      screen.getByRole("link", { name: /sign in/i })
    ).toBeInTheDocument();
  });

  it("renders the hero background image", () => {
    render(<ServicesHero />);
    expect(screen.getByRole("img", { name: /alberta/i })).toBeInTheDocument();
  });
});
