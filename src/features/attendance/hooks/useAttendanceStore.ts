import { toast } from "sonner";
import { create } from "zustand";
import { attendanceService } from "../services/attendanceService";
import { Attendance, AttendanceFormData, AttendancePagination } from "../types";

interface AttendanceState {
  loading: boolean;
  attendances: Attendance[];
  attendancePagination: AttendancePagination;
  currentSessionId: number | null;
  currentStudentId: number | null;
  createAttendance: (values: AttendanceFormData) => Promise<void>;
  getAllAttendance: (page?: number) => Promise<void>;
  getAttendanceBySession: (sessionId: number, page?: number) => Promise<void>;
  getAttendanceByStudent: (studentId: number, page?: number) => Promise<void>;
  deleteAttendance: (id: number) => Promise<void>;
  getAttendanceById: (id: number) => Promise<Attendance | null>;
  updateAttendance: (id: number, attendanceData: Partial<Attendance>) => Promise<void>;
  setCurrentSessionId: (sessionId: number | null) => void;
  setCurrentStudentId: (studentId: number | null) => void;
}

export const useAttendanceStore = create<AttendanceState>((set, get) => ({
  loading: false,
  attendances: [],
  currentSessionId: null,
  currentStudentId: null,
  attendancePagination: {
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 20,
    from: 0,
    to: 0,
  },

  setCurrentSessionId: (sessionId: number | null) => {
    set({ currentSessionId: sessionId });
  },

  setCurrentStudentId: (studentId: number | null) => {
    set({ currentStudentId: studentId });
  },

  createAttendance: async (values: AttendanceFormData) => {
    set({ loading: true });
    try {
      const response = await attendanceService.createAttendance(values);
      toast.success(response.message);
      
      // Refresh the appropriate list based on context
      const sessionId = get().currentSessionId;
      const studentId = get().currentStudentId;
      
      if (sessionId) {
        await get().getAttendanceBySession(sessionId);
      } else if (studentId) {
        await get().getAttendanceByStudent(studentId);
      } else {
        await get().getAllAttendance();
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "An error occurred");
    } finally {
      set({ loading: false });
    }
  },

  getAllAttendance: async (page = 1) => {
    if (get().loading) return;
    set({ loading: true });
    try {
      const response = await attendanceService.getAllAttendance(page);
      set({ 
        attendances: response.data,
        attendancePagination: {
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

  getAttendanceBySession: async (sessionId, page = 1) => {
    if (get().loading) return;
    set({ loading: true, currentSessionId: sessionId });
    try {
      const response = await attendanceService.getAttendanceBySession(sessionId, page);
      set({ 
        attendances: response.data,
        attendancePagination: {
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

  getAttendanceByStudent: async (studentId, page = 1) => {
    if (get().loading) return;
    set({ loading: true, currentStudentId: studentId });
    try {
      const response = await attendanceService.getAttendanceByStudent(studentId, page);
      set({ 
        attendances: response.data,
        attendancePagination: {
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

  deleteAttendance: async (id: number) => {
    set({ loading: true });
    try {
      const response = await attendanceService.deleteAttendance(id);
      toast.success(response.message);
      
      // Refresh based on current context
      const sessionId = get().currentSessionId;
      const studentId = get().currentStudentId;
      
      if (sessionId) {
        await get().getAttendanceBySession(sessionId);
      } else if (studentId) {
        await get().getAttendanceByStudent(studentId);
      } else {
        await get().getAllAttendance();
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "An error occurred");
    } finally {
      set({ loading: false });
    }
  },

  getAttendanceById: async (id: number) => {
    try {
      const response = await attendanceService.getAttendanceById(id);
      return response;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "An error occurred");
      return null;
    }
  },

  updateAttendance: async (id: number, attendanceData: Partial<Attendance>) => {
    try {
      const response = await attendanceService.updateAttendance(id, attendanceData);
      toast.success(response.message);
      
      // Refresh based on current context
      const sessionId = get().currentSessionId;
      const studentId = get().currentStudentId;
      
      if (sessionId) {
        await get().getAttendanceBySession(sessionId);
      } else if (studentId) {
        await get().getAttendanceByStudent(studentId);
      } else {
        await get().getAllAttendance();
      }
      
      return response;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "An error occurred");
      throw error;
    }
  }
})); 