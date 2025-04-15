import axiosInstance from "@/lib/axios";
import { User, UserFormData } from "../types";

export const userService = {
  getAllUsers: async (page: number = 1) => {
    const response = await axiosInstance.get(`/users?page=${page}`);
    return response.data;
  },

  getUserById: async (id: number) => {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
  },

  createUser: async (userData: UserFormData) => {
    const response = await axiosInstance.post("/users", userData);
    return response.data;
  },

  updateUser: async (id: number, userData: Partial<User>) => {
    const response = await axiosInstance.put(`/users/${id}`, userData);
    return response.data;
  },

  deleteUser: async (id: number) => {
    const response = await axiosInstance.delete(`/admin/delete-user/${id}`);
    return response.data;
  },

  updateRole: async (id: number) => {
    const response = await axiosInstance.put(`/admin/update-role/${id}`);
    return response.data;
  }
}; 