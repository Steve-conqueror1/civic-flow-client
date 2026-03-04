import { describe, it, expect } from "vitest";
import authReducer, { setAuthUser, clearAuth } from "@/app/state/authSlice";
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

describe("authSlice", () => {
  it("has correct initial state", () => {
    const state = authReducer(undefined, { type: "@@INIT" });
    expect(state.authUser).toBeNull();
    expect(state.role).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it("setAuthUser stores user and role and sets isAuthenticated to true", () => {
    const state = authReducer(undefined, setAuthUser({ user: mockUser }));
    expect(state.authUser).toEqual(mockUser);
    expect(state.role).toBe("citizen");
    expect(state.isAuthenticated).toBe(true);
  });

  it("clearAuth resets all fields to null/false", () => {
    const populated = authReducer(undefined, setAuthUser({ user: mockUser }));
    const cleared = authReducer(populated, clearAuth());
    expect(cleared.authUser).toBeNull();
    expect(cleared.role).toBeNull();
    expect(cleared.isAuthenticated).toBe(false);
  });
});
