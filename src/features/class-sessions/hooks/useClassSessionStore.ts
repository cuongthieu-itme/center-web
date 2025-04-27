import { toast } from "sonner";
import { create } from "zustand";
import { classSessionService } from "../services/classSessionService";
import { ClassSession, ClassSessionFormData, ClassSessionPagination } from "../types";

interface ClassSessionState {
  loading: boolean;
  classSessions: ClassSession[];
  classSessionsPagination: ClassSessionPagination;
  createClassSession: (values: ClassSessionFormData) => Promise<void>;
  getAllClassSessions: (page?: number) => Promise<void>;
  getClassSessionsByClassId: (classId: number, page?: number) => Promise<void>;
  deleteClassSession: (id: number) => Promise<void>;
  getClassSessionById: (id: number) => Promise<ClassSession | null>;
  updateClassSession: (id: number, sessionData: Partial<ClassSession>) => Promise<void>;
}

export const useClassSessionStore = create<ClassSessionState>((set, get) => ({
  loading: false,
  classSessions: [],
  classSessionsPagination: {
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 20,
    from: 0,
    to: 0,
  },

  createClassSession: async (values: ClassSessionFormData) => {
    set({ loading: true });
    try {
      const response = await classSessionService.createClassSession(values);
      toast.success(response.message);
      get().getAllClassSessions();
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "An error occurred");
    } finally {
      set({ loading: false });
    }
  },

  getAllClassSessions: async (page = 1) => {
    if (get().loading) return;
    set({ loading: true });
    try {
      const response = await classSessionService.getAllClassSessions(page);
      set({
        classSessions: response.data,
        classSessionsPagination: {
          current_page: response.current_page,
          last_page: response.last_page,
          total: response.total,
          per_page: response.per_page,
          from: response.from,
          to: response.to,
        },
      });
    } catch (error: unknown) {
      toast.error("Không thể tải danh sách buổi học");
    } finally {
      set({ loading: false });
    }
  },

  getClassSessionsByClassId: async (classId: number, page = 1) => {
    if (get().loading) return;
    set({ loading: true });
    try {
      const response = await classSessionService.getClassSessionsByClassId(classId, page);
      set({
        classSessions: response.data,
        classSessionsPagination: {
          current_page: response.current_page,
          last_page: response.last_page,
          total: response.total,
          per_page: response.per_page,
          from: response.from,
          to: response.to,
        },
      });
    } catch (error: unknown) {
      toast.error("Không thể tải danh sách buổi học của lớp");
    } finally {
      set({ loading: false });
    }
  },

  deleteClassSession: async (id: number) => {
    set({ loading: true });
    try {
      const response = await classSessionService.deleteClassSession(id);
      toast.success(response.message);
      get().getAllClassSessions();
    } catch (error: unknown) {
      toast.error("Không thể xoá buổi học");
    } finally {
      set({ loading: false });
    }
  },

  getClassSessionById: async (id: number) => {
    set({ loading: true });
    try {
      const response = await classSessionService.getClassSessionById(id);
      return response.data;
    } catch (error: unknown) {
      toast.error("Không thể tải thông tin buổi học");
      return null;
    } finally {
      set({ loading: false });
    }
  },

  updateClassSession: async (id: number, sessionData: Partial<ClassSession>) => {
    set({ loading: true });
    try {
      const response = await classSessionService.updateClassSession(id, sessionData);
      toast.success(response.message);
      get().getAllClassSessions();
    } catch (error: unknown) {
      toast.error("Không thể cập nhật buổi học");
    } finally {
      set({ loading: false });
    }
  },
}));
