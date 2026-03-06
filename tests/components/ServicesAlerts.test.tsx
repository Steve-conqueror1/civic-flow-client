import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ServicesAlerts from "@/components/ServicesAlerts";

describe("ServicesAlerts", () => {
  it("renders the Service Alerts heading", () => {
    render(<ServicesAlerts />);
    expect(screen.getByText(/service alerts/i)).toBeInTheDocument();
  });

  it("renders an alert item", () => {
    render(<ServicesAlerts />);
    expect(screen.getByText(/system maintenance/i)).toBeInTheDocument();
  });

  it("renders the alert detail text", () => {
    render(<ServicesAlerts />);
    expect(screen.getByText(/payments will be unavailable/i)).toBeInTheDocument();
  });
});
