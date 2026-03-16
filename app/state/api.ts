import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type {
  ContactApiPayload,
  ContactApiResponse,
} from "@/app/types/contact";
import type { GetDepartmentsResponse } from "@/app/types/department";
import type { GetFeaturedServiceRequestResponse } from "@/app/types/request";
import type {
  GetServicesQuery,
  GetServicesResponse,
  SearchServicesQuery,
  SearchServicesResponse,
  GetServicesGroupedQuery,
  GetServicesGroupedByCategoryResponse,
  GetServicesGroupedByDepartmentResponse,
  GetServicesByCategoryQuery,
  GetServicesByCategoryResponse,
  GetServicesByDepartmentQuery,
  GetServicesByDepartmentResponse,
  GetServiceByIdResponse,
  GetServiceBySlugResponse,
  CreateServicePayload,
  CreateServiceResponse,
  UpdateServicePayload,
  UpdateServiceResponse,
  DeleteServiceResponse,
  ActivateServiceResponse,
  DeactivateServiceResponse,
} from "@/app/types/service";
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
  tagTypes: [
    "Departments",
    "Users",
    "UserDetail",
    "UserCount",
    "Me",
    "FeaturedServiceRequest",
    "Services",
  ],
  endpoints: (build) => ({
    submitContact: build.mutation<ContactApiResponse, ContactApiPayload>({
      query: (body) => ({ url: "/contact", method: "POST", body }),
    }),
    getDepartments: build.query<GetDepartmentsResponse, void>({
      query: () => "/departments",
      providesTags: ["Departments"],
    }),

    // Public endpoints
    getFeaturedServiceRequest: build.query<
      GetFeaturedServiceRequestResponse,
      void
    >({
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

    // Service endpoints — public
    getServices: build.query<GetServicesResponse, GetServicesQuery | void>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params) {
          if (params.page != null)
            searchParams.set("page", String(params.page));
          if (params.limit != null)
            searchParams.set("limit", String(params.limit));
          if (params.includeInactive != null)
            searchParams.set("includeInactive", String(params.includeInactive));
        }
        const qs = searchParams.toString();
        return qs ? `/services?${qs}` : "/services";
      },
      providesTags: ["Services"],
    }),
    searchServices: build.query<SearchServicesResponse, SearchServicesQuery>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        searchParams.set("q", params.q);
        if (params.page != null) searchParams.set("page", String(params.page));
        if (params.limit != null)
          searchParams.set("limit", String(params.limit));
        return `/services/search?${searchParams.toString()}`;
      },
      providesTags: ["Services"],
    }),
    getServicesGroupedByCategory: build.query<
      GetServicesGroupedByCategoryResponse,
      GetServicesGroupedQuery | void
    >({
      query: (params) => {
        if (params?.limit != null) {
          return `/services/grouped/category?limit=${params.limit}`;
        }
        return "/services/grouped/category";
      },
      providesTags: ["Services"],
    }),
    getServicesGroupedByDepartment: build.query<
      GetServicesGroupedByDepartmentResponse,
      GetServicesGroupedQuery | void
    >({
      query: (params) => {
        if (params?.limit != null) {
          return `/services/grouped/department?limit=${params.limit}`;
        }
        return "/services/grouped/department";
      },
      providesTags: ["Services"],
    }),
    getServicesByCategory: build.query<
      GetServicesByCategoryResponse,
      GetServicesByCategoryQuery
    >({
      query: ({ categoryId, ...params }) => {
        const searchParams = new URLSearchParams();
        if (params.page != null) searchParams.set("page", String(params.page));
        if (params.limit != null)
          searchParams.set("limit", String(params.limit));
        const qs = searchParams.toString();
        return qs
          ? `/services/category/${categoryId}?${qs}`
          : `/services/category/${categoryId}`;
      },
      providesTags: ["Services"],
    }),
    getServicesByDepartment: build.query<
      GetServicesByDepartmentResponse,
      GetServicesByDepartmentQuery
    >({
      query: ({ departmentId, ...params }) => {
        const searchParams = new URLSearchParams();
        if (params.page != null) searchParams.set("page", String(params.page));
        if (params.limit != null)
          searchParams.set("limit", String(params.limit));
        const qs = searchParams.toString();
        return qs
          ? `/services/department/${departmentId}?${qs}`
          : `/services/department/${departmentId}`;
      },
      providesTags: ["Services"],
    }),
    getServiceById: build.query<GetServiceByIdResponse, string>({
      query: (id) => `/services/${id}`,
      providesTags: ["Services"],
    }),
    getServiceBySlug: build.query<GetServiceBySlugResponse, string>({
      query: (slug) => `/services/${slug}`,
      providesTags: ["Services"],
    }),

    // Service endpoints — admin mutations
    createService: build.mutation<CreateServiceResponse, CreateServicePayload>({
      query: (body) => ({ url: "/services", method: "POST", body }),
      invalidatesTags: ["Services"],
    }),
    updateService: build.mutation<
      UpdateServiceResponse,
      { id: string; body: UpdateServicePayload }
    >({
      query: ({ id, body }) => ({
        url: `/services/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Services"],
    }),
    deleteService: build.mutation<DeleteServiceResponse, string>({
      query: (id) => ({ url: `/services/${id}`, method: "DELETE" }),
      invalidatesTags: ["Services"],
    }),
    activateService: build.mutation<ActivateServiceResponse, string>({
      query: (id) => ({ url: `/services/${id}/activate`, method: "PATCH" }),
      invalidatesTags: ["Services"],
    }),
    deactivateService: build.mutation<DeactivateServiceResponse, string>({
      query: (id) => ({ url: `/services/${id}/deactivate`, method: "PATCH" }),
      invalidatesTags: ["Services"],
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
  useGetServicesQuery,
  useSearchServicesQuery,
  useGetServicesGroupedByCategoryQuery,
  useGetServicesGroupedByDepartmentQuery,
  useGetServicesByCategoryQuery,
  useGetServicesByDepartmentQuery,
  useGetServiceByIdQuery,
  useGetServiceBySlugQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useActivateServiceMutation,
  useDeactivateServiceMutation,
} = api;
