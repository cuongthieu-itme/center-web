import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAdminStore } from "@/stores/useAdminStore";
import { Ellipsis } from "lucide-react";
import { useAuthStore } from "../../../stores/useAuthStore";
import ToolTipWrapper from "../../shared/tooltip-wrapper";

export default function UserActionMenu({ id }: { id: number }) {
  const { deleteProduct } = useAdminStore();
  const { user } = useAuthStore();
  const role = user?.role;

  if (role === "MANAGER") {
    return (
      <ToolTipWrapper title="Admin Only ">
        <Ellipsis />
      </ToolTipWrapper>
    );
  }

  const handleDeleteProduct = () => {
    deleteProduct(id);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-8 p-0">
          <span className="sr-only">Open menu</span>
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleDeleteProduct}>
          Delete Product
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
