import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Users } from "lucide-react";
import { UserStatCard } from "@/components/users/UserStatCard";

describe("UserStatCard", () => {
  const defaultProps = {
    icon: <Users aria-hidden="true" />,
    iconClassName: "bg-blue-50 text-primary",
    label: "Total Users",
    value: "12,842",
    badge: "+12%",
    badgeClassName: "bg-emerald-100 text-emerald-700",
  };

  it("renders the label", () => {
    render(<UserStatCard {...defaultProps} />);
    expect(screen.getByText("Total Users")).toBeDefined();
  });

  it("renders the value", () => {
    render(<UserStatCard {...defaultProps} />);
    expect(screen.getByText("12,842")).toBeDefined();
  });

  it("renders the badge", () => {
    render(<UserStatCard {...defaultProps} />);
    expect(screen.getByText("+12%")).toBeDefined();
  });

  it("renders a numeric value", () => {
    render(<UserStatCard {...defaultProps} value={842} />);
    expect(screen.getByText("842")).toBeDefined();
  });
});
