import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ServiceListCTA } from "@/components/services/ServiceListCTA";

describe("ServiceListCTA", () => {
  it("renders the heading", () => {
    render(<ServiceListCTA />);
    expect(
      screen.getByRole("heading", {
        name: /Can't find what you're looking for/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders as a named region landmark", () => {
    render(<ServiceListCTA />);
    expect(
      screen.getByRole("region", {
        name: /Can't find what you're looking for/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders the supporting description text", () => {
    render(<ServiceListCTA />);
    expect(
      screen.getByText(/Our service directory is always growing/i),
    ).toBeInTheDocument();
  });

  it("renders a Start General Request link", () => {
    render(<ServiceListCTA />);
    const link = screen.getByRole("link", { name: /Start General Request/i });
    expect(link).toBeInTheDocument();
  });

  it("renders a Contact Support link", () => {
    render(<ServiceListCTA />);
    const link = screen.getByRole("link", { name: /Contact Support/i });
    expect(link).toBeInTheDocument();
  });
});
