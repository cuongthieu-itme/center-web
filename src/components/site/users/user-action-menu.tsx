import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAdminStore } from "@/stores/useAdminStore";
import { UserType } from "@/types";
import { Ellipsis } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UserActionMenu({ user }: { user: UserType }) {
  const { deleteUser } = useAdminStore();
  const navigate = useNavigate();

  const handleDeleteUser = () => {
    deleteUser(user.id);
  };

  const handleViewDetail = () => {
    navigate(`/users/${user.id}`);
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
        <DropdownMenuItem onClick={handleDeleteUser}>
          Xóa
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleViewDetail}>
          Chi tiết
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
