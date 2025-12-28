import React from "react";
import { login, type LoginPayload } from "../api/authApi";
import { storageKeys } from "../../../shared/constants/storageKeys";

type AuthState = {
  token: string | null;
  userName: string | null;
};

const defaultState: AuthState = {
  token: null,
  userName: null,
};

const readAuthState = (): AuthState => {
  if (typeof window === "undefined") {
    return defaultState;
  }

  const raw = window.localStorage.getItem(storageKeys.auth);
  if (!raw) {
    return defaultState;
  }

  try {
    return JSON.parse(raw) as AuthState;
  } catch {
    return defaultState;
  }
};

export const useAuth = () => {
  const [state, setState] = React.useState<AuthState>(readAuthState);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const loginUser = async (payload: LoginPayload) => {
    setLoading(true);
    setError(null);
    try {
      const response = await login(payload);
      const nextState: AuthState = { token: response.token, userName: response.user.name };
      setState(nextState);
      window.localStorage.setItem(storageKeys.auth, JSON.stringify(nextState));
      return response;
    } catch {
      setError("ورود ناموفق بود. دوباره تلاش کنید.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setState(defaultState);
    window.localStorage.removeItem(storageKeys.auth);
  };

  return {
    state,
    loginUser,
    logout,
    loading,
    error,
    isAuthenticated: Boolean(state.token),
  };
};
