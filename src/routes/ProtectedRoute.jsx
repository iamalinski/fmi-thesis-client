import { Navigate, Outlet } from "react-router-dom";
import Layout from "../components/app/Layout";
import { useAuth } from "../contexts/AuthContext"; // Assuming you have an auth context

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
