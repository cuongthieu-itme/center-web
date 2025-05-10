import {
  BarChart,
  CalendarDays,
  GraduationCap,
  Home,
  School,
  User,
  Users,
  LucideIcon,
  ClipboardCheck,
  ClipboardList,
  Lock,
} from "lucide-react";

type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  roles: string[];
};

export const navItems: NavItem[] = [
  {
    title: "Trang chủ",
    href: "/dashboard",
    icon: Home,
    roles: ["admin", "student"],
  },
  {
    title: "Thống kê",
    href: "/dashboard/analytics",
    icon: BarChart,
    roles: ["admin"],
  },
  {
    title: "Lớp học của tôi",
    href: "/my-classes",
    icon: School,
    roles: ["student"],
  },
  {
    title: "Lịch dạy",
    href: "/my-schedule",
    icon: CalendarDays,
    roles: [],
  },
  {
    title: "Quản lý giáo viên",
    href: "/teachers",
    icon: GraduationCap,
    roles: ["admin"],
  },
  {
    title: "Danh sách học sinh",
    href: "/students",
    icon: Users,
    roles: ["admin"],
  },
  {
    title: "Quản lý người dùng",
    href: "/users",
    icon: User,
    roles: ["admin"],
  },
  {
    title: "Điểm danh",
    href: "/attendance",
    icon: ClipboardCheck,
    roles: ["admin"],
  },
  {
    title: "Lịch sử điểm danh",
    href: "/my-attendance",
    icon: ClipboardList,
    roles: ["student"],
  },
  {
    title: "Đổi mật khẩu",
    href: "/change-password",
    icon: Lock,
    roles: ["student"],
  },
];