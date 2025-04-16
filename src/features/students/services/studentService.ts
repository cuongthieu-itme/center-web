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
  }
}; 