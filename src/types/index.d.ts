// Current roles in the system are "ADMIN" and "MANAGER"
// Future desired roles are "admin", "teacher", "student"
export type Role = 'admin' | 'teacher' | 'student';

export type UserType = {
  id: number;
  email: string;
  name: string;
  role: string;
  created_at: string;
  updated_at: string;
};

export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export type OrderType = {
  id: number;
  status: "PENDING" | "COMPLETED" | "CANCELLED";
  totalAmount?: number;
  manager: {
    username: string;
  };
  managerId: number;
};

export type ItemType = {
  title: string;
  url: string;
  icon: LucideIcon;
};

export type ProductType = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
};

export type OrderItem = {
  productId: number;
  productName?: string;
  price: number;
  quantity: number;
};

type CreateOrderType = {
  totalAmount: number;
  items: OrderItem[];
};
