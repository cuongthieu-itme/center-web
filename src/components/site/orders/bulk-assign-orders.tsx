import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BadgePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useManagerStore } from "../../../stores/useManagerStore";
import { Button } from "../../ui/button";
import { DialogHeader } from "../../ui/dialog";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../ui/sidebar";

export default function BulkAssignOrders() {
  const [open, setOpen] = useState(false);
  const { managers, getAllManagers, assignBulk } = useManagerStore();
  const [selectedManagerId, setSelectedManagerId] = useState<number | null>(
    null
  );
  useEffect(() => {
    getAllManagers();
  }, [getAllManagers]);

  const handleAssign = (managerId: number) => {
    if (managerId) {
      assignBulk(managerId);
      setOpen(!open);
    }
  };

  const handleSelectChange = (username: string) => {
    // Find the managerId corresponding to the selected username
    const manager = managers.find((manager) => manager.username === username);
    if (manager) {
      setSelectedManagerId(manager.id);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <BadgePlus />
                Bulk Assign Orders
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-3xl">Bulk Assign Orders</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Select onValueChange={handleSelectChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Managers List" />
          </SelectTrigger>
          <SelectContent>
            {managers.map((manager) => (
              <SelectItem value={manager.username} key={manager.id}>
                {manager.username}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          onClick={() => selectedManagerId && handleAssign(selectedManagerId)}
          disabled={!selectedManagerId}
        >
          Assign Orders
        </Button>
      </DialogContent>
    </Dialog>
  );
}
