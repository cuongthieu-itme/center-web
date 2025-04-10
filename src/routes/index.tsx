import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "../layouts/app.layout";
import NotFound from "../pages/not-found";
import AuthRoute from "./auth.route";
import { authenticationRoutes, protectedRoutes } from "./common/routes";
import ProtectedRoute from "./protected.route";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* if user is already logged in it will navigates to dashboard */}
        <Route path="/" element={<AuthRoute />}>
          {authenticationRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
        {/* Protected Route */}
        <Route path="/" element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            {protectedRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>
        </Route>
        {/* Catch-all for undefined routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
