import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Teacher } from "../types";
import TeacherActionMenu from "./TeacherActionMenu";

export const columns: ColumnDef<Teacher>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "teacher.full_name",
    header: "Họ và tên",
    cell: ({ row }) => row.original.teacher?.full_name || "",
  },
  {
    accessorKey: "teacher.email",
    header: "Email",
    cell: ({ row }) => row.original.teacher?.email || "",
  },
  {
    accessorKey: "teacher.phone",
    header: "Số điện thoại",
    cell: ({ row }) => row.original.teacher?.phone || "",
  },
  {
    accessorKey: "teacher.specialization",
    header: "Chuyên môn",
    cell: ({ row }) => row.original.teacher?.specialization || "",
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const deleted_at = row.original.deleted_at;

      if (deleted_at) {
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
            Đã nghỉ
          </Badge>
        );
      }

      return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
        Đang hoạt động
      </Badge>;
    },
  },
  {
    accessorKey: "created_at",
    header: "Ngày tạo",
    cell: ({ row }) => {
      const date = row.getValue("created_at") as string;
      return formatDate(date);
    }
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Hành động",
    cell: ({ row }) => {
      return <TeacherActionMenu teacher={row.original} />;
    },
  },
]; 