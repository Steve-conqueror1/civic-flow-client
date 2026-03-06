import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import DashboardHeader from "@/components/dashboard";

describe("DashboardHeader", () => {
  it("renders a greeting with the user name", () => {
    render(<DashboardHeader name="Alex" />);
    expect(screen.getByText(/alex/i)).toBeDefined();
  });

  it("renders the overview subtitle", () => {
    render(<DashboardHeader name="Alex" />);
    expect(screen.getByText(/civic activities/i)).toBeDefined();
  });

  it("renders the Submit New Request link", () => {
    render(<DashboardHeader name="Alex" />);
    expect(
      screen.getByRole("link", { name: /submit new request/i }),
    ).toBeDefined();
  });

  it("renders with a different name", () => {
    render(<DashboardHeader name="Jordan" />);
    expect(screen.getByText(/jordan/i)).toBeDefined();
  });
});
