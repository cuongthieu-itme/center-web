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
import { useAttendanceStore } from "../hooks/useAttendanceStore";
import { Attendance } from "../types";

export default function AttendanceActionMenu({ attendance }: { attendance: Attendance }) {
  const { deleteAttendance } = useAttendanceStore();
  const navigate = useNavigate();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteAttendance = async () => {
    try {
      await deleteAttendance(attendance.id);
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting attendance:", error);
    }
  };

  const handleViewDetail = () => {
    navigate(`/attendance/${attendance.id}`);
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
        onConfirm={handleDeleteAttendance}
        title="Xác nhận xóa"
        description={`Bạn có chắc chắn muốn xóa thông tin điểm danh này?`}
      />
    </>
  );
} 