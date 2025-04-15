import { BookA, Calendar, ClipboardCheck, History, LayoutDashboard, List, PlusCircle, School, User, UserPlus, Users } from "lucide-react";
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

export const TeacherView: ItemType[] = [
  {
    title: "Quản lý giáo viên",
    url: "/teachers",
    icon: User,
  },
  {
    title: "Danh sách giáo viên",
    url: "/teachers/list",
    icon: List,
  },
  {
    title: "Thêm giáo viên",
    url: "/teachers/add",
    icon: UserPlus,
  },
];

export const StudentView: ItemType[] = [
  {
    title: "Quản lý học sinh",
    url: "/students",
    icon: Users,
  },
  {
    title: "Danh sách học sinh",
    url: "/students/list",
    icon: List,
  },
  {
    title: "Thêm học sinh",
    url: "/students/add",
    icon: UserPlus,
  },
];

export const ClassView: ItemType[] = [
  {
    title: "Quản lý lớp học",
    url: "/classes",
    icon: School,
  },
  {
    title: "Danh sách lớp",
    url: "/classes/list",
    icon: List,
  },
  {
    title: "Thêm lớp",
    url: "/classes/add",
    icon: PlusCircle,
  },
];

export const AttendanceView: ItemType[] = [
  {
    title: "Quản lý điểm danh",
    url: "/attendance",
    icon: ClipboardCheck,
  },
  {
    title: "Điểm danh hôm nay",
    url: "/attendance/today",
    icon: Calendar,
  },
  {
    title: "Lịch sử điểm danh",
    url: "/attendance/history",
    icon: History,
  },
];
