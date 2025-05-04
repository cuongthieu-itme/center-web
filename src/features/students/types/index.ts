export type Student = {
  id: number;
  full_name: string;
  dob: string;
  phone: string;
  email: string;
  address: string;
  avatar_url?: string;
  user_id: number;
  class_id?: number;
  createdAt: string;
  updatedAt: string;
  deleted_at?: string | null;
};

export type StudentFormData = {
  full_name: string;
  dob: string;
  phone: string;
  email: string;
  address: string;
  user_id?: number;
};

export type StudentPagination = {
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
  from: number;
  to: number;
};

export type StudentClass = {
  id: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  teacher_id: number;
  teacher_name?: string;
  createdAt: string;
};

export type StudentAttendance = {
  id: number;
  student_id: number;
  session_id: number;
  class_id: number;
  class_name?: string;
  status: "present" | "absent" | "late" | "excused";
  check_in_time: string | null;
  check_out_time: string | null;
  date: string;
  createdAt: string;
  updatedAt: string;
};