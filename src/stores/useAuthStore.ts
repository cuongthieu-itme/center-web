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

export const useAuthStore = create<initialState>((set, get) => ({
  user: null,
  token: null,
  loading: false,
  isAuth: false,

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
        console.log("Token saved to localStorage and set in axios headers");
      }

      set({ user, token, loading: false, isAuth: true });
      toast.success("Login successful");
    } catch (error: unknown) {
      set({ loading: false, isAuth: false });
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
    console.log("Checking authentication...");
    set({ loading: true });
    try {
      // Get token from localStorage
      const token = localStorage.getItem("auth_token");
      console.log("Token from localStorage:", token ? "Token exists" : "No token found");

      if (!token) {
        console.log("No token found in localStorage, setting isAuth to false");
        set({ isAuth: false, user: null, token: null, loading: false });
        return false;
      }
      
      // Set token in axios headers before making the request
      axiosInstace.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      console.log("Authorization header set for verify-auth request");
      
      console.log("Calling /auth/verify-auth API...");
      const response = await axiosInstace.get("/auth/verify-auth");
      console.log("verify-auth response:", response.status, response.data);
      
      if (response.data && response.data.data) {
        console.log("Authentication successful, user data received");
        set({ user: response.data.data, token, isAuth: true, loading: false });
        return true;
      } else {
        console.log("Invalid response format from verify-auth API");
        localStorage.removeItem("auth_token");
        delete axiosInstace.defaults.headers.common['Authorization'];
        set({ isAuth: false, user: null, token: null, loading: false });
        return false;
      }
    } catch (error) {
      console.error("Error in checkAuth:", error);
      localStorage.removeItem("auth_token");
      delete axiosInstace.defaults.headers.common['Authorization'];
      set({ isAuth: false, user: null, token: null, loading: false });
      
      if (error instanceof AxiosError) {
        console.error("AxiosError details:", {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data
        });
        
        if (error.response?.status === 401) {
          console.log("Unauthorized: Token invalid or expired");
        }
      }
      return false;
    } finally {
      // Double check that the current state is consistent
      const currentState = get();
      console.log("Auth state after check:", { 
        isAuth: currentState.isAuth, 
        hasUser: !!currentState.user,
        hasToken: !!currentState.token,
        loading: currentState.loading
      });
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await axiosInstace.post("/auth/logout");
      console.log("Logout API call successful");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Always clear local data regardless of API success
      console.log("Clearing local auth data");
      localStorage.removeItem("auth_token");
      delete axiosInstace.defaults.headers.common['Authorization'];
      set({ user: null, token: null, loading: false, isAuth: false });
    }
  },
}))
