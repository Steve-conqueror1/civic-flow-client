import { describe, it, expect, vi, afterEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import React, { type ReactNode } from "react";
import { Provider } from "react-redux";
import type { UserProfile } from "@/app/types/user";

// Set env before api module is imported via makeStore
const API_BASE = "http://localhost:3001";
vi.stubEnv("NEXT_PUBLIC_API_BASE_URL", API_BASE);

const { makeStore } = await import("@/app/state/redux");
const {
  api,
  useGetMeQuery,
  useUpdateMeMutation,
  useDeleteMeMutation,
  useGetUserCountQuery,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useAdminUpdateUserMutation,
  useAdminDeleteUserMutation,
  useAdminDeactivateUserMutation,
} = await import("@/app/state/api");

const mockUser: UserProfile = {
  id: "u1",
  firstName: "Jane",
  lastName: "Doe",
  email: "jane@example.com",
  phoneNumber: "555-1234",
  address: "123 Main St",
  role: "citizen",
  mfaEnabled: false,
  status: "active",
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

// ---------- getMe ----------

describe("getMe API endpoint", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("has Me in tagTypes", () => {
    const action = api.util.invalidateTags([{ type: "Me" }]);
    expect(action.type).toBe("api/invalidateTags");
  });

  it("fetches the current user successfully", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValueOnce(
        mockFetchResponse({
          success: true,
          message: "User retrieved",
          data: mockUser,
        }),
      ),
    );

    const { Wrapper } = createWrapper();
    const { result } = renderHook(() => useGetMeQuery(), {
      wrapper: Wrapper,
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data?.success).toBe(true);
    expect(result.current.data?.data.firstName).toBe("Jane");
    expect(result.current.isError).toBe(false);
  });

  it("handles 401 error", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValueOnce(
        mockFetchResponse({ message: "Unauthorized" }, 401),
      ),
    );

    const { Wrapper } = createWrapper();
    const { result } = renderHook(() => useGetMeQuery(), {
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
          data: mockUser,
        }),
      ),
    );

    const { Wrapper } = createWrapper();
    renderHook(() => useGetMeQuery(), { wrapper: Wrapper });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });

    const request = vi.mocked(fetch).mock.calls[0][0];
    const url = request instanceof Request ? request.url : String(request);
    expect(url).toContain("/users/me");
  });
});

// ---------- updateMe ----------

describe("updateMe API endpoint", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("sends PATCH with the correct body", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValueOnce(
        mockFetchResponse({
          success: true,
          message: "Profile updated",
          data: { ...mockUser, firstName: "Janet" },
        }),
      ),
    );

    const { Wrapper } = createWrapper();
    const { result } = renderHook(() => useUpdateMeMutation(), {
      wrapper: Wrapper,
    });

    await act(async () => {
      result.current[0]({ firstName: "Janet" });
    });

    await waitFor(() => {
      expect(result.current[1].isSuccess).toBe(true);
    });

    const request = vi.mocked(fetch).mock.calls[0][0] as Request;
    expect(request.method).toBe("PATCH");
    const body = await request.clone().json();
    expect(body.firstName).toBe("Janet");
  });

  it("handles error responses", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValueOnce(
        mockFetchResponse({ message: "Validation error" }, 422),
      ),
    );

    const { Wrapper } = createWrapper();
    const { result } = renderHook(() => useUpdateMeMutation(), {
      wrapper: Wrapper,
    });

    await act(async () => {
      result.current[0]({ firstName: "" });
    });

    await waitFor(() => {
      expect(result.current[1].isError).toBe(true);
    });
  });
});

// ---------- deleteMe ----------

describe("deleteMe API endpoint", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("sends DELETE request", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValueOnce(
        mockFetchResponse({ success: true, message: "Account deleted" }),
      ),
    );

    const { Wrapper } = createWrapper();
    const { result } = renderHook(() => useDeleteMeMutation(), {
      wrapper: Wrapper,
    });

    await act(async () => {
      result.current[0]();
    });

    await waitFor(() => {
      expect(result.current[1].isSuccess).toBe(true);
    });

    const request = vi.mocked(fetch).mock.calls[0][0] as Request;
    expect(request.method).toBe("DELETE");
  });

  it("handles error responses", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValueOnce(
        mockFetchResponse({ message: "Server error" }, 500),
      ),
    );

    const { Wrapper } = createWrapper();
    const { result } = renderHook(() => useDeleteMeMutation(), {
      wrapper: Wrapper,
    });

    await act(async () => {
      result.current[0]();
    });

    await waitFor(() => {
      expect(result.current[1].isError).toBe(true);
    });
  });
});

