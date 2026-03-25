import type { AuthUser, Role } from "@/types/auth";

export type UserProfile = AuthUser & {
  mfaEnabled: boolean;
  status: "active" | "inactive" | "suspended" | "deleted";
  createdAt: string;
  updatedAt: string;
};

// GET /v1/users/me
export type GetMeResponse = {
  success: boolean;
  message: string;
  data: UserProfile;
};

// PATCH /v1/users/me
export type UpdateMePayload = {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  address?: string;
  mfaEnabled?: boolean;
};

export type UpdateMeResponse = {
  success: boolean;
  message: string;
  data: UserProfile;
};

// DELETE /v1/users/me
export type DeleteMeResponse = {
  success: boolean;
  message: string;
};

// GET /v1/users/count
export type GetUserCountResponse = {
  success: boolean;
  count: number;
};

// GET /v1/users
export type GetUsersQuery = {
  page?: number;
  limit?: number;
  role?: Role;
  status?: string;
  search?: string;
};

export type PaginatedUsersData = {
  users: UserProfile[];
  total: number;
  page: number;
  limit: number;
};

export type GetUsersResponse = {
  success: boolean;
  message: string;
  data: PaginatedUsersData;
};

// GET /v1/users/{id}
export type GetUserByIdResponse = {
  success: boolean;
  message: string;
  data: UserProfile;
};

// PATCH /v1/users/{id}
export type AdminUpdateUserPayload = {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  address?: string;
  email?: string;
  role?: Role;
  status?: string;
};

export type AdminUpdateUserResponse = {
  success: boolean;
  message: string;
  data: UserProfile;
};

// DELETE /v1/users/{id}
export type DeleteUserResponse = {
  success: boolean;
  message: string;
};

// PATCH /v1/users/{id}/deactivate
export type DeactivateUserResponse = {
  success: boolean;
  message: string;
  data: { status: string };
};

// PATCH /v1/users/{id}/activate
export type ActivateUserResponse = {
  success: boolean;
  message: string;
};

// GET /v1/users/stats
export type UserStatsData = {
  totalUsers: number;
  totalStaff: number;
  inactiveUsers: number;
  suspendedUsers: number;
};

export type GetUserStatsResponse = {
  success: boolean;
  message?: string;
  data: UserStatsData;
};
