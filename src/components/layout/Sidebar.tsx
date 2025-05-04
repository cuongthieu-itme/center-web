import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { navItems } from "@/config/sidebar";
import { useAuthStore } from "@/features/auth/hooks/useAuthStore";

type NavItemProps = {
  title: string;
  href: string;
  icon: LucideIcon;
};

const NavItem = ({ title, href, icon: Icon }: NavItemProps) => {
  const location = useLocation();
  const isActive = href === "/attendance"
    ? location.pathname === "/attendance"
    : location.pathname === href;

  return (
    <NavLink
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
        isActive ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50" : "transparent"
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{title}</span>
    </NavLink>
  );
};

export default function Sidebar() {
  const { user } = useAuthStore();
  const userRole = user?.role || "student";

  const filteredNavItems = navItems.filter(item => item.roles.includes(userRole));

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="flex h-14 items-center border-b px-4 dark:border-gray-800">
        <span className="font-semibold">Center Management</span>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {filteredNavItems.map((item) => (
          <NavItem
            key={item.href}
            title={item.title}
            href={item.href}
            icon={item.icon}
          />
        ))}
      </nav>
      <div className="border-t p-4 dark:border-gray-800">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2">
          <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-800" />
          <div>
            <p className="text-sm font-medium">{user?.full_name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}