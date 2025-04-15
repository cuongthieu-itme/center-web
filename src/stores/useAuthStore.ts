import { AxiosError } from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import axiosInstace from "../lib/axios";
import { UserType } from "../types";
import { LoginSchemaType } from "../validations/auth.schema";

interface initialState {
  user: UserType | null;
  token: string | null;
  loading: boolean;
  isAuth: boolean;
  login: (values: LoginSchemaType) => void;
  checkAuth: () => Promise<boolean>;
  logout: () => void;
}

// Initialize state from localStorage if available
const getInitialState = () => {
  const token = localStorage.getItem("token");
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;
  
  return {
    user,
    token,
    loading: false,
    isAuth: !!token && !!user,
  };
};

export const useAuthStore = create<initialState>((set) => ({
  ...getInitialState(),

  login: async ({ email, password }: LoginSchemaType) => {
    set({ loading: true });

    try {
      const response = await axiosInstace.post("/auth/login", {
        email,
        password,
      });

      const { user, token } = response.data;

      // Store token and user in localStorage
      if (token && user) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        axiosInstace.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }

      set({ user, token, loading: false, isAuth: true });
      toast.success("Login successful");
    } catch (error: unknown) {
      set({ loading: false, isAuth: false });
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message || "An error occurred");
      } else {
        toast.error("An error occurred");
      }
    } finally {
      set({ loading: false });
    }
  },

  checkAuth: async () => {
    set({ loading: true });
    try {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");
      const user = userStr ? JSON.parse(userStr) : null;

      if (!token || !user) {
        set({ isAuth: false, user: null, token: null, loading: false });
        return false;
      }
      
      axiosInstace.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      const response = await axiosInstace.get("/auth/verify-auth");
      
      // If we get a successful response (status 200), keep the current state
      if (response.status === 200) {
        set({ isAuth: true, loading: false });
        return true;
      }
      
      // If we get here, something went wrong with the verification
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      delete axiosInstace.defaults.headers.common['Authorization'];
      set({ isAuth: false, user: null, token: null, loading: false });
      return false;
    } catch (error) {
      // Only clear localStorage if it's an authentication error
      if (error instanceof AxiosError && error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        delete axiosInstace.defaults.headers.common['Authorization'];
        set({ isAuth: false, user: null, token: null, loading: false });
      } else {
        // For other errors, keep the current state
        set({ loading: false });
      }
      return false;
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await axiosInstace.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      delete axiosInstace.defaults.headers.common['Authorization'];
      set({ user: null, token: null, loading: false, isAuth: false });
    }
  },
}));
