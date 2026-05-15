import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";
import type { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isLoggedIn = useAppSelector(
    (state) => state.auth.isLoggedIn
  );

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;