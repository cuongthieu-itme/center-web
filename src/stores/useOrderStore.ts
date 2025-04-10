import { AxiosError } from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import axiosInstace from "../lib/axios";
import { CreateOrderType, OrderType } from "../types";

interface initialState {
  loading: boolean;
  getAllOrders: () => void;
  orders: OrderType[];
  updateOrderStatus: (
    orderId: number,
    status: "PENDING" | "COMPLETED" | "CANCELLED"
  ) => void;
  getAllOrderForManager: () => void;
  createOrder: ({ totalAmount, items }: CreateOrderType) => void;
  updateOrders: (id: number, managerId: number, username: string) => void;
}

export const useOrderStore = create<initialState>((set) => ({
  loading: false,
  orders: [],
  updateOrderStatus: (orderId, status) => {
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      ),
    }));
  },
  getAllOrders: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstace.get(`/order/all-orders`);
      set({ orders: response.data.data, loading: false });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message || "An error occured");
      } else {
        toast.error("An error occured");
      }
    }
  },
  getAllOrderForManager: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstace.get(`/order/all-orders-assigned`);
      set({ orders: response.data.data, loading: false });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message || "An error occured");
      } else {
        toast.error("An error occured");
      }
    }
  },
  createOrder: async ({ totalAmount, items }: CreateOrderType) => {
    set({ loading: true });
    try {
      await axiosInstace.post(`/order/create-order`, {
        totalAmount,
        items,
      });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message || "An error occured");
      } else {
        toast.error("An error occured");
      }
    }
  },
  updateOrders: (id: number, managerId: number, username: string) => {
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === id
          ? {
              ...order,
              managerId,
              manager: {
                ...order.manager,
                username,
              },
            }
          : order
      ),
    }));
  },
}));
