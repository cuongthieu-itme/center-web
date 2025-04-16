export type User = {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  role: "admin" | "teacher" | "student";
  isActive: boolean;
  createdAt: string;
  deleted_at?: string | null;
};

export type UserFormData = {
  name: string;
  email: string;
  password: string;
  role: "admin" | "teacher" | "student";
};

export type UserPagination = {
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
  from: number;
  to: number;
}; 