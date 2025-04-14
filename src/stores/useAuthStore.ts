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
  checkAuth: () => void;
  logout: () => void;
}

export const useAuthStore = create<initialState>((set) => ({
  user: null,
  token: null,
  loading: false,
  isAuth: true,

  login: async ({ email, password }: LoginSchemaType) => {
    set({ loading: true });

    try {
      const response = await axiosInstace.post("/auth/login", {
        email,
        password,
      });

      const { user, token } = response.data;

      // Store token in localStorage
      if (token) {
        localStorage.setItem("auth_token", token);
        axiosInstace.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }

      set({ user, token, loading: false });
      toast.success("Login successful");
    } catch (error: unknown) {
      set({ loading: false });
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message || "An error occured");
      } else {
        toast.error("An error occured");
      }
    } finally {
      set({ loading: false });
    }
  },

  checkAuth: async () => {
    set({ isAuth: true });
    try {
      // Get token from localStorage
      const token = localStorage.getItem("auth_token");

      if (token) {
        axiosInstace.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axiosInstace.get("/auth/verify-auth");
        set({ user: response.data.data, token, isAuth: true });
      } else {
        set({ isAuth: false, user: null, token: null });
      }
    } catch (error) {
      set({ isAuth: false, user: null, token: null });
      if (error instanceof AxiosError) {
        return;
      }
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await axiosInstace.post("/auth/logout");

      // Remove token from localStorage and axios headers
      localStorage.removeItem("auth_token");
      delete axiosInstace.defaults.headers.common['Authorization'];

      set({ user: null, token: null, loading: false });
    } catch (error) {
      if (error instanceof AxiosError) {
        return;
      }
    } finally {
      set({ loading: false });
    }
  },
}));
