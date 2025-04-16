export type Student = {
  id: number;
  full_name: string;
  dob: string;
  phone: string;
  email: string;
  address: string;
  avatar_url: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type ClassSession = {
  id: number;
  class_id: number;
  session_date: string;
  start_time: string;
  end_time: string;
  created_at: string;
  updated_at: string;
};

export type Attendance = {
  id: number;
  student_id: number;
  session_id: number;
  status: "present" | "absent" | "late" | "excused";
  check_in_time: string | null;
  check_out_time: string | null;
  created_at: string;
  updated_at: string;
  student: Student;
  class_session: ClassSession;
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