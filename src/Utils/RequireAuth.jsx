import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./Auth";

export const RequireAuth = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  if (!auth.user) {
    return <Navigate to={"/Error"} state={{ path: location.pathname }} />;
  }
  return children;
};

export const RequireAdminAuth = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  if (!auth.user || auth.user.role !== "Admin") {
    return <Navigate to={"/Error"} state={{ path: location.pathname }} />;
  }
  return children;
};
