import { Outlet } from "react-router-dom";
import Asidebar from "../components/site/sidebar/asidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../components/ui/sidebar";

export default function AppLayout() {
  return (
    <SidebarProvider>
      <Asidebar />
      <SidebarInset className="overflow-x-hidden">
        <SidebarTrigger />
        <div className="w-full">
          <>
            <div className="px-3 lg:px-20 py-3">
              <Outlet />
            </div>
          </>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
