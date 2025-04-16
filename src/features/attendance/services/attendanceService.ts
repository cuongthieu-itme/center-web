import axiosInstance from "@/lib/axios";
import { Attendance, AttendanceFormData } from "../types";

export const attendanceService = {
  getAllAttendance: async (page: number = 1) => {
    const response = await axiosInstance.get(`/attendance?page=${page}`);
    return response.data;
  },

  getAttendanceById: async (id: number) => {
    const response = await axiosInstance.get(`/attendance/${id}`);
    return response.data;
  },

  createAttendance: async (attendanceData: AttendanceFormData) => {
    const response = await axiosInstance.post("/attendance", attendanceData);
    return response.data;
  },

  updateAttendance: async (id: number, attendanceData: Partial<Attendance>) => {
    const response = await axiosInstance.patch(`/attendance/${id}`, attendanceData);
    return response.data;
  },

  deleteAttendance: async (id: number) => {
    const response = await axiosInstance.delete(`/attendance/${id}`);
    return response.data;
  },
  
  getAttendanceBySession: async (sessionId: number, page: number = 1) => {
    const response = await axiosInstance.get(`/attendance/session/${sessionId}?page=${page}`);
    return response.data;
  },
  
  getAttendanceByStudent: async (studentId: number, page: number = 1) => {
    const response = await axiosInstance.get(`/attendance/student/${studentId}?page=${page}`);
    return response.data;
  }
}; 