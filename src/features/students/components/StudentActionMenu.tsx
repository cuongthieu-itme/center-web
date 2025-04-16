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
import { useStudentStore } from "../hooks/useStudentStore";
import { Student } from "../types";

export default function StudentActionMenu({ student }: { student: Student }) {
  const { deleteStudent, getAllStudents } = useStudentStore();
  const navigate = useNavigate();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteStudent = async () => {
    try {
      await deleteStudent(student.id);
      await getAllStudents(1);
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleViewDetail = () => {
    navigate(`/students/${student.id}`);
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
        onConfirm={handleDeleteStudent}
        title="Xác nhận xóa"
        description={`Bạn có chắc chắn muốn xóa học sinh ${student.full_name}?`}
      />
    </>
  );
} 