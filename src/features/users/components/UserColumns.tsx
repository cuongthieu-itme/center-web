import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { User } from "../types";
import UserActionMenu from "./UserActionMenu";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Tên người dùng",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Chức vụ",
    cell: ({ row }) => {
      const role = row.getValue("role") as string;

      const roleLabel = {
        admin: "Admin",
        teacher: "Giáo viên",
        student: "Học sinh",
      }[role] || "Không xác định";

      return (
        <Badge
          variant={
            role === "admin" ? "destructive" :
              role === "teacher" ? "default" :
                "secondary"
          }
        >
          {roleLabel}
        </Badge>
      );
    },
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
      return <UserActionMenu user={row.original} />;
    },
  },
]; 