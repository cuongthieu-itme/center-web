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
  updateTeacher: (id: number, teacher: Partial<Teacher | any>) => Promise<void>;
  myStudents: any[];
  myStudentsPagination: {
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
    from: number;
    to: number;
  };
  getMyStudents: (page?: number) => Promise<void>;
  myClasses: any[];
  myClassesPagination: {
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
    from: number;
    to: number;
  };
  getMyClasses: (page?: number) => Promise<void>;
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
  myStudents: [],
  myStudentsPagination: {
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 20,
    from: 0,
    to: 0,
  },
  myClasses: [],
  myClassesPagination: {
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
  },

  getMyStudents: async (page = 1) => {
    set({ loading: true });
    try {
      const response = await teacherService.getMyStudents(page);
      const students = response.students;
      set({ 
        myStudents: students.data,
        myStudentsPagination: {
          current_page: students.current_page,
          last_page: students.last_page,
          total: students.total,
          per_page: students.per_page,
          from: students.from,
          to: students.to,
        }
      });
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string }, status?: number } };
      if (err?.response?.status === 403) {
        toast.error("Bạn không có quyền truy cập tính năng này");
      } else {
        toast.error(err?.response?.data?.message || "Có lỗi xảy ra khi tải dữ liệu");
      }
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  getMyClasses: async (page = 1) => {
    set({ loading: true });
    try {
      const response = await teacherService.getMyClasses(page);
      set({ 
        myClasses: response.data,
        myClassesPagination: {
          current_page: response.current_page,
          last_page: response.last_page,
          total: response.total,
          per_page: response.per_page,
          from: response.from,
          to: response.to,
        }
      });
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string }, status?: number } };
      if (err?.response?.status === 403) {
        toast.error("Bạn không có quyền truy cập tính năng này");
      } else {
        toast.error(err?.response?.data?.message || "Có lỗi xảy ra khi tải dữ liệu");
      }
      throw error;
    } finally {
      set({ loading: false });
    }
  }
})); 