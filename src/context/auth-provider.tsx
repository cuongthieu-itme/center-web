import { createContext, useEffect, useState } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { UserType } from "../types";

type AuthContextType = {
  user: UserType | null;
  isAuth: boolean;
  loading: boolean;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export default function AuthProvider({ children }: AuthProviderProps) {
  const { checkAuth, user, isAuth, loading } = useAuthStore();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth();
      setAuthChecked(true);
    };

    verifyAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuth, loading }}>
      {authChecked ? children : null}
    </AuthContext.Provider>
  );
}
