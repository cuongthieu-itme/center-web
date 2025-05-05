import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { getMenuItemsByRole } from "@/lib/constants";
import { ItemType, Role } from "@/types";
import { Separator } from "@/components/ui/separator";
import { Link, useLocation } from "react-router-dom";

export default function NavMain({
  role,
}: {
  role: Role | undefined;
}) {
  const { pathname } = useLocation();
  const roleStr = role || "teacher"; // Default to teacher if no role provided

  // Get menu items based on user role
  const menuItems = getMenuItemsByRole(roleStr);
  
  // Group menu items by section
  const getMenuSection = (items: ItemType[], sectionTitle: string) => {
    return (
      <div key={sectionTitle} className="space-y-1">
        <h3 className="px-4 text-sm font-semibold text-foreground/70">
          {sectionTitle}
        </h3>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton isActive={pathname.startsWith(item.url)} asChild>
              <Link to={item.url} className="flex gap-2 items-center">
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </div>
    );
  };

  // Organize items by section
  const dashboardItems = menuItems.filter(item =>
    item.url.includes("dashboard") || item.title === "Tổng quan" || item.title === "Đổi mật khẩu"
  );

  const attendanceItems = menuItems.filter(item =>
    item.url.includes("attendance") || item.title === "Điểm danh"
  );

  const educationItems = menuItems.filter(item =>
    item.url.includes("teachers") ||
    item.url.includes("students") ||
    item.url.includes("classes") ||
    item.url.includes("class-sessions")
  );

  const adminItems = menuItems.filter(item =>
    item.url.includes("users")
  );

  return (
    <SidebarGroup>
      <SidebarMenu className="px-2 py-2">
        {dashboardItems.length > 0 && getMenuSection(dashboardItems, "Dashboard")}

        {attendanceItems.length > 0 && (
          <>
            <Separator className="my-2" />
            {getMenuSection(attendanceItems, "Điểm danh")}
          </>
        )}

        {educationItems.length > 0 && (
          <>
            <Separator className="my-2" />
            {getMenuSection(educationItems, "Quản lý giáo dục")}
          </>
        )}

        {adminItems.length > 0 && (
          <>
            <Separator className="my-2" />
            {getMenuSection(adminItems, "Quản trị hệ thống")}
          </>
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
