import axiosInstance from "@/lib/axios";
import { ClassSession, ClassSessionFormData } from "../types";

export const classSessionService = {
  getAllClassSessions: async (page: number = 1) => {
    const response = await axiosInstance.get(`/class-sessions?page=${page}`);
    return response.data;
  },

  getClassSessionById: async (id: number) => {
    const response = await axiosInstance.get(`/class-sessions/${id}`);
    return response.data;
  },

  getClassSessionsByClassId: async (classId: number, page: number = 1) => {
    const response = await axiosInstance.get(`/class-sessions?class_id=${classId}&page=${page}`);
    return response.data;
  },

  createClassSession: async (sessionData: ClassSessionFormData) => {
    const response = await axiosInstance.post("/class-sessions", sessionData);
    return response.data;
  },

  updateClassSession: async (id: number, sessionData: Partial<ClassSession>) => {
    const response = await axiosInstance.patch(`/class-sessions/${id}`, sessionData);
    return response.data;
  },

  deleteClassSession: async (id: number) => {
    const response = await axiosInstance.delete(`/class-sessions/${id}`);
    return response.data;
  }
};
