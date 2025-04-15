import { memo } from "react";
import AuthProvider from "./context/auth-provider";
import AppRoutes from "./routes";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default memo(App);
