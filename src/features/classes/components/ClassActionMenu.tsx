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
import { useClassStore } from "../hooks/useClassStore";
import { Class } from "../types";

export default function ClassActionMenu({ classItem }: { classItem: Class }) {
  const { deleteClass, getAllClasses } = useClassStore();
  const navigate = useNavigate();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteClass = async () => {
    try {
      await deleteClass(classItem.id);
      await getAllClasses(1);
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  };

  const handleViewDetail = () => {
    navigate(`/classes/${classItem.id}`);
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
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteClass}
        title="Xác nhận xóa"
        description={`Bạn có chắc chắn muốn xóa lớp ${classItem.class_name}?`}
      />
    </>
  );
} 