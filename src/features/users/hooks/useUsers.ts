import React from "react";
import { getUsers } from "../api/usersApi";
import type { User } from "../../../shared/types/users";

export const useUsers = () => {
  const [users, setUsers] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getUsers();
      setUsers(response.users);
    } catch {
      setError("دریافت کاربران با خطا مواجه شد.");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  return { users, loading, error, reload: load };
};
