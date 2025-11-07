import type { ResponseMetaData } from "./commonTypes";

export type User = {
  user_id: string;
  email: string;
  user_password: string;
  user_name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  daily_limit: number;
};

export type UsersResponse = {
  data: User[];
  meta: ResponseMetaData;
};

export type NewUser = Pick<User, "email" | "user_password" | "user_name">;

export type EditableUser = Partial<
  Pick<
    User,
    "email" | "user_password" | "user_name" | "is_active" | "daily_limit"
  >
>;

export type GetUsersParams = {
  limit?: number;
  offset?: number;
  user_name?: string;
};
