import { http } from "../../../api/http";
import type { User } from "../../../shared/types/users";

export type UsersResponse = {
  users: User[];
};

export const getUsers = async (): Promise<UsersResponse> => {
  const response = await http.get<UsersResponse>("/users");
  return response.data;
};

export const getUser = async (userId: string): Promise<User | undefined> => {
  const response = await http.get<{ user: User | undefined }>(`/users/${userId}`);
  return response.data.user;
};
