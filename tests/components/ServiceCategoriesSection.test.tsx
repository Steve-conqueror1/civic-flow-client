import { screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ServiceDepartmentsSection } from "@/components/ServiceDepartmentsSection";
import { renderWithProviders } from "@/tests/utils/render-with-providers";

const mockDepartments = [
  {
    id: "1",
    name: "Roads & Traffic",
    description: "Road maintenance",
    icon: "roads-traffic",
    slug: "roads-traffic",
    isActive: true,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Permits",
    description: "Building permits",
    icon: "permits",
    slug: "permits",
    isActive: true,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
  },
  {
    id: "3",
    name: "Parks & Rec",
    description: "Parks and recreation",
    icon: "parks-rec",
    slug: "parks-rec",
    isActive: true,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
  },
  {
    id: "4",
    name: "Waste Mgmt",
    description: "Waste management",
    icon: "waste-mgmt",
    slug: "waste-management",
    isActive: true,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
  },
  {
    id: "5",
    name: "Social Services",
    description: "Social services",
    icon: "social-services",
    slug: "social-services",
    isActive: true,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
  },
  {
    id: "6",
    name: "General Help",
    description: "General help",
    icon: "help-circle",
    slug: "general-help",
    isActive: true,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
  },
];

vi.mock("@/app/state/api", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/app/state/api")>();
  return {
    ...actual,
    useGetDepartmentsQuery: () => ({
      data: {
        success: true,
        message: "OK",
        data: { departments: mockDepartments },
      },
      isLoading: false,
      isError: false,
    }),
  };
});

describe("ServiceCategoriesSection", () => {
  it("renders the section heading", () => {
    renderWithProviders(<ServiceDepartmentsSection />);
    expect(
      screen.getByRole("heading", { level: 2, name: /service categories/i }),
    ).toBeDefined();
  });

  it("renders the subtitle", () => {
    renderWithProviders(<ServiceDepartmentsSection />);
    expect(screen.getByText(/browse services by department/i)).toBeDefined();
  });

  it("renders the View All Services link", () => {
    renderWithProviders(<ServiceDepartmentsSection />);
    expect(
      screen.getByRole("link", { name: /view all services/i }),
    ).toBeDefined();
  });

  it("renders all six category cards", () => {
    renderWithProviders(<ServiceDepartmentsSection />);
    expect(
      screen.getByRole("link", { name: /roads & traffic/i }),
    ).toBeDefined();
    expect(screen.getByRole("link", { name: /permits/i })).toBeDefined();
    expect(screen.getByRole("link", { name: /parks & rec/i })).toBeDefined();
    expect(screen.getByRole("link", { name: /waste mgmt/i })).toBeDefined();
    expect(
      screen.getByRole("link", { name: /social services/i }),
    ).toBeDefined();
    expect(screen.getByRole("link", { name: /general help/i })).toBeDefined();
  });

  it("has an id for anchor navigation", () => {
    const { container } = renderWithProviders(<ServiceDepartmentsSection />);
    expect(container.querySelector("#services")).toBeDefined();
  });

  it("renders as a section landmark", () => {
    renderWithProviders(<ServiceDepartmentsSection />);
    expect(screen.getByRole("region")).toBeDefined();
  });
});