// ---------- getUserCount ----------

describe("getUserCount API endpoint", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("has UserCount in tagTypes", () => {
    const action = api.util.invalidateTags([{ type: "UserCount" }]);
    expect(action.type).toBe("api/invalidateTags");
  });

  it("fetches the user count successfully", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValueOnce(
        mockFetchResponse({ success: true, count: 42 }),
      ),
    );

    const { Wrapper } = createWrapper();
    const { result } = renderHook(() => useGetUserCountQuery(), {
      wrapper: Wrapper,
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data?.success).toBe(true);
    expect(result.current.data?.count).toBe(42);
  });

  it("constructs the correct request URL", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValueOnce(
        mockFetchResponse({ success: true, count: 0 }),
      ),
    );

    const { Wrapper } = createWrapper();
    renderHook(() => useGetUserCountQuery(), { wrapper: Wrapper });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });

    const request = vi.mocked(fetch).mock.calls[0][0];
    const url = request instanceof Request ? request.url : String(request);
    expect(url).toContain("/users/count");
  });

  it("handles error responses", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValueOnce(
        mockFetchResponse({ message: "Server error" }, 500),
      ),
    );

    const { Wrapper } = createWrapper();
    const { result } = renderHook(() => useGetUserCountQuery(), {
      wrapper: Wrapper,
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isError).toBe(true);
  });
});

// ---------- getUsers ----------

describe("getUsers API endpoint", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("has Users in tagTypes", () => {
    const action = api.util.invalidateTags([{ type: "Users" }]);
    expect(action.type).toBe("api/invalidateTags");
  });

  it("fetches paginated users successfully", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValueOnce(
        mockFetchResponse({
          success: true,
          message: "Users retrieved",
          data: { users: [mockUser], total: 1, page: 1, limit: 10 },
        }),
      ),
    );

    const { Wrapper } = createWrapper();
    const { result } = renderHook(
      () => useGetUsersQuery({ page: 1, limit: 10 }),
      { wrapper: Wrapper },
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data?.data.users).toHaveLength(1);
    expect(result.current.data?.data.total).toBe(1);
  });

  it("passes query params to the URL", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValueOnce(
        mockFetchResponse({
          success: true,
          message: "OK",
          data: { users: [], total: 0, page: 1, limit: 10 },
        }),
      ),
    );

    const { Wrapper } = createWrapper();
    renderHook(
      () =>
        useGetUsersQuery({
          page: 2,
          limit: 5,
          role: "citizen",
          status: "active",
          search: "jane",
        }),
      { wrapper: Wrapper },
    );

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });

    const request = vi.mocked(fetch).mock.calls[0][0];
    const url = request instanceof Request ? request.url : String(request);
    expect(url).toContain("page=2");
    expect(url).toContain("limit=5");
    expect(url).toContain("role=citizen");
    expect(url).toContain("status=active");
    expect(url).toContain("search=jane");
  });

  it("handles error responses", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValueOnce(
        mockFetchResponse({ message: "Forbidden" }, 403),
      ),
    );

    const { Wrapper } = createWrapper();
    const { result } = renderHook(() => useGetUsersQuery(), {
      wrapper: Wrapper,
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isError).toBe(true);
  });
});

// ---------- getUserById ----------

describe("getUserById API endpoint", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("has UserDetail in tagTypes", () => {
    const action = api.util.invalidateTags([{ type: "UserDetail" }]);
    expect(action.type).toBe("api/invalidateTags");
  });

  it("fetches a user by ID successfully", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValueOnce(
        mockFetchResponse({
          success: true,
          message: "User retrieved",
          data: mockUser,
        }),
      ),
    );

    const { Wrapper } = createWrapper();
    const { result } = renderHook(() => useGetUserByIdQuery("u1"), {
      wrapper: Wrapper,
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data?.data.id).toBe("u1");
    expect(result.current.data?.data.email).toBe("jane@example.com");
  });

  it("handles 404 error", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValueOnce(
        mockFetchResponse({ message: "User not found" }, 404),
      ),
    );

    const { Wrapper } = createWrapper();
    const { result } = renderHook(() => useGetUserByIdQuery("nonexistent"), {
      wrapper: Wrapper,
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isError).toBe(true);
  });

  it("constructs the correct request URL with ID", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValueOnce(
        mockFetchResponse({
          success: true,
          message: "OK",
          data: mockUser,
        }),
      ),
    );

    const { Wrapper } = createWrapper();
    renderHook(() => useGetUserByIdQuery("abc-123"), { wrapper: Wrapper });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });

    const request = vi.mocked(fetch).mock.calls[0][0];
    const url = request instanceof Request ? request.url : String(request);
    expect(url).toContain("/users/abc-123");
  });
});

