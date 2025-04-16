import axiosInstance from "@/lib/axios";
import { Teacher, TeacherDetail, TeacherFormData } from "../types";

export const teacherService = {
  getAllTeachers: async (page: number = 1) => {
    const response = await axiosInstance.get(`/users?role=teacher&page=${page}`);
    return response.data;
  },

  getTeacherById: async (id: number): Promise<TeacherDetail> => {
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
  }
}; 