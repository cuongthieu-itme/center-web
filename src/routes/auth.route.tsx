import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

export default function AuthRoute() {
  const { user, loading } = useAuthStore();

  if (loading) return <h1>loading....</h1>;

  if (!user) return <Outlet />;

  return <Navigate to="dashboard/main-page" replace />;
}
