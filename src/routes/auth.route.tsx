import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import LoadingSpinner from "../components/shared/loading-spinner";
import { AUTH_ROUTES, PROTECTED_ROUTES } from "./common/routesPath";

export default function AuthRoute() {
  const { user, isAuth, loading } = useAuthStore();

  if (loading) return <LoadingSpinner />;

  // For the root path or auth routes
  // If authenticated, redirect to dashboard
  if (isAuth && user) {
    return <Navigate to={PROTECTED_ROUTES.DASHBOARD} replace />;
  }

  // If not on login page and not authenticated, redirect to login
  const isLoginPage = window.location.pathname === AUTH_ROUTES.LOGIN;
  if (!isLoginPage && !isAuth) {
    return <Navigate to={AUTH_ROUTES.LOGIN} replace />;
  }

  // Otherwise, show the requested auth route
  return <Outlet />;
}
