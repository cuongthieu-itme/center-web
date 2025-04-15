import { AxiosError } from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import axiosInstace from "../lib/axios";
import { PaginatedResponse, UserType } from "../types";
import { RegisterSchemaType } from "../validations/auth.schema";

interface initialState {
  loading: boolean;
  users: UserType[];
  usersPagination: {
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
    from: number;
    to: number;
  };
  createUser: (values: RegisterSchemaType) => void;
  getAllUsers: (page?: number) => void;
  deleteUser: (id: number) => void;
  updateRole: (id: number) => void;
}

export const useAdminStore = create<initialState>((set, get) => ({
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

  createUser: async ({
    email,
    password,
    name,
    role,
  }: RegisterSchemaType) => {
    set({ loading: true });

    try {
      const response = await axiosInstace.post("/users", {
        email,
        password,
        name,
        role,
      });
      if (response.status === 201) {
        toast.success(response.data.message);
        get().getAllUsers();
      }
    } catch (error: unknown) {
      set({ loading: false });
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message || "An error occured");
      } else {
        toast.error("An error occured");
      }
    }
  },
  getAllUsers: async (page = 1) => {
    if (get().loading) return;
    
    set({ loading: true });
    try {
      const response = await axiosInstace.get(`/users?page=${page}`);
      const paginatedData = response.data as PaginatedResponse<UserType>;
      
      set({ 
        users: paginatedData.data,
        usersPagination: {
          current_page: paginatedData.current_page,
          last_page: paginatedData.last_page,
          total: paginatedData.total,
          per_page: paginatedData.per_page,
          from: paginatedData.from,
          to: paginatedData.to,
        },
        loading: false
      });
    } catch (error: unknown) {
      set({ loading: false });
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message || "An error occured");
      } else {
        toast.error("An error occured");
      }
    }
  },
  deleteUser: async (id: number) => {
    set({ loading: true });

    try {
      const response = await axiosInstace.delete(`/admin/delete-user/${id}`);

      if (response.status === 200) {
        toast.success(response.data.message);
        get().getAllUsers();
      }
      set({ loading: false });
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
  updateRole: async (id: number) => {
    try {
      const response = await axiosInstace.put(`/admin/update-role/${id}`);
      if (response.status === 200) {
        toast.success(response.data.message);
        get().getAllUsers();
      }
    } catch (error: unknown) {
      set({ loading: false });
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message || "An error occured");
      } else {
        toast.error("An error occured");
      }
    }
  },
}));
