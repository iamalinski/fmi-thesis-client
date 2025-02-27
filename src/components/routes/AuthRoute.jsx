import { Navigate, Outlet } from "react-router-dom";

// components
import Layout from "@components/app/Layout";

export default function AuthRoute({ isAuthenticated }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
