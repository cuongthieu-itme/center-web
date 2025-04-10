import { AxiosError } from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import axiosInstace from "../lib/axios";
import { UserType } from "../types";
import { LoginSchemaType } from "../validations/auth.schema";

interface initialState {
  user: UserType | null;
  loading: boolean;
  isAuth: boolean;
  login: (values: LoginSchemaType) => void;
  checkAuth: () => void;
  logout: () => void;
}

export const useAuthStore = create<initialState>((set) => ({
  user: null,
  loading: false,
  isAuth: true,

  login: async ({ email, password }: LoginSchemaType) => {
    set({ loading: true });

    try {
      const response = await axiosInstace.post("/auth/login", {
        email,
        password,
      });
      set({ user: response.data.data, loading: false });
      toast.success(response.data.message);
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
      const response = await axiosInstace.get("/auth/verify-auth");
      set({ user: response.data.data, isAuth: false });
    } catch (error) {
      set({ isAuth: false, user: null });
      if (error instanceof AxiosError) {
        return;
      }
    } finally {
      set({ isAuth: false });
    }
  },
  logout: async () => {
    set({ loading: true });
    try {
      await axiosInstace.get("/auth/logout");
      set({ user: null, loading: false });
    } catch (error) {
      if (error instanceof AxiosError) {
        return;
      }
    } finally {
      set({ loading: false });
    }
  },
}));
