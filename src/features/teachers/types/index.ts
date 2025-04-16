export type Teacher = {
  id: number;
  full_name: string;
  phone: string;
  email: string;
  specialization: string;
  avatar_url?: string;
  user_id: number;
  createdAt: string;
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