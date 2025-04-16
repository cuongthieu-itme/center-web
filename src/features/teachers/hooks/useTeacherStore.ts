import { toast } from "sonner";
import { create } from "zustand";
import { teacherService } from "../services/teacherService";
import { Teacher, TeacherDetail, TeacherFormData, TeacherPagination } from "../types";

interface TeacherState {
  loading: boolean;
  teachers: Teacher[];
  teachersPagination: TeacherPagination;
  createTeacher: (values: TeacherFormData) => Promise<void>;
  getAllTeachers: (page?: number) => Promise<void>;
  deleteTeacher: (id: number) => Promise<void>;
  getTeacherById: (id: number) => Promise<TeacherDetail | null>;
  updateTeacher: (id: number, teacher: Partial<Teacher>) => Promise<void>;
}

export const useTeacherStore = create<TeacherState>((set, get) => ({
  loading: false,
  teachers: [],
  teachersPagination: {
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 20,
    from: 0,
    to: 0,
  },

  createTeacher: async (values: TeacherFormData) => {
    set({ loading: true });
    try {
      const response = await teacherService.createTeacher(values);
      toast.success(response.message);
      get().getAllTeachers();
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "An error occurred");
    } finally {
      set({ loading: false });
    }
  },

  getAllTeachers: async (page = 1) => {
    if (get().loading) return;
    set({ loading: true });
    try {
      const response = await teacherService.getAllTeachers(page);
      set({ 
        teachers: response.data,
        teachersPagination: {
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

  deleteTeacher: async (id: number) => {
    set({ loading: true });
    try {
      const response = await teacherService.deleteTeacher(id);
      toast.success(response.message);
      await get().getAllTeachers();
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "An error occurred");
    } finally {
      set({ loading: false });
    }
  },

  getTeacherById: async (id: number) => {
    try {
      const response = await teacherService.getTeacherById(id);
      return response;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "An error occurred");
      return null;
    }
  },

  updateTeacher: async (id: number, teacher: Partial<Teacher>) => {
    try {
      const response = await teacherService.updateTeacher(id, teacher);
      toast.success(response.message);
      return response;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "An error occurred");
      throw error;
    }
  }
})); 