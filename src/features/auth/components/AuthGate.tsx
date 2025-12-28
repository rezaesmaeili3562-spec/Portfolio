import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type AuthGateProps = {
  children: React.ReactNode;
};

export const AuthGate = ({ children }: AuthGateProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
