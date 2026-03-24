import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { UsersTable } from "@/components/users/UsersTable";
import type { UserProfile } from "@/app/types/user";

const mockUsers: UserProfile[] = [
  {
    id: "1",
    firstName: "Marcus",
    lastName: "Chen",
    email: "marcus.chen@civicflow.gov",
    phoneNumber: "",
    address: "",
    role: "admin",
    mfaEnabled: false,
    status: "active",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    firstName: "Sarah",
    lastName: "Jenkins",
    email: "s.jenkins@civicflow.gov",
    phoneNumber: "",
    address: "",
    role: "citizen",
    mfaEnabled: false,
    status: "inactive",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
];

describe("UsersTable", () => {
  it("renders the table column headers", () => {
    render(<UsersTable users={mockUsers} />);
    expect(screen.getByText("User Profile")).toBeDefined();
    expect(screen.getByText("Role")).toBeDefined();
    expect(screen.getByText("Status")).toBeDefined();
    expect(screen.getByText("Last Activity")).toBeDefined();
  });

  it("renders user names from data", () => {
    render(<UsersTable users={mockUsers} />);
    expect(screen.getByText("Marcus Chen")).toBeDefined();
    expect(screen.getByText("Sarah Jenkins")).toBeDefined();
  });

  it("renders user emails from data", () => {
    render(<UsersTable users={mockUsers} />);
    expect(screen.getByText("marcus.chen@civicflow.gov")).toBeDefined();
  });

  it("renders role badges", () => {
    render(<UsersTable users={mockUsers} />);
    expect(screen.getByText("admin")).toBeDefined();
    expect(screen.getByText("citizen")).toBeDefined();
  });

  it("renders the role filter dropdown", () => {
    render(<UsersTable users={mockUsers} />);
    expect(screen.getByLabelText(/filter by role/i)).toBeDefined();
  });

  it("renders the status filter dropdown", () => {
    render(<UsersTable users={mockUsers} />);
    expect(screen.getByLabelText(/filter by status/i)).toBeDefined();
  });

  it("filters users by role", async () => {
    render(<UsersTable users={mockUsers} />);
    const roleFilter = screen.getByLabelText(/filter by role/i);
    await userEvent.selectOptions(roleFilter, "admin");
    expect(screen.getByText("Marcus Chen")).toBeDefined();
    expect(screen.queryByText("Sarah Jenkins")).toBeNull();
  });

  it("renders empty state when no users match filter", async () => {
    render(<UsersTable users={mockUsers} />);
    const roleFilter = screen.getByLabelText(/filter by role/i);
    await userEvent.selectOptions(roleFilter, "staff");
    expect(screen.getByText(/no users found/i)).toBeDefined();
  });
});
