import { BookA, LayoutDashboard, User } from "lucide-react";
import { ItemType } from "../types";

export const AdminView: ItemType[] = [
  {
    title: "Tổng quan",
    url: `/dashboard`,
    icon: LayoutDashboard,
  },
  {
    title: "Người dùng",
    url: `/users`,
    icon: User,
  }
];

export const ManagerView: ItemType[] = [
  {
    title: "View Orders",
    url: `/dashboard/orders-list`,
    icon: BookA,
  },
];
