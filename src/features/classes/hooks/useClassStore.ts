import { toast } from "sonner";
import { create } from "zustand";
import { classService } from "../services/classService";
import { Class, ClassFormData, ClassPagination } from "../types";

interface ClassState {
  loading: boolean;
  classes: Class[];
  classesPagination: ClassPagination;
  createClass: (values: ClassFormData) => Promise<void>;
  getAllClasses: (page?: number) => Promise<void>;
  deleteClass: (id: number) => Promise<void>;
  getClassById: (id: number) => Promise<Class | null>;
  updateClass: (id: number, classData: Partial<Class>) => Promise<void>;
}

export const useClassStore = create<ClassState>((set, get) => ({
  loading: false,
  classes: [],
  classesPagination: {
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 20,
    from: 0,
    to: 0,
  },

  createClass: async (values: ClassFormData) => {
    set({ loading: true });
    try {
      const response = await classService.createClass(values);
      toast.success(response.message);
      get().getAllClasses();
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "An error occurred");
    } finally {
      set({ loading: false });
    }
  },

  getAllClasses: async (page = 1) => {
    if (get().loading) return;
    set({ loading: true });
    try {
      const response = await classService.getAllClasses(page);
      set({ 
        classes: response.data,
        classesPagination: {
          current_page: response.current_page,
          last_page: response.last_page,
          total: response.total,
          per_page: response.per_page,
          from: response.from,
          to: response.to,
        },
      });
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "An error occurred");
    } finally {
      set({ loading: false });
    }
  },

  deleteClass: async (id: number) => {
    set({ loading: true });
    try {
      const response = await classService.deleteClass(id);
      toast.success(response.message);
      await get().getAllClasses();
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "An error occurred");
    } finally {
      set({ loading: false });
    }
  },

  getClassById: async (id: number) => {
    try {
      const response = await classService.getClassById(id);
      return response;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "An error occurred");
      return null;
    }
  },

  updateClass: async (id: number, classData: Partial<Class>) => {
    try {
      const response = await classService.updateClass(id, classData);
      toast.success(response.message);
      return response;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "An error occurred");
      throw error;
    }
  }
})); 