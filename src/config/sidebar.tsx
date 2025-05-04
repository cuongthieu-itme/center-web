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
    roles: ["admin", "teacher", "student"],
  },
  {
    title: "Thống kê",
    href: "/dashboard/analytics",
    icon: BarChart,
    roles: ["admin"],
  },
  {
    title: "Quản lý lớp học",
    href: "/classes",
    icon: School,
    roles: ["admin", "teacher"],
  },
  {
    title: "Quản lý buổi học",
    href: "/class-sessions",
    icon: CalendarDays,
    roles: ["admin", "teacher"],
  },
  {
    title: "Quản lý giáo viên",
    href: "/teachers",
    icon: GraduationCap,
    roles: ["admin"],
  },
  {
    title: "Quản lý học sinh",
    href: "/students",
    icon: Users,
    roles: ["admin", "teacher"],
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
    roles: ["admin", "teacher"],
  },
  {
    title: "Theo dõi điểm danh",
    href: "/attendance-tracker",
    icon: ClipboardList,
    roles: ["admin", "teacher"],
  },
];