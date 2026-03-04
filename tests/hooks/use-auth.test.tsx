import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { makeStore } from "@/app/state/redux";
import { setAuthUser } from "@/app/state/authSlice";
import { useAuth } from "@/app/hooks/use-auth";
import type { AuthUser } from "@/types";

const mockUser: AuthUser = {
  id: "1",
  firstName: "Jane",
  lastName: "Doe",
  email: "jane@example.com",
  phone: "7801234567",
  address: "123 Maple Ave",
  role: "citizen",
};

function createWrapper(store = makeStore()) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );

  return { store, Wrapper };
}

describe("useAuth", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("isAuthenticated is false by default", () => {
    const { Wrapper } = createWrapper();
    const { result } = renderHook(() => useAuth(), { wrapper: Wrapper });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
  });

  it("isAuthenticated reflects Redux state when setAuthUser is dispatched", () => {
    const store = makeStore();
    store.dispatch(setAuthUser({ user: mockUser }));

    const { Wrapper } = createWrapper(store);
    const { result } = renderHook(() => useAuth(), { wrapper: Wrapper });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).toEqual(mockUser);
  });

  it("logout calls the logout endpoint and clears auth state", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({}),
      }),
    );

    const store = makeStore();
    store.dispatch(setAuthUser({ user: mockUser }));

    const { Wrapper } = createWrapper(store);
    const { result } = renderHook(() => useAuth(), { wrapper: Wrapper });

    await act(async () => {
      await result.current.logout();
    });

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/auth/logout"),
      expect.objectContaining({
        method: "POST",
        credentials: "include",
      }),
    );

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
  });
});
