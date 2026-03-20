"use client";

import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/state/redux";
import {
  clearAuth,
  selectAuthUser,
  selectIsAuthenticated,
  selectRole,
  setAuthUser,
} from "@/app/state/authSlice";
import type { LoginFormValues, LoginResponse, RegisterResponse } from "@/types";
import type { RegisterFormValues } from "@/types";
import { useEffect } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function loginUser(data: LoginFormValues) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message ?? "Login failed. Please try again.");
  }
  return res.json();
}

async function fetchCurrentUser(): Promise<LoginResponse["user"]> {
  const res = await fetch(`${API_BASE_URL}/auth/me`, {
    credentials: "include",
  });

  if (res.status === 401) {
    // Attempt silent token refresh
    const refreshRes = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });

    if (!refreshRes.ok) {
      throw new Error("Session expired");
    }

    // Retry after successful refresh
    const retryRes = await fetch(`${API_BASE_URL}/auth/me`, {
      credentials: "include",
    });

    if (!retryRes.ok) {
      throw new Error("Not Authenticated");
    }

    return retryRes.json();
  }

  if (!res.ok) {
    throw new Error("Not Authenticated");
  }

  return res.json();
}

async function registerUser(
  data: Omit<RegisterFormValues, "terms">,
): Promise<RegisterResponse> {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message ?? "Registration failed. Please try again.");
  }
  return res.json();
}

async function logoutUser() {
  await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
}

export function useAuth() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector(selectAuthUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const role = useAppSelector(selectRole);
  const queryClient = useQueryClient();

  const currentUserQuery = useQuery({
    queryKey: ["me"],
    queryFn: fetchCurrentUser,
    retry: false,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (currentUserQuery.status === "success") {
      dispatch(setAuthUser({ user: currentUserQuery.data }));
    }
    if (currentUserQuery.status === "error") {
      dispatch(clearAuth());
    }
  }, [currentUserQuery.status, currentUserQuery.data, dispatch]);

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: async () => {
      await currentUserQuery.refetch();
    },
  });

  const registerMutation = useMutation({
    mutationFn: registerUser,
  });

  const logout = async () => {
    await logoutUser();
    dispatch(clearAuth());
    queryClient.removeQueries({ queryKey: ["me"] });
    router.push("/login");
  };

  return {
    user,
    isAuthenticated,
    isLoading: currentUserQuery.isLoading,
    role,
    loginMutation,
    registerMutation,
    currentUserQuery,
    logout,
  };
}
