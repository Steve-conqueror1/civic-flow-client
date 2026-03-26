import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { UsersTable } from "@/components/users/UsersTable";
import type { UserProfile } from "@/app/types/user";

const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

const mockActivate = vi.fn().mockReturnValue({ unwrap: () => Promise.resolve() });
const mockDeactivate = vi.fn().mockReturnValue({ unwrap: () => Promise.resolve() });
const mockSuspend = vi.fn().mockReturnValue({ unwrap: () => Promise.resolve() });
const mockDelete = vi.fn().mockReturnValue({ unwrap: () => Promise.resolve() });

vi.mock("@/app/state/api", () => ({
  useAdminActivateUserMutation: () => [mockActivate, {}],
  useAdminDeactivateUserMutation: () => [mockDeactivate, {}],
  useAdminSuspendUserMutation: () => [mockSuspend, {}],
  useAdminDeleteUserMutation: () => [mockDelete, {}],
}));

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

beforeEach(() => {
  vi.clearAllMocks();
});

describe("UsersTable", () => {
  it("renders the table column headers", () => {
    render(<UsersTable users={mockUsers} total={2} page={1} limit={10} onPageChange={vi.fn()} />);
    expect(screen.getByText("User Profile")).toBeDefined();
    expect(screen.getByText("Role")).toBeDefined();
    expect(screen.getByText("Status")).toBeDefined();
    expect(screen.getByText("Last Activity")).toBeDefined();
  });

  it("renders user names from data", () => {
    render(<UsersTable users={mockUsers} total={2} page={1} limit={10} onPageChange={vi.fn()} />);
    expect(screen.getByText("Marcus Chen")).toBeDefined();
    expect(screen.getByText("Sarah Jenkins")).toBeDefined();
  });

  it("renders user emails from data", () => {
    render(<UsersTable users={mockUsers} total={2} page={1} limit={10} onPageChange={vi.fn()} />);
    expect(screen.getByText("marcus.chen@civicflow.gov")).toBeDefined();
  });

  it("renders role badges", () => {
    render(<UsersTable users={mockUsers} total={2} page={1} limit={10} onPageChange={vi.fn()} />);
    expect(screen.getByText("admin")).toBeDefined();
    expect(screen.getByText("citizen")).toBeDefined();
  });

  it("renders the role filter dropdown", () => {
    render(<UsersTable users={mockUsers} total={2} page={1} limit={10} onPageChange={vi.fn()} />);
    expect(screen.getByLabelText(/filter by role/i)).toBeDefined();
  });

  it("renders the status filter dropdown", () => {
    render(<UsersTable users={mockUsers} total={2} page={1} limit={10} onPageChange={vi.fn()} />);
    expect(screen.getByLabelText(/filter by status/i)).toBeDefined();
  });

  it("filters users by role", async () => {
    render(<UsersTable users={mockUsers} total={2} page={1} limit={10} onPageChange={vi.fn()} />);
    const roleFilter = screen.getByLabelText(/filter by role/i);
    await userEvent.selectOptions(roleFilter, "admin");
    expect(screen.getByText("Marcus Chen")).toBeDefined();
    expect(screen.queryByText("Sarah Jenkins")).toBeNull();
  });

  it("renders empty state when no users match filter", async () => {
    render(<UsersTable users={mockUsers} total={2} page={1} limit={10} onPageChange={vi.fn()} />);
    const roleFilter = screen.getByLabelText(/filter by role/i);
    await userEvent.selectOptions(roleFilter, "staff");
    expect(screen.getByText(/no users found/i)).toBeDefined();
  });
});

