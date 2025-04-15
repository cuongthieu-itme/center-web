import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { AdminView, ManagerView } from "@/lib/constants";
import { ItemType, Role } from "@/types";
import { ClipboardCheck, School, User, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function NavMain({
  role,
}: {
  role: Role | undefined;
}) {
  const { pathname } = useLocation();

  const renderRoutes = (routes: ItemType[]) => {
    return routes?.map((item) => (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton isActive={item.url === pathname} asChild>
          <Link to={item.url} className="flex gap-2 items-center">
            <item.icon />
            <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    ));
  };

  // Use the ADMIN role or the new admin role
  const isAdmin = role === "admin";
  const routes = isAdmin ? AdminView : ManagerView;

  return (
    <SidebarGroup>
      <SidebarMenu>
        {renderRoutes(routes)}
        <SidebarMenuItem>
          <SidebarMenuButton isActive={pathname.startsWith("/teachers")} asChild>
            <Link to="/teachers" className="flex gap-2 items-center">
              <User />
              <span>Giáo viên</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton isActive={pathname.startsWith("/students")} asChild>
            <Link to="/students" className="flex gap-2 items-center">
              <Users />
              <span>Học sinh</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton isActive={pathname.startsWith("/classes")} asChild>
            <Link to="/classes" className="flex gap-2 items-center">
              <School />
              <span>Lớp học</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton isActive={pathname.startsWith("/attendance")} asChild>
            <Link to="/attendance" className="flex gap-2 items-center">
              <ClipboardCheck />
              <span>Điểm danh</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
