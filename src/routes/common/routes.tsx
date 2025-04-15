import { lazy } from "react";
import { AUTH_ROUTES, PROTECTED_ROUTES } from "./routesPath";

const LoginPage = lazy(() => import("../../pages/auth/login-page"));
const DashboardPage = lazy(
  () => import("../../pages/dashboard/dashboard-page")
);
const OrdersListPage = lazy(
  () => import("../../pages/dashboard/orders-list-page")
);
const UserListPage = lazy(() => import("../../pages/dashboard/user-list-page"));
const UserDetailPage = lazy(() => import("../../pages/users/[id]"));

export const authenticationRoutes = [
  { path: AUTH_ROUTES.LOGIN, element: <LoginPage /> },
];

export const protectedRoutes = [
  { path: PROTECTED_ROUTES.DASHBOARD, element: <DashboardPage /> },
  { path: PROTECTED_ROUTES.USERS_LIST, element: <UserListPage /> },
  { path: PROTECTED_ROUTES.ORDERS_LIST, element: <OrdersListPage /> },
  { path: "/users/:id", element: <UserDetailPage /> },
];
