export type ClassSession = {
  id: number;
  class_id: number;
  session_date: string;
  start_time: string;
  end_time: string;
  created_at?: string;
  updated_at?: string;
  class_model?: {
    id?: number;
    class_name: string;
    teacher_id?: number;
    created_at?: string;
    updated_at?: string;
  };
};

export type ClassSessionFormData = {
  class_id: number;
  session_date: string;
  start_time: string;
  end_time: string;
};

export type ClassSessionPagination = {
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
  from: number;
  to: number;
};
