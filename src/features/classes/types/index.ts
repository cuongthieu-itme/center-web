export type Class = {
  id: number;
  class_name: string;
  teacher_id: number;
  schedule: string;
  createdAt: string;
};

export type ClassFormData = {
  class_name: string;
  teacher_id: number;
  schedule: string;
};

export type ClassPagination = {
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
  from: number;
  to: number;
}; 