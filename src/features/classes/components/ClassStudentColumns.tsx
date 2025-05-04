import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Student } from "@/features/students/types";
import { formatDate } from "@/lib/utils";
import { useClassStore } from "../hooks/useClassStore";
import { toast } from "sonner";

const RemoveStudentButton = ({ classId, studentId }: { classId: number; studentId: number }) => {
  const { removeStudentFromClass } = useClassStore();

  const handleRemove = async () => {
    try {
      await removeStudentFromClass(classId, studentId);
      toast.success("Đã xóa học sinh khỏi lớp");
    } catch (error) {
      console.error("Error removing student from class:", error);
    }
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleRemove}
    >
      Xóa khỏi lớp
    </Button>
  );
};

export const classStudentColumns: ColumnDef<Student>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "full_name",
    header: "Họ và tên",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Số điện thoại",
  },
  {
    accessorKey: "dob",
    header: "Ngày sinh",
    cell: ({ row }) => {
      const date = row.getValue("dob") as string;
      return formatDate(date);
    }
  },
  {
    accessorKey: "createdAt",
    header: "Ngày thêm vào lớp",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as string;
      return formatDate(date);
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const student = row.original;
      return (
        <RemoveStudentButton
          classId={student.class_id!}
          studentId={student.id}
        />
      );
    },
  },
];