import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type {
  EditableUser,
  GetUsersParams,
  NewUser,
  User,
  UsersResponse,
} from "@/types/usersTypes";
import { stripNullableValues } from "@/utils/stripNullableValues";

const host = process.env.NEXT_PUBLIC_API_HOST;
const port = process.env.NEXT_PUBLIC_API_PORT;
const protocol = process.env.NEXT_PUBLIC_API_PROTOCOL;

const baseUrl = `${protocol}://${host}:${port}`;

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getUsers: builder.query<UsersResponse, GetUsersParams | void>({
      query: (params) => {
        const cleanedValues = stripNullableValues(
          params as Record<string, unknown> | undefined
        );

        return {
          url: "/users",
          params: cleanedValues,
        };
      },
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map((u) => ({
                type: "Users" as const,
                id: u.user_id,
              })),
              { type: "Users" as const, id: "LIST" },
            ]
          : [{ type: "Users" as const, id: "LIST" }],
    }),

    getSingleUser: builder.query<User, string>({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, id) => [{ type: "Users", id }],
    }),

    createUser: builder.mutation<User, NewUser>({
      query: (newUser) => ({
        url: "/users",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),

    updateUser: builder.mutation<User, { id: string; data: EditableUser }>({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) =>
        result
          ? [
              { type: "Users", id },
              { type: "Users", id: "LIST" },
            ]
          : [{ type: "Users", id: "LIST" }],
    }),

    deleteUser: builder.mutation<{ success: boolean; id?: string }, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) =>
        result?.success
          ? [
              { type: "Users", id },
              { type: "Users", id: "LIST" },
            ]
          : [{ type: "Users", id: "LIST" }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useGetSingleUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
