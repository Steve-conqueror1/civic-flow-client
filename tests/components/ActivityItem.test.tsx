import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ActivityItem from "@/components/ActivityItem";

describe("ActivityItem", () => {
  const defaultProps = {
    icon: <span data-testid="activity-icon">icon</span>,
    title: "Pothole on Main St",
    department: "Public Works",
    timeLabel: "Submitted 2 days ago",
    status: "In Progress",
    statusVariant: "active" as const,
  };

  it("renders the title", () => {
    render(<ActivityItem {...defaultProps} />);
    expect(screen.getByText("Pothole on Main St")).toBeDefined();
  });

  it("renders the department", () => {
    render(<ActivityItem {...defaultProps} />);
    expect(screen.getByText("Public Works")).toBeDefined();
  });

  it("renders the time label", () => {
    render(<ActivityItem {...defaultProps} />);
    expect(screen.getByText("Submitted 2 days ago")).toBeDefined();
  });

  it("renders the status badge", () => {
    render(<ActivityItem {...defaultProps} />);
    expect(screen.getByText("In Progress")).toBeDefined();
  });

  it("renders the icon", () => {
    render(<ActivityItem {...defaultProps} />);
    expect(screen.getByTestId("activity-icon")).toBeDefined();
  });
});
