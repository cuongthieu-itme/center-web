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
import BulkAssignOrders from "../orders/bulk-assign-orders";
import CreateOrder from "../orders/create-order";
import CreateProduct from "../products/create-product";
import CreateUser from "../users/create-user";
import LogoutDialog from "./logout-dialog";
import NavMain from "./nav-main";

export default function Asidebar() {
  const [open, setIsOpen] = useState(false);
  const { user } = useAuthStore();
  const authRole = user?.role;
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

          <SidebarGroup>
            {authRole === "ADMIN" && (
              <SidebarGroupContent>
                <CreateUser />
                <CreateProduct />
                <BulkAssignOrders />
              </SidebarGroupContent>
            )}
            <SidebarGroupContent>
              <CreateOrder />
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu className="pl-4 font-bold space-y-1 uppercase">
            <span>{user?.username}</span>
            <Separator />
            <span>{user?.email}</span>
            <Separator />
          </SidebarMenu>
          <SidebarMenu>
            <Button variant={"default"} onClick={() => setIsOpen(true)}>
              Logout
            </Button>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <LogoutDialog open={open} setIsOpen={setIsOpen} />
    </>
  );
}
