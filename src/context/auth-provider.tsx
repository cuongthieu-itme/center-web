import { createContext, useEffect } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { UserType } from "../types";

type AuthContextType = {
  user: UserType | null;
  isAuth: boolean;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export default function AuthProvider({ children }: AuthProviderProps) {
  const { checkAuth, user, isAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <AuthContext.Provider value={{ user, isAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
