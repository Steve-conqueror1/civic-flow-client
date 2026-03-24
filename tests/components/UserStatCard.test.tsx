import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Users } from "lucide-react";
import { UserStatCard } from "@/components/users/UserStatCard";
import { renderWithProviders } from "@/tests/utils/render-with-providers";
import UsersPage from "@/app/dashboard/users/page";

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

// Mock RTK Query hooks
vi.mock("@/app/state/api", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/app/state/api")>();
  return {
    ...actual,
    useGetUserStatsQuery: vi.fn(),
    useGetUsersQuery: vi.fn().mockReturnValue({
      data: { data: { users: [], total: 0 } },
      isLoading: false,
    }),
  };
});

import { useGetUserStatsQuery } from "@/app/state/api";
const mockUseGetUserStatsQuery = vi.mocked(useGetUserStatsQuery);

describe("UsersPage stats grid integration", () => {
  it("renders all four stat labels and values when API returns data", () => {
    mockUseGetUserStatsQuery.mockReturnValue({
      data: {
        success: true,
        data: {
          totalUsers: 1200,
          totalStaff: 45,
          inactiveUsers: 30,
          suspendedUsers: 8,
        },
      },
      isLoading: false,
      isError: false,
    } as ReturnType<typeof useGetUserStatsQuery>);

    renderWithProviders(<UsersPage />);

    expect(screen.getByText("Total Users")).toBeDefined();
    expect(screen.getByText("1200")).toBeDefined();
    expect(screen.getByText("Total Staff")).toBeDefined();
    expect(screen.getByText("45")).toBeDefined();
    expect(screen.getByText("Inactive Users")).toBeDefined();
    expect(screen.getByText("30")).toBeDefined();
    expect(screen.getAllByText("Suspended").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("8")).toBeDefined();
  });

  it("renders loading skeletons while fetch is pending", () => {
    mockUseGetUserStatsQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    } as ReturnType<typeof useGetUserStatsQuery>);

    const { container } = renderWithProviders(<UsersPage />);

    const skeletons = container.querySelectorAll(".animate-pulse");
    expect(skeletons.length).toBe(4);
    expect(screen.queryByText("Total Users")).toBeNull();
  });

  it("renders error message when API call fails", () => {
    mockUseGetUserStatsQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    } as ReturnType<typeof useGetUserStatsQuery>);

    renderWithProviders(<UsersPage />);

    expect(
      screen.getByText("Failed to load user statistics. Please refresh."),
    ).toBeDefined();
    expect(screen.queryByText("Total Users")).toBeNull();
  });

  it("displays 0 correctly for any stat that returns zero", () => {
    mockUseGetUserStatsQuery.mockReturnValue({
      data: {
        success: true,
        data: {
          totalUsers: 100,
          totalStaff: 0,
          inactiveUsers: 0,
          suspendedUsers: 0,
        },
      },
      isLoading: false,
      isError: false,
    } as ReturnType<typeof useGetUserStatsQuery>);

    renderWithProviders(<UsersPage />);

    const zeroes = screen.getAllByText("0");
    expect(zeroes.length).toBe(3);
    expect(screen.getByText("100")).toBeDefined();
  });
});
