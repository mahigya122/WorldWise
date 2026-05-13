import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";

const ProtectedRoute = ({ children }: any) => {
  const isLoggedIn = useAppSelector(
    (state) => state.auth.isLoggedIn
  );

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;