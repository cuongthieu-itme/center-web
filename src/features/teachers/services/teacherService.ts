import axiosInstance from "@/lib/axios";
import { Teacher, TeacherDetail, TeacherFormData } from "../types";

export const teacherService = {
  getAllTeachers: async (page: number = 1) => {
    const response = await axiosInstance.get(`/teachers?page=${page}`);
    return response.data;
  },

  getTeacherById: async (id: number) => {
    const response = await axiosInstance.get(`/teachers/${id}`);
    return response.data;
  },

  createTeacher: async (teacherData: TeacherFormData) => {
    const response = await axiosInstance.post("/teachers", teacherData);
    return response.data;
  },

  updateTeacher: async (id: number, teacherData: Partial<Teacher>) => {
    const response = await axiosInstance.patch(`/teachers/${id}`, teacherData);
    return response.data;
  },

  deleteTeacher: async (id: number) => {
    const response = await axiosInstance.delete(`/teachers/${id}`);
    return response.data;
  },

  // Get students for the current teacher
  getMyStudents: async (page: number = 1) => {
    const response = await axiosInstance.get(`/teacher/students?page=${page}`);
    return response.data;
  },

  // Get classes for the current teacher
  getMyClasses: async (page: number = 1) => {
    const response = await axiosInstance.get(`/teacher/classes?page=${page}`);
    return response.data;
  },

  getStudentAttendance: async (studentId: number, page: number = 1) => {
    const response = await axiosInstance.get(`/teacher/students/${studentId}/attendance?page=${page}`);
    return response.data;
  },
}; 