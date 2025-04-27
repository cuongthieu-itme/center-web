export type ClassSession = {
  id: number;
  class_id: number;
  session_date: string;
  start_time: string;
  end_time: string;
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
