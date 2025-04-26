export type Class = {
  id: number;
  class_name: string;
  teacher_id: number;
  teacher?: {
    id: number;
    full_name: string;
  };
  createdAt: string;
};

export type ClassFormData = {
  class_name: string;
  teacher_id: number;
};

export type ClassPagination = {
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
  from: number;
  to: number;
};