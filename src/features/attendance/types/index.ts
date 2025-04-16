export type Attendance = {
  id: number;
  student_id: number;
  session_id: number;
  status: "present" | "absent" | "late" | "excused";
  check_in_time: string | null;
  check_out_time: string | null;
  createdAt: string;
};

export type AttendanceFormData = {
  student_id: number;
  session_id: number;
  status: "present" | "absent" | "late" | "excused";
  check_in_time?: string;
  check_out_time?: string;
};

export type AttendancePagination = {
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
  from: number;
  to: number;
}; 