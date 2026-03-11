import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type {
  ContactApiPayload,
  ContactApiResponse,
} from "@/app/types/contact";
import type { GetDepartmentsResponse } from "@/app/types/department";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  }),
  reducerPath: "api",
  tagTypes: ["Departments"],
  endpoints: (build) => ({
    submitContact: build.mutation<ContactApiResponse, ContactApiPayload>({
      query: (body) => ({ url: "/contact", method: "POST", body }),
    }),
    getDepartments: build.query<GetDepartmentsResponse, void>({
      query: () => "/departments",
      providesTags: ["Departments"],
    }),
  }),
});

export const { useSubmitContactMutation, useGetDepartmentsQuery } = api;
