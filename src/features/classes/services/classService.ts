import axiosInstance from "@/lib/axios";
import { Class, ClassFormData } from "../types";

export const classService = {
  getAllClasses: async (page: number = 1) => {
    const response = await axiosInstance.get(`/classes?page=${page}`);
    return response.data;
  },

  getClassById: async (id: number) => {
    const response = await axiosInstance.get(`/classes/${id}`);
    return response.data;
  },

  getClassesByTeacherId: async (teacherId: number, page: number = 1) => {
    const response = await axiosInstance.get(`/classes?teacher_id=${teacherId}&page=${page}`);
    return response.data;
  },

  createClass: async (classData: ClassFormData) => {
    const response = await axiosInstance.post("/classes", classData);
    return response.data;
  },

  updateClass: async (id: number, classData: Partial<Class>) => {
    const response = await axiosInstance.patch(`/classes/${id}`, classData);
    return response.data;
  },

  deleteClass: async (id: number) => {
    const response = await axiosInstance.delete(`/classes/${id}`);
    return response.data;
  },

  getStudentsByClass: async (classId: number, page: number = 1, perPage: number = 10, filter: Record<string, any> = {}) => {
    const queryParams = new URLSearchParams({ page: page.toString(), per_page: perPage.toString() });
    
    // Add any additional filter parameters
    Object.entries(filter).forEach(([key, value]) => {
      if (value) queryParams.append(key, value.toString());
    });

    const response = await axiosInstance.get(`/classes/${classId}/students-list?${queryParams}`);
    return response.data;
  },

  addStudentToClass: async (classId: number, studentId: number) => {
    const response = await axiosInstance.post("/student-classes", {
      class_id: classId,
      student_id: studentId
    });
    return response.data;
  },

  removeStudentFromClass: async (classId: number, studentId: number) => {
    const response = await axiosInstance.delete(`/student-classes/${classId}/${studentId}`);
    return response.data;
  }
};