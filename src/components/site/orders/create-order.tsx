import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { BadgePlus } from "lucide-react";
import { useState } from "react";
import { useOrderStore } from "../../../stores/useOrderStore";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../ui/sidebar";

export default function CreateOrder() {
  const { createOrder } = useOrderStore();
  const [open, setOpen] = useState(false);
  const totalAmount = 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createOrder({ totalAmount, items: [] });
    setOpen(!open);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <BadgePlus />
                Create Order
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-3xl">Add Order</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <Label>Total Amount</Label>
            <Input
              placeholder="Enter Total Amount"
              type="number"
              value={Math.ceil(totalAmount)}
              readOnly
            />
          </div>
          <Button type="submit">Create Order</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
