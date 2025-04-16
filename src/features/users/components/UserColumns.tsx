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