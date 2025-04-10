import { BookA, Package, User } from "lucide-react";
import { ItemType } from "../types";

export const AdminView: ItemType[] = [
  {
    title: "View Products",
    url: `/dashboard/products-list`,
    icon: Package,
  },
  {
    title: "View Users",
    url: `/dashboard/users-list`,
    icon: User,
  },
  {
    title: "View Orders",
    url: `/dashboard/orders-list`,
    icon: BookA,
  },
];

export const ManagerView: ItemType[] = [
  {
    title: "View Products",
    url: `/dashboard/products-list`,
    icon: Package,
  },
  {
    title: "View Orders",
    url: `/dashboard/orders-list`,
    icon: BookA,
  },
];
