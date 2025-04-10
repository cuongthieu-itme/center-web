import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

export default function ProtectedRoute() {
  const { user, loading } = useAuthStore();

  if (loading) return <h1>loading...</h1>;

  return user ? <Outlet /> : <Navigate to="/" replace />;
}
