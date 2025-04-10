export interface UserType {
  username: string;
  id: number;
  role: "ADMIN" | "MANAGER";
  email: string;
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
