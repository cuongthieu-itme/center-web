import { memo } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./context/auth-provider";
import AppRoutes from "./routes";

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default memo(App);
