import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type {
  ContactApiPayload,
  ContactApiResponse,
} from "@/app/types/contact";
import type { GetDepartmentsResponse } from "@/app/types/department";
import type { GetFeaturedServiceRequestResponse } from "@/app/types/request";
import type {
  GetMeResponse,
  UpdateMePayload,
  UpdateMeResponse,
  DeleteMeResponse,
  GetUserCountResponse,
  GetUsersQuery,
  GetUsersResponse,
  GetUserByIdResponse,
  AdminUpdateUserPayload,
  AdminUpdateUserResponse,
  DeleteUserResponse,
  DeactivateUserResponse,
} from "@/app/types/user";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    credentials: "include",
  }),
  reducerPath: "api",
  tagTypes: ["Departments", "Users", "UserDetail", "UserCount", "Me", "FeaturedServiceRequest"],
  endpoints: (build) => ({
    submitContact: build.mutation<ContactApiResponse, ContactApiPayload>({
      query: (body) => ({ url: "/contact", method: "POST", body }),
    }),
    getDepartments: build.query<GetDepartmentsResponse, void>({
      query: () => "/departments",
      providesTags: ["Departments"],
    }),

    // Public endpoints
    getFeaturedServiceRequest: build.query<GetFeaturedServiceRequestResponse, void>({
      query: () => "/service-requests/featured",
      providesTags: ["FeaturedServiceRequest"],
    }),

    // Citizen endpoints
    getMe: build.query<GetMeResponse, void>({
      query: () => "/users/me",
      providesTags: ["Me"],
    }),
    updateMe: build.mutation<UpdateMeResponse, UpdateMePayload>({
      query: (body) => ({ url: "/users/me", method: "PATCH", body }),
      invalidatesTags: ["Me"],
    }),
    deleteMe: build.mutation<DeleteMeResponse, void>({
      query: () => ({ url: "/users/me", method: "DELETE" }),
      invalidatesTags: ["Me"],
    }),

    // Public endpoint
    getUserCount: build.query<GetUserCountResponse, void>({
      query: () => "/users/count",
      providesTags: ["UserCount"],
    }),

    // Admin endpoints
    getUsers: build.query<GetUsersResponse, GetUsersQuery | void>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params) {
          if (params.page != null)
            searchParams.set("page", String(params.page));
          if (params.limit != null)
            searchParams.set("limit", String(params.limit));
          if (params.role) searchParams.set("role", params.role);
          if (params.status) searchParams.set("status", params.status);
          if (params.search) searchParams.set("search", params.search);
        }
        const qs = searchParams.toString();
        return qs ? `/users?${qs}` : "/users";
      },
      providesTags: ["Users"],
    }),
    getUserById: build.query<GetUserByIdResponse, string>({
      query: (id) => `/users/${id}`,
      providesTags: ["UserDetail"],
    }),
    adminUpdateUser: build.mutation<
      AdminUpdateUserResponse,
      { id: string; body: AdminUpdateUserPayload }
    >({
      query: ({ id, body }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Users", "UserDetail"],
    }),
    adminDeleteUser: build.mutation<DeleteUserResponse, string>({
      query: (id) => ({ url: `/users/${id}`, method: "DELETE" }),
      invalidatesTags: ["Users", "UserDetail"],
    }),
    adminDeactivateUser: build.mutation<DeactivateUserResponse, string>({
      query: (id) => ({ url: `/users/${id}/deactivate`, method: "PATCH" }),
      invalidatesTags: ["Users", "UserDetail"],
    }),
  }),
});

export const {
  useSubmitContactMutation,
  useGetDepartmentsQuery,
  useGetFeaturedServiceRequestQuery,
  useGetMeQuery,
  useUpdateMeMutation,
  useDeleteMeMutation,
  useGetUserCountQuery,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useAdminUpdateUserMutation,
  useAdminDeleteUserMutation,
  useAdminDeactivateUserMutation,
} = api;
