import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ServiceCategoriesSection from "@/components/ServiceCategoriesSection";

describe("ServiceCategoriesSection", () => {
  it("renders the section heading", () => {
    render(<ServiceCategoriesSection />);
    expect(
      screen.getByRole("heading", { level: 2, name: /service categories/i })
    ).toBeDefined();
  });

  it("renders the subtitle", () => {
    render(<ServiceCategoriesSection />);
    expect(screen.getByText(/browse services by department/i)).toBeDefined();
  });

  it("renders the View All Services link", () => {
    render(<ServiceCategoriesSection />);
    expect(
      screen.getByRole("link", { name: /view all services/i })
    ).toBeDefined();
  });

  it("renders all six category cards", () => {
    render(<ServiceCategoriesSection />);
    expect(screen.getByRole("link", { name: /roads & traffic/i })).toBeDefined();
    expect(screen.getByRole("link", { name: /permits/i })).toBeDefined();
    expect(screen.getByRole("link", { name: /parks & rec/i })).toBeDefined();
    expect(screen.getByRole("link", { name: /waste mgmt/i })).toBeDefined();
    expect(screen.getByRole("link", { name: /social services/i })).toBeDefined();
    expect(screen.getByRole("link", { name: /general help/i })).toBeDefined();
  });

  it("has an id for anchor navigation", () => {
    const { container } = render(<ServiceCategoriesSection />);
    expect(container.querySelector("#services")).toBeDefined();
  });

  it("renders as a section landmark", () => {
    render(<ServiceCategoriesSection />);
    expect(screen.getByRole("region")).toBeDefined();
  });
});
