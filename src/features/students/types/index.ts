export type Student = {
  id: number;
  full_name: string;
  dob: string;
  phone: string;
  email: string;
  address: string;
  avatar_url?: string;
  user_id: number;
  createdAt: string;
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