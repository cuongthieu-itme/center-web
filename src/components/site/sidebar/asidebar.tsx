import { useAuthStore } from "@/stores/useAuthStore";
import { Separator } from "@radix-ui/react-separator";
import { useState } from "react";
import Logo from "../../shared/logo";
import { Button } from "../../ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
} from "../../ui/sidebar";
import LogoutDialog from "./logout-dialog";
import NavMain from "./nav-main";
import { Role } from "@/types";

export default function Asidebar() {
  const [open, setIsOpen] = useState(false);
  const { user } = useAuthStore();
  const authRole = user?.role as Role;
  
  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <NavMain role={authRole} />
              <Separator />
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu className="pl-4 font-bold space-y-1 uppercase">
            <span>{user?.name}</span>
            <Separator />
          </SidebarMenu>
          <SidebarMenu>
            <Button variant={"default"} onClick={() => setIsOpen(true)}>
              Đăng xuất
            </Button>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <LogoutDialog open={open} setIsOpen={setIsOpen} />
    </>
  );
}
