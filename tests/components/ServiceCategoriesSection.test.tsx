import { screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ServiceCategoriesSection } from "@/components/services";
import { renderWithProviders } from "@/tests/utils/render-with-providers";
import type { GetServicesGroupedByCategoryResponse } from "@/app/types/service";

type QueryResult = {
  data: GetServicesGroupedByCategoryResponse | undefined;
  isLoading: boolean;
  isError: boolean;
};

let mockQueryResult: QueryResult = {
  data: undefined,
  isLoading: false,
  isError: false,
};

vi.mock("@/app/state/api", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/app/state/api")>();
  return {
    ...actual,
    useGetServicesGroupedByCategoryQuery: vi.fn(() => mockQueryResult),
  };
});

const twoGroups: GetServicesGroupedByCategoryResponse = {
  success: true,
  message: "OK",
  data: {
    groups: [
      {
        category: { id: "cat-1", name: "Infrastructure" },
        services: [
          {
            id: "svc-1",
            name: "Road Repair",
            description: "Fix roads",
            instructions: "Describe the issue",
            categoryId: "cat-1",
            departmentId: "dept-1",
            minResponseDays: 2,
            maxResponseDays: 5,
            isActive: true,
            createdAt: "2025-01-01T00:00:00Z",
            updatedAt: "2025-01-01T00:00:00Z",
          },
          {
            id: "svc-2",
            name: "Snow Removal",
            description: "Snow clearing",
            instructions: "Provide address",
            categoryId: "cat-1",
            departmentId: "dept-1",
            minResponseDays: 2,
            maxResponseDays: 5,
            isActive: true,
            createdAt: "2025-01-01T00:00:00Z",
            updatedAt: "2025-01-01T00:00:00Z",
          },
        ],
      },
      {
        category: { id: "cat-2", name: "Permits & Licensing" },
        services: [
          {
            id: "svc-3",
            name: "Business License",
            description: "Apply for license",
            instructions: "Fill form",
            categoryId: "cat-2",
            departmentId: "dept-2",
            minResponseDays: 3,
            maxResponseDays: 3,
            isActive: true,
            createdAt: "2025-01-01T00:00:00Z",
            updatedAt: "2025-01-01T00:00:00Z",
          },
        ],
      },
    ],
  },
};

describe("ServiceCategoriesSection", () => {
  beforeEach(() => {
    mockQueryResult = { data: twoGroups, isLoading: false, isError: false };
  });

  it("renders skeleton cards when loading", () => {
    mockQueryResult = { data: undefined, isLoading: true, isError: false };
    const { container } = renderWithProviders(<ServiceCategoriesSection />);
    const skeletons = container.querySelectorAll("[data-slot='skeleton']");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("renders an error message when the query fails", () => {
    mockQueryResult = { data: undefined, isLoading: false, isError: true };
    renderWithProviders(<ServiceCategoriesSection />);
    expect(
      screen.getByText(/failed to load service categories/i),
    ).toBeInTheDocument();
  });

  it("renders a fallback message when groups is empty", () => {
    mockQueryResult = {
      data: { success: true, message: "OK", data: { groups: [] } },
      isLoading: false,
      isError: false,
    };
    renderWithProviders(<ServiceCategoriesSection />);
    expect(
      screen.getByText(/no service categories are available/i),
    ).toBeInTheDocument();
  });

  it("renders the correct number of category cards", () => {
    renderWithProviders(<ServiceCategoriesSection />);
    expect(
      screen.getByRole("heading", { name: /infrastructure/i, level: 3 }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /permits & licensing/i, level: 3 }),
    ).toBeInTheDocument();
  });

  it("renders category names from API data", () => {
    renderWithProviders(<ServiceCategoriesSection />);
    expect(screen.getByText("Infrastructure")).toBeInTheDocument();
    expect(screen.getByText("Permits & Licensing")).toBeInTheDocument();
  });

  it("formats response time correctly when min !== max", () => {
    renderWithProviders(<ServiceCategoriesSection />);
    expect(screen.getByText("Response: 2–5 days")).toBeInTheDocument();
  });

  it("formats response time correctly when min === max", () => {
    renderWithProviders(<ServiceCategoriesSection />);
    expect(screen.getByText("Response: 3 days")).toBeInTheDocument();
  });
});