// ---------- adminUpdateUser ----------

describe("adminUpdateUser API endpoint", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("sends PATCH with the correct body and URL", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValueOnce(
        mockFetchResponse({
          success: true,
          message: "User updated",
          data: { ...mockUser, role: "admin" },
        }),
      ),
    );

    const { Wrapper } = createWrapper();
    const { result } = renderHook(() => useAdminUpdateUserMutation(), {
      wrapper: Wrapper,
    });

    await act(async () => {
      result.current[0]({ id: "u1", body: { role: "admin" } });
    });

    await waitFor(() => {
      expect(result.current[1].isSuccess).toBe(true);
    });

    const request = vi.mocked(fetch).mock.calls[0][0] as Request;
    expect(request.method).toBe("PATCH");
    const url = request.url;
    expect(url).toContain("/users/u1");
    const body = await request.clone().json();
    expect(body.role).toBe("admin");
  });

  it("handles error responses", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValueOnce(
        mockFetchResponse({ message: "Conflict" }, 409),
      ),
    );

    const { Wrapper } = createWrapper();
    const { result } = renderHook(() => useAdminUpdateUserMutation(), {
      wrapper: Wrapper,
    });

    await act(async () => {
      result.current[0]({ id: "u1", body: { email: "taken@example.com" } });
    });

    await waitFor(() => {
      expect(result.current[1].isError).toBe(true);
    });
  });
});

// ---------- adminDeleteUser ----------

describe("adminDeleteUser API endpoint", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("sends DELETE request with user ID", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValueOnce(
        mockFetchResponse({ success: true, message: "User deleted" }),
      ),
    );

    const { Wrapper } = createWrapper();
    const { result } = renderHook(() => useAdminDeleteUserMutation(), {
      wrapper: Wrapper,
    });

    await act(async () => {
      result.current[0]("u1");
    });

    await waitFor(() => {
      expect(result.current[1].isSuccess).toBe(true);
    });

    const request = vi.mocked(fetch).mock.calls[0][0] as Request;
    expect(request.method).toBe("DELETE");
    expect(request.url).toContain("/users/u1");
  });

  it("handles error responses", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValueOnce(
        mockFetchResponse({ message: "Server error" }, 500),
      ),
    );

    const { Wrapper } = createWrapper();
    const { result } = renderHook(() => useAdminDeleteUserMutation(), {
      wrapper: Wrapper,
    });

    await act(async () => {
      result.current[0]("u1");
    });

    await waitFor(() => {
      expect(result.current[1].isError).toBe(true);
    });
  });
});

// ---------- adminDeactivateUser ----------

describe("adminDeactivateUser API endpoint", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("sends PATCH request with no body", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValueOnce(
        mockFetchResponse({
          success: true,
          message: "Status toggled",
          data: { status: "inactive" },
        }),
      ),
    );

    const { Wrapper } = createWrapper();
    const { result } = renderHook(() => useAdminDeactivateUserMutation(), {
      wrapper: Wrapper,
    });

    await act(async () => {
      result.current[0]("u1");
    });

    await waitFor(() => {
      expect(result.current[1].isSuccess).toBe(true);
    });

    const request = vi.mocked(fetch).mock.calls[0][0] as Request;
    expect(request.method).toBe("PATCH");
    expect(request.url).toContain("/users/u1/deactivate");
  });

  it("handles error responses", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValueOnce(
        mockFetchResponse({ message: "Server error" }, 500),
      ),
    );

    const { Wrapper } = createWrapper();
    const { result } = renderHook(() => useAdminDeactivateUserMutation(), {
      wrapper: Wrapper,
    });

    await act(async () => {
      result.current[0]("u1");
    });

    await waitFor(() => {
      expect(result.current[1].isError).toBe(true);
    });
  });
});
