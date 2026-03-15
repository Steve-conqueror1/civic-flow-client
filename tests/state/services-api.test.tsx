import { describe, it, expect, vi, afterEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import React, { type ReactNode } from "react";
import { Provider } from "react-redux";
import type { Service } from "@/app/types/service";

// Set env before api module is imported via makeStore
const API_BASE = "http://localhost:3001";
vi.stubEnv("NEXT_PUBLIC_API_BASE_URL", API_BASE);

const { makeStore } = await import("@/app/state/redux");
const {
  api,
  useGetServicesQuery,
  useSearchServicesQuery,
  useGetServicesGroupedByCategoryQuery,
  useGetServicesGroupedByDepartmentQuery,
  useGetServicesByCategoryQuery,
  useGetServicesByDepartmentQuery,
  useGetServiceByIdQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useActivateServiceMutation,
  useDeactivateServiceMutation,
} = await import("@/app/state/api");

const mockService: Service = {
  id: "svc-1",
  name: "Road Repair",
  description: "Report potholes and road damage",
  instructions: "Provide location and photo",
  categoryId: "cat-1",
  departmentId: "dept-1",
  minResponseDays: 3,
  maxResponseDays: 10,
  isActive: true,
  createdAt: "2025-01-01T00:00:00Z",
  updatedAt: "2025-01-01T00:00:00Z",
};

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

function getRequestUrl(): string {
  const request = vi.mocked(fetch).mock.calls[0][0];
  return request instanceof Request ? request.url : String(request);
}

function getRequest(): Request {
  return vi.mocked(fetch).mock.calls[0][0] as Request;
}

describe("Services API endpoints", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("has Services in tagTypes", () => {
    const action = api.util.invalidateTags([{ type: "Services" }]);
    expect(action.type).toBe("api/invalidateTags");
  });

  describe("getServices", () => {
    it("constructs URL without params", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValueOnce(
          mockFetchResponse({
            success: true,
            message: "OK",
            data: { services: [], total: 0, page: 1, limit: 10 },
          }),
        ),
      );

      const { Wrapper } = createWrapper();
      renderHook(() => useGetServicesQuery(), { wrapper: Wrapper });

      await waitFor(() => {
        expect(fetch).toHaveBeenCalled();
      });

      const url = getRequestUrl();
      expect(url).toContain("/services");
      expect(url).not.toContain("?");
    });

    it("constructs URL with query params", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValueOnce(
          mockFetchResponse({
            success: true,
            message: "OK",
            data: { services: [], total: 0, page: 2, limit: 5 },
          }),
        ),
      );

      const { Wrapper } = createWrapper();
      renderHook(
        () =>
          useGetServicesQuery({ page: 2, limit: 5, includeInactive: true }),
        { wrapper: Wrapper },
      );

      await waitFor(() => {
        expect(fetch).toHaveBeenCalled();
      });

      const url = getRequestUrl();
      expect(url).toContain("page=2");
      expect(url).toContain("limit=5");
      expect(url).toContain("includeInactive=true");
    });

    it("fetches services successfully", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValueOnce(
          mockFetchResponse({
            success: true,
            message: "Services retrieved",
            data: { services: [mockService], total: 1, page: 1, limit: 10 },
          }),
        ),
      );

      const { Wrapper } = createWrapper();
      const { result } = renderHook(() => useGetServicesQuery(), {
        wrapper: Wrapper,
      });

      expect(result.current.isLoading).toBe(true);

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.data?.success).toBe(true);
      expect(result.current.data?.data.services).toHaveLength(1);
      expect(result.current.data?.data.services[0].name).toBe("Road Repair");
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
      const { result } = renderHook(() => useGetServicesQuery(), {
        wrapper: Wrapper,
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.isError).toBe(true);
      expect(result.current.data).toBeUndefined();
    });
  });

  describe("searchServices", () => {
    it("includes q param in URL", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValueOnce(
          mockFetchResponse({
            success: true,
            message: "OK",
            data: { services: [], total: 0, page: 1, limit: 10 },
          }),
        ),
      );

      const { Wrapper } = createWrapper();
      renderHook(() => useSearchServicesQuery({ q: "roads" }), {
        wrapper: Wrapper,
      });

      await waitFor(() => {
        expect(fetch).toHaveBeenCalled();
      });

      const url = getRequestUrl();
      expect(url).toContain("/services/search");
      expect(url).toContain("q=roads");
    });
  });

  describe("getServicesByCategory", () => {
    it("constructs URL with categoryId and query params", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValueOnce(
          mockFetchResponse({
            success: true,
            message: "OK",
            data: { services: [], total: 0, page: 1, limit: 10 },
          }),
        ),
      );

      const { Wrapper } = createWrapper();
      renderHook(
        () =>
          useGetServicesByCategoryQuery({
            categoryId: "cat-1",
            page: 1,
            limit: 10,
          }),
        { wrapper: Wrapper },
      );

      await waitFor(() => {
        expect(fetch).toHaveBeenCalled();
      });

      const url = getRequestUrl();
      expect(url).toContain("/services/category/cat-1");
      expect(url).toContain("page=1");
      expect(url).toContain("limit=10");
    });
  });

  describe("getServicesByDepartment", () => {
    it("constructs URL with departmentId and query params", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValueOnce(
          mockFetchResponse({
            success: true,
            message: "OK",
            data: { services: [], total: 0, page: 1, limit: 10 },
          }),
        ),
      );

      const { Wrapper } = createWrapper();
      renderHook(
        () =>
          useGetServicesByDepartmentQuery({
            departmentId: "dept-1",
            page: 1,
            limit: 5,
          }),
        { wrapper: Wrapper },
      );

      await waitFor(() => {
        expect(fetch).toHaveBeenCalled();
      });

      const url = getRequestUrl();
      expect(url).toContain("/services/department/dept-1");
      expect(url).toContain("page=1");
      expect(url).toContain("limit=5");
    });
  });

  describe("getServiceById", () => {
    it("constructs URL with service id", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValueOnce(
          mockFetchResponse({
            success: true,
            message: "OK",
            data: mockService,
          }),
        ),
      );

      const { Wrapper } = createWrapper();
      renderHook(() => useGetServiceByIdQuery("svc-1"), {
        wrapper: Wrapper,
      });

      await waitFor(() => {
        expect(fetch).toHaveBeenCalled();
      });

      const url = getRequestUrl();
      expect(url).toContain("/services/svc-1");
    });
  });

  describe("createService", () => {
    it("sends POST with correct body", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValueOnce(
          mockFetchResponse({
            success: true,
            message: "Service created",
            data: mockService,
          }, 201),
        ),
      );

      const payload = {
        name: "Road Repair",
        description: "Report potholes and road damage",
        instructions: "Provide location and photo",
        categoryId: "cat-1",
        departmentId: "dept-1",
        minResponseDays: 3,
        maxResponseDays: 10,
      };

      const { Wrapper } = createWrapper();
      const { result } = renderHook(() => useCreateServiceMutation(), {
        wrapper: Wrapper,
      });

      await act(async () => {
        result.current[0](payload);
      });

      await waitFor(() => {
        expect(fetch).toHaveBeenCalled();
      });

      const req = getRequest();
      expect(req.url).toContain("/services");
      expect(req.method).toBe("POST");

      const body = await req.json();
      expect(body.name).toBe("Road Repair");
      expect(body.categoryId).toBe("cat-1");
    });
  });

  describe("updateService", () => {
    it("sends PATCH to correct URL", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValueOnce(
          mockFetchResponse({
            success: true,
            message: "Service updated",
            data: mockService,
          }),
        ),
      );

      const { Wrapper } = createWrapper();
      const { result } = renderHook(() => useUpdateServiceMutation(), {
        wrapper: Wrapper,
      });

      await act(async () => {
        result.current[0]({ id: "svc-1", body: { name: "Updated Name" } });
      });

      await waitFor(() => {
        expect(fetch).toHaveBeenCalled();
      });

      const req = getRequest();
      expect(req.url).toContain("/services/svc-1");
      expect(req.method).toBe("PATCH");
    });
  });

  describe("deleteService", () => {
    it("sends DELETE to correct URL", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValueOnce(
          mockFetchResponse({ success: true, message: "Service deleted" }),
        ),
      );

      const { Wrapper } = createWrapper();
      const { result } = renderHook(() => useDeleteServiceMutation(), {
        wrapper: Wrapper,
      });

      await act(async () => {
        result.current[0]("svc-1");
      });

      await waitFor(() => {
        expect(fetch).toHaveBeenCalled();
      });

      const req = getRequest();
      expect(req.url).toContain("/services/svc-1");
      expect(req.method).toBe("DELETE");
    });
  });

  describe("activateService", () => {
    it("sends PATCH to activate URL", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValueOnce(
          mockFetchResponse({
            success: true,
            message: "Service activated",
            data: mockService,
          }),
        ),
      );

      const { Wrapper } = createWrapper();
      const { result } = renderHook(() => useActivateServiceMutation(), {
        wrapper: Wrapper,
      });

      await act(async () => {
        result.current[0]("svc-1");
      });

      await waitFor(() => {
        expect(fetch).toHaveBeenCalled();
      });

      const req = getRequest();
      expect(req.url).toContain("/services/svc-1/activate");
      expect(req.method).toBe("PATCH");
    });
  });

  describe("deactivateService", () => {
    it("sends PATCH to deactivate URL", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValueOnce(
          mockFetchResponse({
            success: true,
            message: "Service deactivated",
            data: mockService,
          }),
        ),
      );

      const { Wrapper } = createWrapper();
      const { result } = renderHook(() => useDeactivateServiceMutation(), {
        wrapper: Wrapper,
      });

      await act(async () => {
        result.current[0]("svc-1");
      });

      await waitFor(() => {
        expect(fetch).toHaveBeenCalled();
      });

      const req = getRequest();
      expect(req.url).toContain("/services/svc-1/deactivate");
      expect(req.method).toBe("PATCH");
    });
  });
});
