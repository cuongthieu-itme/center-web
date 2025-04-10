import { AxiosError } from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import axiosInstace from "../lib/axios";
import { ProductType } from "../types";
import { RegisterSchemaType } from "../validations/auth.schema";
import { productSchemaType } from "../validations/product.schema";

interface initialState {
  loading: boolean;
  users: [];
  products: ProductType[];
  createUser: (values: RegisterSchemaType) => void;
  getAllUsers: () => void;
  deleteUser: (id: number) => void;
  updateRole: (id: number) => void;
  createProduct: (values: productSchemaType) => void;
  getallProducts: () => void;
  deleteProduct: (id: number) => void;
  updateStock: (id: number, stock: number) => void;
}

export const useAdminStore = create<initialState>((set, get) => ({
  loading: false,
  users: [],
  products: [],

  createUser: async ({
    email,
    password,
    username,
    role,
  }: RegisterSchemaType) => {
    set({ loading: true });

    try {
      const response = await axiosInstace.post("/admin/create-user", {
        email,
        password,
        username,
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
  getAllUsers: async () => {
    try {
      const response = await axiosInstace.get("/admin/view-all-users");
      set({ users: response.data.data });
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
  createProduct: async ({
    name,
    description,
    stock,
    price,
  }: productSchemaType) => {
    set({ loading: true });

    try {
      const response = await axiosInstace.post("/admin/create-product", {
        name,
        description,
        stock: parseInt(stock),
        price: parseInt(price),
      });
      if (response.status === 201) {
        toast.success(response.data.message);
        get().getallProducts();
      }
    } catch (error: unknown) {
      console.log(error);
      set({ loading: false });
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message || "An error occured");
      } else {
        toast.error("An error occured");
      }
    }
  },
  deleteProduct: async (id: number) => {
    try {
      const response = await axiosInstace.delete(`/admin/delete-product/${id}`);
      if (response.status === 200) {
        toast.success(response.data.message);
        get().getallProducts();
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message || "An error occured");
      } else {
        toast.error("An error occured");
      }
    }
  },
  getallProducts: async () => {
    try {
      const response = await axiosInstace.get(`/admin/all-products`);
      set({ products: response.data.data });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message || "An error occured");
      } else {
        toast.error("An error occured");
      }
    }
  },
  updateStock: (id: number, stock: number) => {
    set((state) => ({
      products: state.products.map((product) =>
        product.id === id ? { ...product, stock } : product
      ),
    }));
  },
}));
