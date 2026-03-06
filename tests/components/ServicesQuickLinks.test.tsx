import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ServicesQuickLinks from "@/components/ServicesQuickLinks";

describe("ServicesQuickLinks", () => {
  it("renders the Quick Links heading", () => {
    render(<ServicesQuickLinks />);
    expect(screen.getByText(/quick links/i)).toBeInTheDocument();
  });

  it("renders My Account link", () => {
    render(<ServicesQuickLinks />);
    expect(screen.getByRole("link", { name: /my account/i })).toBeInTheDocument();
  });

  it("renders Application Status link", () => {
    render(<ServicesQuickLinks />);
    expect(screen.getByRole("link", { name: /application status/i })).toBeInTheDocument();
  });

  it("renders Service Locations link", () => {
    render(<ServicesQuickLinks />);
    expect(screen.getByRole("link", { name: /service locations/i })).toBeInTheDocument();
  });

  it("renders Make a Payment link", () => {
    render(<ServicesQuickLinks />);
    expect(screen.getByRole("link", { name: /make a payment/i })).toBeInTheDocument();
  });
});
