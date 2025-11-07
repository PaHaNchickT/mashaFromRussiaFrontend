import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { GetWordsPraxisParams } from "@/types/praxisTypes";
import type {
  Word,
  NewWord,
  PatchWord,
  GetWordsParams,
  WordsResponse,
  ImportWordsResponse,
} from "@/types/wordsTypes";
import { prepareHeaders } from "@/utils/prepareHeaders";
import { stripNullableValues } from "@/utils/stripNullableValues";

const host = process.env.NEXT_PUBLIC_API_HOST;
const port = process.env.NEXT_PUBLIC_API_PORT;
const protocol = process.env.NEXT_PUBLIC_API_PROTOCOL;

const baseUrl = `${protocol}://${host}:${port}`;

export const wordsApi = createApi({
  reducerPath: "wordsApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: async (headers) => prepareHeaders(headers),
  }),
  tagTypes: ["Words"],
  endpoints: (builder) => ({
    getWords: builder.query<WordsResponse, GetWordsParams | void>({
      query: (params) => {
        const cleanedValues = stripNullableValues(
          params as Record<string, unknown> | undefined
        );

        return {
          url: "/words",
          params: cleanedValues,
        };
      },
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map((w) => ({
                type: "Words" as const,
                id: w.word_id,
              })),
              { type: "Words" as const, id: "LIST" },
            ]
          : [{ type: "Words" as const, id: "LIST" }],
    }),

    createWord: builder.mutation<Word, NewWord>({
      query: (newWord) => ({
        url: "/words",
        method: "POST",
        body: newWord,
      }),
      invalidatesTags: [{ type: "Words", id: "LIST" }],
    }),

    getSingleWord: builder.query<Word, string>({
      query: (id) => `/words/${id}`,
      providesTags: (result, error, id) => [{ type: "Words", id }],
    }),

    updateWord: builder.mutation<Word, { id: string; data: PatchWord }>({
      query: ({ id, data }) => ({
        url: `/words/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) =>
        result
          ? [
              { type: "Words", id },
              { type: "Words", id: "LIST" },
            ]
          : [{ type: "Words", id: "LIST" }],
    }),

    deleteWord: builder.mutation<{ success: boolean; id?: string }, string>({
      query: (id) => ({
        url: `/words/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) =>
        result?.success
          ? [
              { type: "Words", id: "LIST" },
              { type: "Words", id },
            ]
          : [{ type: "Words", id: "LIST" }],
    }),

    deleteSeveralWords: builder.mutation<
      { success: boolean; wordIds?: string[] },
      string[]
    >({
      query: (wordIds) => ({
        url: "/words",
        method: "DELETE",
        body: { wordIds },
      }),
      invalidatesTags: (result, error, ids) =>
        result?.success
          ? [
              { type: "Words", id: "LIST" },
              ...ids.map((id) => ({ type: "Words" as const, id })),
            ]
          : [{ type: "Words", id: "LIST" }],
    }),

    importWords: builder.mutation<ImportWordsResponse, File | FormData>({
      query: (fileOrForm) => {
        const body =
          fileOrForm instanceof FormData
            ? fileOrForm
            : ((): FormData => {
                const fd = new FormData();
                fd.append("file", fileOrForm);
                return fd;
              })();

        return {
          url: "/words/import",
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "Words", id: "LIST" }],
    }),

    getWordsPraxis: builder.query<WordsResponse, GetWordsPraxisParams>({
      query: (params) => {
        const { rules } = params;
        const queryParams: Record<string, unknown> = {};

        if (Array.isArray(rules) && rules.length > 0) {
          queryParams.rules = JSON.stringify(rules);
        }

        return {
          url: "/words/praxis",
          params: queryParams,
        };
      },
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map((w) => ({
                type: "Words" as const,
                id: w.word_id,
              })),
              { type: "Words" as const, id: "LIST" },
            ]
          : [{ type: "Words" as const, id: "LIST" }],
    }),
  }),
});

export const {
  useGetWordsQuery,
  useCreateWordMutation,
  useGetSingleWordQuery,
  useUpdateWordMutation,
  useDeleteWordMutation,
  useDeleteSeveralWordsMutation,
  useImportWordsMutation,
  useGetWordsPraxisQuery,
} = wordsApi;
