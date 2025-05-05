import axiosInstance from "@/lib/axios";
import { Student, StudentFormData } from "../types";

export const studentService = {
  getAllStudents: async (page: number = 1) => {
    const response = await axiosInstance.get(`/students?page=${page}`);
    return response.data;
  },

  getStudentById: async (id: number) => {
    const response = await axiosInstance.get(`/students/${id}`);
    return response.data;
  },

  createStudent: async (studentData: StudentFormData) => {
    const response = await axiosInstance.post("/students", studentData);
    return response.data;
  },

  updateStudent: async (id: number, studentData: Partial<Student>) => {
    const response = await axiosInstance.patch(`/students/${id}`, studentData);
    return response.data;
  },

  deleteStudent: async (id: number) => {
    const response = await axiosInstance.delete(`/students/${id}`);
    return response.data;
  },

  getStudentClasses: async (studentId: number, page: number = 1) => {
    const response = await axiosInstance.get(`/students/${studentId}/classes?page=${page}`);
    return response.data;
  },

  getStudentAttendance: async (studentId: number, page: number = 1) => {
    const response = await axiosInstance.get(`/students/${studentId}/attendance?page=${page}`);
    return response.data;
  },

  /**
   * Tải file lên server
   * @param file File cần tải lên
   * @param options Tùy chọn cho việc tải lên
   * @returns Promise chứa response từ API với cấu trúc { message: string, path: string }
   */
  uploadFile: async (file: File, options?: {
    onUploadProgress?: (progressEvent: any) => void;
    customFormData?: FormData;
  }) => {
    // Tạo FormData hoặc sử dụng customFormData nếu được cung cấp
    const formData = options?.customFormData || new FormData();

    // Nếu không có customFormData, thêm file vào formData
    if (!options?.customFormData) {
      formData.append('file', file);
    }

    const response = await axiosInstance.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
      },
      onUploadProgress: options?.onUploadProgress
    });

    // Response có cấu trúc: { message: string, path: string }
    // ví dụ: { message: "Tải file thành công!", path: "/storage/uploads/1746439474.png" }
    return response.data;
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
  }): string => {
    // Nếu không có filename hoặc filename là null/undefined, trả về ảnh mặc định
    if (!filename) {
      return options?.defaultImage || '';
    }

    // Xây dựng URL đầy đủ
    const baseUrl = import.meta.env.VITE_API_URL;
    const endpoint = options?.baseEndpoint || '/api/view-file/';

    return `${baseUrl}${endpoint}${filename}`;
  }
  ,// Thêm phương thức changePassword vào studentService
  changePassword: async (data: ChangePasswordData) => {
    const response = await axiosInstance.post("/students/change-password", data);
    return response.data;
  }
};

// Thêm vào file studentService.ts hiện có

// Thêm type cho dữ liệu đổi mật khẩu
export type ChangePasswordData = {
  user_id: number;
  current_password: string;
  new_password: string;
  confirm_password: string;
};

