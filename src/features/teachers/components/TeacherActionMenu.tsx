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
import { useTeacherStore } from "../hooks/useTeacherStore";
import { Teacher } from "../types";

export default function TeacherActionMenu({ teacher }: { teacher: Teacher }) {
  const { deleteTeacher, getAllTeachers } = useTeacherStore();
  const navigate = useNavigate();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteTeacher = async () => {
    try {
      await deleteTeacher(teacher.teacher?.id || 0);
      await getAllTeachers(1);
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };

  const handleViewDetail = () => {
    navigate(`/teachers/${teacher.teacher?.id || 0}`);
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
        onConfirm={handleDeleteTeacher}
        title="Xác nhận xóa"
        description={`Bạn có chắc chắn muốn xóa giáo viên ${teacher.teacher?.full_name || teacher.name}?`}
      />
    </>
  );
} 