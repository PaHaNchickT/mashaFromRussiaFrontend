import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { Stats } from "@/types/statsTypes";
import { prepareHeaders } from "@/utils/prepareHeaders";

const host = process.env.NEXT_PUBLIC_API_HOST;
const port = process.env.NEXT_PUBLIC_API_PORT;
const protocol = process.env.NEXT_PUBLIC_API_PROTOCOL;

const baseUrl = `${protocol}://${host}:${port}`;

export const statsApi = createApi({
  reducerPath: "statsApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: async (headers) => prepareHeaders(headers),
  }),
  endpoints: (builder) => ({
    getStats: builder.query<Stats, void>({
      query: () => "/stats",
    }),
  }),
});

export const { useGetStatsQuery } = statsApi;