describe("UsersTable row actions", () => {
  it("opens a dropdown with menu items when action button is clicked", async () => {
    render(<UsersTable users={mockUsers} total={2} page={1} limit={10} onPageChange={vi.fn()} />);
    const actionButtons = screen.getAllByLabelText("User actions");
    await userEvent.click(actionButtons[0]);

    await waitFor(() => {
      expect(screen.getByText("View Profile")).toBeDefined();
      expect(screen.getByText("Delete")).toBeDefined();
    });
  });

  it("navigates to user profile on View Profile click", async () => {
    render(<UsersTable users={mockUsers} total={2} page={1} limit={10} onPageChange={vi.fn()} />);
    const actionButtons = screen.getAllByLabelText("User actions");
    await userEvent.click(actionButtons[0]);

    await waitFor(() => {
      expect(screen.getByText("View Profile")).toBeDefined();
    });
    await userEvent.click(screen.getByText("View Profile"));

    expect(mockPush).toHaveBeenCalledWith("/dashboard/users/1");
  });

  it("opens dialog with reason field when Activate is clicked for an inactive user", async () => {
    render(<UsersTable users={mockUsers} total={2} page={1} limit={10} onPageChange={vi.fn()} />);
    // Sarah Jenkins (index 1) is inactive, so "Activate" should appear
    const actionButtons = screen.getAllByLabelText("User actions");
    await userEvent.click(actionButtons[1]);

    await waitFor(() => {
      expect(screen.getByText("Activate")).toBeDefined();
    });
    await userEvent.click(screen.getByText("Activate"));

    await waitFor(() => {
      expect(screen.getByText("Activate User")).toBeDefined();
      expect(screen.getByPlaceholderText(/provide a reason/i)).toBeDefined();
    });
  });

  it("calls activate mutation with reason after filling in the form", async () => {
    render(<UsersTable users={mockUsers} total={2} page={1} limit={10} onPageChange={vi.fn()} />);
    const actionButtons = screen.getAllByLabelText("User actions");
    await userEvent.click(actionButtons[1]);

    await waitFor(() => {
      expect(screen.getByText("Activate")).toBeDefined();
    });
    await userEvent.click(screen.getByText("Activate"));

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/provide a reason/i)).toBeDefined();
    });

    await userEvent.type(screen.getByPlaceholderText(/provide a reason/i), "Reinstated");

    const confirmButtons = screen.getAllByRole("button", { name: "Activate" });
    const dialogConfirm = confirmButtons.find(
      (btn) => btn.closest("[role='alertdialog']") !== null,
    )!;
    await userEvent.click(dialogConfirm);

    expect(mockActivate).toHaveBeenCalledWith({ id: "2", reason: "Reinstated" });
  });

  it("hides Activate for an active user", async () => {
    render(<UsersTable users={mockUsers} total={2} page={1} limit={10} onPageChange={vi.fn()} />);
    // Marcus Chen (index 0) is active
    const actionButtons = screen.getAllByLabelText("User actions");
    await userEvent.click(actionButtons[0]);

    await waitFor(() => {
      expect(screen.getByText("View Profile")).toBeDefined();
    });
    expect(screen.queryByText("Activate")).toBeNull();
  });

  it("does not call delete when cancel is clicked in confirmation dialog", async () => {
    render(<UsersTable users={mockUsers} total={2} page={1} limit={10} onPageChange={vi.fn()} />);
    const actionButtons = screen.getAllByLabelText("User actions");
    await userEvent.click(actionButtons[0]);

    await waitFor(() => {
      expect(screen.getByText("Delete")).toBeDefined();
    });
    await userEvent.click(screen.getByText("Delete"));

    await waitFor(() => {
      expect(screen.getByText("Cancel")).toBeDefined();
    });
    await userEvent.click(screen.getByText("Cancel"));

    expect(mockDelete).not.toHaveBeenCalled();
  });

  it("disables confirm button when reason is empty", async () => {
    render(<UsersTable users={mockUsers} total={2} page={1} limit={10} onPageChange={vi.fn()} />);
    const actionButtons = screen.getAllByLabelText("User actions");
    await userEvent.click(actionButtons[0]);

    await waitFor(() => {
      expect(screen.getByText("Delete")).toBeDefined();
    });
    await userEvent.click(screen.getByText("Delete"));

    await waitFor(() => {
      expect(screen.getByText("Delete User")).toBeDefined();
    });

    const confirmButtons = screen.getAllByRole("button", { name: "Delete" });
    const dialogConfirm = confirmButtons.find(
      (btn) => btn.closest("[role='alertdialog']") !== null,
    )!;
    expect(dialogConfirm).toHaveAttribute("disabled");
  });
});
