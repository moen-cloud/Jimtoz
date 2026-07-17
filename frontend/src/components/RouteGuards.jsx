import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export const RequireAuth = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

export const RequireAdmin = ({ children }) => {
  const { user } = useAuth();
  if (!user || user.role !== "admin") return <Navigate to="/login" replace />;
  return children;
};
