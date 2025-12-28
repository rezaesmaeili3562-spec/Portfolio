import { http } from "../../../api/http";

export type LoginPayload = {
  username: string;
  password: string;
  remember?: boolean;
};

export type LoginResponse = {
  token: string;
  user: { name: string };
};

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await http.post<LoginResponse>("/auth/login", payload);
  return response.data;
};
