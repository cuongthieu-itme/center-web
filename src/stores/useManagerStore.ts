import { AxiosError } from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import axiosInstace from "../lib/axios";
import { UserType } from "../types";
import { useOrderStore } from "./useOrderStore";

interface initialState {
  loading: boolean;
  managers: UserType[];
  getAllManagers: () => void;
  assignBulk: (managerId: number) => void;
  unassignManager: (managerId: number, orderId: number) => void;
}

export const useManagerStore = create<initialState>((set, get) => ({
  loading: false,
  managers: [],
  getAllManagers: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstace.get("/order/all-managers");
      set({ managers: response.data.data, loading: false });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message || "An error occured");
      } else {
        toast.error("An error occured");
      }
    }
  },
  assignBulk: async (managerId: number) => {
    set({ loading: true });
    try {
      const response = await axiosInstace.post("/order/assign-all-orders", {
        managerId,
      });
      set({ loading: false });
      toast.success(response.data.message);
      // Trigger getAllOrders from useOrderStore after successful bulk assignment
      const { getAllOrders } = useOrderStore.getState();
      await getAllOrders();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message || "An error occured");
      } else {
        toast.error("An error occured");
      }
    }
  },
  unassignManager: async (managerId: number, orderId: number) => {
    set({ loading: true });
    try {
      const response = await axiosInstace.put(
        `/order/unassignManager/${orderId}/${managerId}`
      );
      set({ loading: false });
      toast.success(response.data.message);
      const { getAllOrders } = useOrderStore.getState();
      await getAllOrders();
      get().getAllManagers();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message || "An error occured");
      } else {
        toast.error("An error occured");
      }
    }
  },
}));
