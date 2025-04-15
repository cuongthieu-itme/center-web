import { EditUser, UserDetail, UserList } from "@/features/users";
import { lazy } from "react";
import { AUTH_ROUTES, PROTECTED_ROUTES } from "./routesPath";

const LoginPage = lazy(() => import("../../pages/auth/login-page"));
const DashboardPage = lazy(
  () => import("../../pages/dashboard/dashboard-page")
);
const OrdersListPage = lazy(
  () => import("../../pages/dashboard/orders-list-page")
);

export const authenticationRoutes = [
  { path: AUTH_ROUTES.LOGIN, element: <LoginPage /> },
];

export const protectedRoutes = [
  { path: PROTECTED_ROUTES.DASHBOARD, element: <DashboardPage /> },
  { path: PROTECTED_ROUTES.USERS_LIST, element: <UserList /> },
  { path: PROTECTED_ROUTES.USERS_DETAIL, element: <UserDetail /> },
  { path: PROTECTED_ROUTES.USERS_EDIT, element: <EditUser /> },
  { path: PROTECTED_ROUTES.ORDERS_LIST, element: <OrdersListPage /> },
];
