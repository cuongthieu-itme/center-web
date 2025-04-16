export type Teacher = {
  id: number;
  name: string;
  email: string;
  role: string;
  teacher: {
    id: number;
    full_name: string;
    phone: string;
    email: string;
    specialization: string;
    avatar_url?: string;
    user_id: number;
    created_at: string;
    updated_at: string;
  } | null;
  student: null;
  created_at: string;
  updated_at: string;
};

export type TeacherFormData = {
  full_name: string;
  phone: string;
  email: string;
  specialization: string;
  user_id?: number;
};

export type TeacherPagination = {
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
  from: number;
  to: number;
};

export type TeacherDetail = {
  id: number;
  full_name: string;
  phone: string;
  email: string;
  specialization: string;
  avatar_url?: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}; 