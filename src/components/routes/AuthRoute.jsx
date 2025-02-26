import { Navigate, Outlet } from "react-router-dom";

export default function AuthRoute({ isAuthenticated }) {
  if (!isAuthenticated) {
    return <Navigate to="/not-authorized" replace />;
  }

  return <Outlet />;
}
