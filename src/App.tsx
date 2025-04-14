import AppRoutes from "./routes";
import AuthChecker from "./components/auth/auth-checker";

export default function App() {
  return (
    <>
      <AuthChecker />
      <AppRoutes />
    </>
  );
}
