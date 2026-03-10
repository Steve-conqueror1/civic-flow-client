import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type {
  ContactApiPayload,
  ContactApiResponse,
} from "@/app/types/contact";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  }),
  reducerPath: "api",
  tagTypes: [],
  endpoints: (build) => ({
    submitContact: build.mutation<ContactApiResponse, ContactApiPayload>({
      query: (body) => ({ url: "/contact", method: "POST", body }),
    }),
  }),
});

export const { useSubmitContactMutation } = api;
