import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ServiceResolutionCard } from "@/components/services/ServiceResolutionCard";

describe("ServiceResolutionCard", () => {
  it("renders the resolution time", () => {
    render(
      <ServiceResolutionCard
        resolutionTime="2-3 Business Days"
        startHref="/services/pothole/new"
        serviceName="Pothole Repair"
      />
    );
    expect(screen.getByText("2-3 Business Days")).toBeInTheDocument();
  });

  it("renders the Average Resolution label", () => {
    render(
      <ServiceResolutionCard
        resolutionTime="2-3 Business Days"
        startHref="/services/pothole/new"
        serviceName="Pothole Repair"
      />
    );
    expect(screen.getByText("Average Resolution")).toBeInTheDocument();
  });

  it("renders the Start Request link with descriptive aria-label", () => {
    render(
      <ServiceResolutionCard
        resolutionTime="2-3 Business Days"
        startHref="/services/pothole/new"
        serviceName="Pothole Repair"
      />
    );
    const link = screen.getByRole("link", { name: /start pothole repair request/i });
    expect(link).toHaveAttribute("href", "/services/pothole/new");
  });

  it("renders optional note text when provided", () => {
    render(
      <ServiceResolutionCard
        resolutionTime="2-3 Business Days"
        note="Based on AI prediction from recent similar requests."
        startHref="/services/pothole/new"
        serviceName="Pothole Repair"
      />
    );
    expect(
      screen.getByText("Based on AI prediction from recent similar requests.")
    ).toBeInTheDocument();
  });
});
