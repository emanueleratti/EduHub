import { useAtom } from "jotai";
import { authAtom } from "../src/stateManager/authAtom";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const ProtectedRoute = () => {
  const [auth] = useAtom(authAtom);
  const location = useLocation();

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
