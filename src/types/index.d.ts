export interface UserType {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  role: string;
  created_at: string;
  updated_at: string;
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
