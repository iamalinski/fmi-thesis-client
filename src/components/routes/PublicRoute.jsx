import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute({ isAuthenticated }) {
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}