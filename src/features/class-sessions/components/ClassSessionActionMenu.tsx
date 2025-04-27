import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useClassSessionStore } from "../hooks/useClassSessionStore";
import { ClassSession } from "../types";

export default function ClassSessionActionMenu({ sessionItem }: { sessionItem: ClassSession }) {
  const { deleteClassSession, getAllClassSessions } = useClassSessionStore();
  const navigate = useNavigate();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteSession = async () => {
    try {
      await deleteClassSession(sessionItem.id);
      await getAllClassSessions(1);
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting class session:", error);
    }
  };

  const handleViewDetail = () => {
    navigate(`/class-sessions/${sessionItem.id}`);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <span className="sr-only">Open menu</span>
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
            Xóa
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleViewDetail}>
            Chi tiết
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Xác nhận xoá buổi học"
        description={`Bạn có chắc chắn muốn xoá buổi học "${sessionItem.session_name}"?`}
        onConfirm={handleDeleteSession}
      />
    </>
  );
}

