import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import LoadingSpinner from "../components/shared/loading-spinner";
import { AUTH_ROUTES } from "./common/routesPath";

export default function ProtectedRoute() {
  const { user, isAuth, loading } = useAuthStore();
  // Show loading spinner while checking authentication
  if (loading) return <LoadingSpinner />;

  // If not authenticated or no user data, redirect to login
  if (!isAuth || !user) {
    console.log("Protected route: Not authenticated, redirecting to login");
    return <Navigate to={AUTH_ROUTES.LOGIN} replace />;
  }

  // User is authenticated, render the protected content
  console.log("Protected route: User authenticated, rendering content");
  return <Outlet />;
}
