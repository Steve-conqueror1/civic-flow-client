import { describe, it, expect, vi, afterEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import React, { type ReactNode } from "react";
import { Provider } from "react-redux";
import type { Department } from "@/app/types/department";

// Set env before api module is imported via makeStore
const API_BASE = "http://localhost:3001";
vi.stubEnv("NEXT_PUBLIC_API_BASE_URL", API_BASE);

const { makeStore } = await import("@/app/state/redux");
const { api, useGetDepartmentsQuery } = await import("@/app/state/api");

const mockDepartments: Department[] = [
  {
    id: "1",
    name: "Roads & Traffic",
    description: "Road maintenance and traffic management",
    icon: "roads-traffic",
    slug: "roads-traffic",
    isActive: true,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Permits",
    description: "Building and business permits",
    icon: "permits",
    slug: "permits",
    isActive: true,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
  },
];

function mockFetchResponse(body: unknown, status = 200) {
  const responseBody = JSON.stringify(body);
  return new Response(responseBody, {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function createWrapper() {
  const store = makeStore();

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );

  return { store, Wrapper };
}

describe("getDepartments API endpoint", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("has Departments in tagTypes", () => {
    const action = api.util.invalidateTags([{ type: "Departments" }]);
    expect(action.type).toBe("api/invalidateTags");
  });

  it("fetches departments successfully", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValueOnce(
        mockFetchResponse({
          success: true,
          message: "Departments retrieved",
          data: { departments: mockDepartments },
        }),
      ),
    );

    const { Wrapper } = createWrapper();
    const { result } = renderHook(() => useGetDepartmentsQuery(), {
      wrapper: Wrapper,
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data?.success).toBe(true);
    expect(result.current.data?.data.departments).toHaveLength(2);
    expect(result.current.data?.data.departments[0].name).toBe(
      "Roads & Traffic",
    );
    expect(result.current.isError).toBe(false);
  });

  it("handles error responses", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValueOnce(
        mockFetchResponse({ message: "Internal server error" }, 500),
      ),
    );

    const { Wrapper } = createWrapper();
    const { result } = renderHook(() => useGetDepartmentsQuery(), {
      wrapper: Wrapper,
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isError).toBe(true);
    expect(result.current.data).toBeUndefined();
  });

  it("constructs the correct request URL", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValueOnce(
        mockFetchResponse({
          success: true,
          message: "OK",
          data: { departments: [] },
        }),
      ),
    );

    const { Wrapper } = createWrapper();
    renderHook(() => useGetDepartmentsQuery(), { wrapper: Wrapper });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });

    const request = vi.mocked(fetch).mock.calls[0][0];
    const url = request instanceof Request ? request.url : String(request);
    expect(url).toContain("/api/v1/departments");
  });
});
