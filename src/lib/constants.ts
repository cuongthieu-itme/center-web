import {
  Calendar,
  ClipboardCheck,
  History,
  LayoutDashboard,
  List,
  PlusCircle,
  School,
  Timer,
  User,
  UserPlus,
  Users,
  Lock
} from "lucide-react";
import { ItemType } from "../types";

// Common menu items for all roles
export const CommonMenuItems: ItemType[] = [
  {
    title: "Tổng quan",
    url: `/dashboard`,
    icon: LayoutDashboard,
    permissions: ["admin", "manager", "teacher"],
  }
];

// Admin specific menu items
export const AdminMenuItems: ItemType[] = [
  {
    title: "Quản lý người dùng",
    url: `/users`,
    icon: User,
    permissions: ["admin"],
  }
];

// Manager specific menu items
export const ManagerMenuItems: ItemType[] = [];

// Education management menu items
export const EducationMenuItems: ItemType[] = [
  {
    title: "Giáo viên",
    url: "/teachers",
    icon: User,
    permissions: ["admin", "manager"],
  },
  {
    title: "Học sinh",
    url: "/students",
    icon: Users,
    permissions: ["admin", "manager", "teacher"],
  },
  {
    title: "Lớp học",
    url: "/classes",
    icon: School,
    permissions: ["admin", "manager", "teacher"],
  },
  {
    title: "Buổi học",
    url: "/class-sessions",
    icon: Timer,
    permissions: ["admin", "manager", "teacher"],
  },
];

// Attendance menu items
export const AttendanceMenuItems: ItemType[] = [
  {
    title: "Lịch sử điểm danh",
    url: "/attendance",
    icon: ClipboardCheck,
    permissions: ["admin", "manager", "teacher"],
  }
];

// Student specific menu items
export const StudentMenuItems: ItemType[] = [
  {
    title: "Lớp của tôi",
    url: "/my-classes",
    icon: School,
    permissions: ["student"],
  },
  {
    title: "Lịch của tôi",
    url: "/my-schedule",
    icon: Calendar,
    permissions: ["student"],
  },
  {
    title: "Điểm danh của tôi",
    url: "/my-attendance",
    icon: ClipboardCheck,
    permissions: ["student"],
  },
  {
    title: "Đổi mật khẩu",
    url: "/change-password",
    icon: Lock,
    permissions: ["student"],
  }
];

// Helper function to filter menu items by role
export const getMenuItemsByRole = (role: string) => {
  const items = [
    ...CommonMenuItems,
    ...AdminMenuItems,
    ...ManagerMenuItems,
    ...EducationMenuItems,
    ...AttendanceMenuItems,
    ...StudentMenuItems
  ];

  return items.filter(item =>
    item.permissions && item.permissions.includes(role)
  );
};

// For backward compatibility
export const AdminView = getMenuItemsByRole("admin");
export const ManagerView = getMenuItemsByRole("manager");
export const StudentRoleView = getMenuItemsByRole("student");

// Legacy views - keep for backward compatibility
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
