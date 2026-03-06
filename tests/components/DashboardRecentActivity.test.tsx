import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import DashboardRecentActivity from "@/components/DashboardRecentActivity";

describe("DashboardRecentActivity", () => {
  it("renders the section heading", () => {
    render(<DashboardRecentActivity />);
    expect(
      screen.getByRole("heading", { name: /recent activity/i })
    ).toBeDefined();
  });

  it("renders the View All link", () => {
    render(<DashboardRecentActivity />);
    expect(screen.getByRole("link", { name: /view all/i })).toBeDefined();
  });

  it("renders activity items", () => {
    render(<DashboardRecentActivity />);
    expect(screen.getByText(/pothole on main st/i)).toBeDefined();
    expect(screen.getByText(/broken park bench/i)).toBeDefined();
    expect(screen.getByText(/streetlight outage/i)).toBeDefined();
  });
});
