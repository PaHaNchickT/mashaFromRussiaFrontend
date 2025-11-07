import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type {
  GetWordsPraxisParams,
  PatchPraxis,
  Praxis,
  PraxisResponse,
} from "@/types/praxisTypes";
import { prepareHeaders } from "@/utils/prepareHeaders";
import { stripNullableValues } from "@/utils/stripNullableValues";

const host = process.env.NEXT_PUBLIC_API_HOST;
const port = process.env.NEXT_PUBLIC_API_PORT;
const protocol = process.env.NEXT_PUBLIC_API_PROTOCOL;

const baseUrl = `${protocol}://${host}:${port}`;

export const praxisApi = createApi({
  reducerPath: "praxisApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: async (headers) => prepareHeaders(headers),
  }),
  tagTypes: ["Words", "Praxis"],
  endpoints: (builder) => ({
    getPraxis: builder.query<PraxisResponse, GetWordsPraxisParams>({
      query: (params) => {
        const cleaned = stripNullableValues(
          params as Record<string, unknown> | undefined
        );
        return {
          url: "/praxis",
          params: cleaned,
        };
      },
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map((p) => ({
                type: "Praxis" as const,
                id: p.praxis_id,
              })),
              { type: "Praxis" as const, id: "LIST" },
            ]
          : [{ type: "Praxis" as const, id: "LIST" }],
    }),

    getPraxisById: builder.query<Praxis, string>({
      query: (id) => `/praxis/${id}`,
      providesTags: (result, error, id) => [{ type: "Praxis", id }],
    }),

    createPraxis: builder.mutation<Praxis, Praxis>({
      query: (newPraxis) => ({
        url: "/praxis",
        method: "POST",
        body: newPraxis,
      }),
      invalidatesTags: [{ type: "Praxis", id: "LIST" }],
    }),

    updatePraxis: builder.mutation<Praxis, { id: string; data: PatchPraxis }>({
      query: ({ id, data }) => ({
        url: `/praxis/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) =>
        result
          ? [
              { type: "Praxis", id },
              { type: "Praxis", id: "LIST" },
            ]
          : [{ type: "Praxis", id: "LIST" }],
    }),

    deletePraxis: builder.mutation<{ success?: boolean; id?: string }, string>({
      query: (id) => ({
        url: `/praxis/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) =>
        result?.success
          ? [
              { type: "Praxis", id: "LIST" },
              { type: "Praxis", id },
            ]
          : [{ type: "Praxis", id: "LIST" }],
    }),
  }),
});

export const {
  useGetPraxisQuery,
  useGetPraxisByIdQuery,
  useCreatePraxisMutation,
  useUpdatePraxisMutation,
  useDeletePraxisMutation,
} = praxisApi;
