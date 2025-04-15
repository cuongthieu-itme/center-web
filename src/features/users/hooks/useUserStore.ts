import { toast } from "sonner";
import { create } from "zustand";
import { userService } from "../services/userService";
import { User, UserFormData, UserPagination } from "../types";

interface UserState {
  loading: boolean;
  users: User[];
  usersPagination: UserPagination;
  createUser: (values: UserFormData) => Promise<void>;
  getAllUsers: (page?: number) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  updateRole: (id: number) => Promise<void>;
  getUserById: (id: number) => Promise<User | null>;
  updateUser: (id: number, user: Partial<User>) => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  loading: false,
  users: [],
  usersPagination: {
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 20,
    from: 0,
    to: 0,
  },

  createUser: async (values: UserFormData) => {
    set({ loading: true });
    try {
      const response = await userService.createUser(values);
      toast.success(response.message);
      get().getAllUsers();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "An error occurred");
    } finally {
      set({ loading: false });
    }
  },

  getAllUsers: async (page = 1) => {
    if (get().loading) return;
    set({ loading: true });
    try {
      const response = await userService.getAllUsers(page);
      set({ 
        users: response.data,
        usersPagination: {
          current_page: response.current_page,
          last_page: response.last_page,
          total: response.total,
          per_page: response.per_page,
          from: response.from,
          to: response.to,
        },
      });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "An error occurred");
    } finally {
      set({ loading: false });
    }
  },

  deleteUser: async (id: number) => {
    set({ loading: true });
    try {
      const response = await userService.deleteUser(id);
      toast.success(response.message);
      get().getAllUsers();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "An error occurred");
    } finally {
      set({ loading: false });
    }
  },

  updateRole: async (id: number) => {
    try {
      const response = await userService.updateRole(id);
      toast.success(response.message);
      get().getAllUsers();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  },

  getUserById: async (id: number) => {
    try {
      const response = await userService.getUserById(id);
      return response;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "An error occurred");
      return null;
    }
  },

  updateUser: async (id: number, user: Partial<User>) => {
    try {
      const response = await userService.updateUser(id, user);
      toast.success(response.message);
      return response;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "An error occurred");
      throw error;
    }
  }
})); 