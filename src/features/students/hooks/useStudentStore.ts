import { toast } from "sonner";
import { create } from "zustand";
import { studentService } from "../services/studentService";
import { Student, StudentFormData, StudentPagination } from "../types";

interface StudentState {
  loading: boolean;
  students: Student[];
  studentsPagination: StudentPagination;
  createStudent: (values: StudentFormData) => Promise<void>;
  getAllStudents: (page?: number) => Promise<void>;
  deleteStudent: (id: number) => Promise<void>;
  getStudentById: (id: number) => Promise<Student | null>;
  updateStudent: (id: number, student: Partial<Student>) => Promise<void>;
}

export const useStudentStore = create<StudentState>((set, get) => ({
  loading: false,
  students: [],
  studentsPagination: {
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 20,
    from: 0,
    to: 0,
  },

  createStudent: async (values: StudentFormData) => {
    set({ loading: true });
    try {
      const response = await studentService.createStudent(values);
      toast.success(response.message);
      get().getAllStudents();
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "An error occurred");
    } finally {
      set({ loading: false });
    }
  },

  getAllStudents: async (page = 1) => {
    if (get().loading) return;
    set({ loading: true });
    try {
      const response = await studentService.getAllStudents(page);
      set({ 
        students: response.data,
        studentsPagination: {
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

  deleteStudent: async (id: number) => {
    set({ loading: true });
    try {
      const response = await studentService.deleteStudent(id);
      toast.success(response.message);
      await get().getAllStudents();
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "An error occurred");
    } finally {
      set({ loading: false });
    }
  },

  getStudentById: async (id: number) => {
    try {
      const response = await studentService.getStudentById(id);
      return response;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "An error occurred");
      return null;
    }
  },

  updateStudent: async (id: number, student: Partial<Student>) => {
    try {
      const response = await studentService.updateStudent(id, student);
      toast.success(response.message);
      return response;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "An error occurred");
      throw error;
    }
  }
})); 