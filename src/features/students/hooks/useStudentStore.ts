import { toast } from "sonner";
import { create } from "zustand";
import { studentService } from "../services/studentService";
import { Student, StudentAttendance, StudentClass, StudentFormData, StudentPagination, StudentSchedule } from "../types";

interface StudentState {
  loading: boolean;
  students: Student[];
  studentsPagination: StudentPagination;
  studentClasses: StudentClass[];
  myClasses: StudentClass[];
  studentAttendance: StudentAttendance[];
  studentClassesPagination: StudentPagination;
  myClassesPagination: StudentPagination;
  studentAttendancePagination: StudentPagination;
  mySchedule: StudentSchedule[];
  mySchedulePagination: StudentPagination;
  myAttendance: any[];
  myAttendancePagination: StudentPagination;
  createStudent: (values: StudentFormData) => Promise<void>;
  getAllStudents: (page?: number) => Promise<void>;
  deleteStudent: (id: number) => Promise<void>;
  getStudentById: (id: number) => Promise<Student | null>;
  updateStudent: (id: number, student: Partial<Student>) => Promise<void>;
  getStudentClasses: (studentId: number, page?: number) => Promise<void>;
  getMyClasses: (page?: number) => Promise<void>;
  getStudentAttendance: (studentId: number, page?: number) => Promise<void>;
  uploadFile: (file: File, options?: {
    onUploadProgress?: (progressEvent: any) => void;
    customFormData?: FormData;
    silent?: boolean;
  }) => Promise<string | undefined>;
  getFileUrl: (filename?: string | null, options?: {
    defaultImage?: string;
    baseEndpoint?: string;
  }) => string;
  getMySchedule: (page?: number) => Promise<void>;
  getMyAttendance: (page?: number) => Promise<void>;
}

export const useStudentStore = create<StudentState>((set, get) => ({
  loading: false,
  students: [],
  studentClasses: [],
  myClasses: [],
  studentAttendance: [],
  mySchedule: [],
  myAttendance: [],
  studentsPagination: {
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 20,
    from: 0,
    to: 0,
  },
  studentClassesPagination: {
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 20,
    from: 0,
    to: 0,
  },
  myClassesPagination: {
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 20,
    from: 0,
    to: 0,
  },
  studentAttendancePagination: {
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 20,
    from: 0,
    to: 0,
  },
  mySchedulePagination: {
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 20,
    from: 0,
    to: 0,
  },
  myAttendancePagination: {
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
  },
  
  getStudentClasses: async (studentId: number, page = 1) => {
    if (get().loading) return;
    set({ loading: true });
    try {
      const response = await studentService.getStudentClasses(studentId, page);
      set({ 
        studentClasses: response.data,
        studentClassesPagination: {
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
  
  getStudentAttendance: async (studentId: number, page = 1) => {
    if (get().loading) return;
    set({ loading: true });
    try {
      const response = await studentService.getStudentAttendance(studentId, page);
      set({ 
        studentAttendance: response.data,
        studentAttendancePagination: {
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

  getMyClasses: async (page = 1) => {
    if (get().loading) return;
    set({ loading: true });
    try {
      const response = await studentService.getMyClasses(page);
      set({ 
        myClasses: response.data,
        myClassesPagination: {
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

  getMySchedule: async (page = 1) => {
    if (get().loading) return;
    set({ loading: true });
    try {
      const response = await studentService.getMySchedule(page);
      set({ 
        mySchedule: response.data,
        mySchedulePagination: {
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

  /**
   * Tải file lên server
   * @param file File cần tải lên
   * @param options Tùy chọn cho việc tải lên
   * @returns Promise chứa đường dẫn file hoặc undefined nếu có lỗi
   */
  uploadFile: async (file: File, options?: {
    onUploadProgress?: (progressEvent: any) => void;
    customFormData?: FormData;
    silent?: boolean;
  }) => {
    try {
      const response = await studentService.uploadFile(file, options);
      if (!options?.silent) {
        toast.success(response.message || "Tải file lên thành công");
      }
      
      // Lấy tên file từ đường dẫn đầy đủ
      if (response.path) {
        // Trích xuất tên file từ đường dẫn (ví dụ: /storage/uploads/1746439474.png -> 1746439474.png)
        const filename = response.path.split('/').pop();
        return filename;
      }
      
      return undefined;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      if (!options?.silent) {
        toast.error(err?.response?.data?.message || "Lỗi khi tải file lên");
      }
      return undefined;
    }
  },

  /**
   * Lấy đường dẫn đến file
   * @param filename Tên file cần xem
   * @param options Tùy chọn bổ sung
   * @returns URL đầy đủ để xem file
   */
  getFileUrl: (filename?: string | null, options?: {
    defaultImage?: string;
    baseEndpoint?: string;
  }) => {
    return studentService.getFileUrl(filename, options);
  },

  getMyAttendance: async (page = 1) => {
    if (get().loading) return;
    set({ loading: true });
    try {
      const response = await studentService.getMyAttendance(page);
      set({ 
        myAttendance: response.data,
        myAttendancePagination: {
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
  }
})); 