import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { AdminView, ManagerView } from "@/lib/constants";
import { ItemType } from "@/types";
import { Link, useLocation } from "react-router-dom";

export default function NavMain({
  role,
}: {
  role: "ADMIN" | "MANAGER" | undefined;
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

  const routes = role === "ADMIN" ? AdminView : ManagerView;

  return (
    <SidebarGroup>
      <SidebarMenu>{renderRoutes(routes)}</SidebarMenu>
    </SidebarGroup>
  );
}
