import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { User } from "../types";
import UserActionMenu from "./UserActionMenu";

// Simple date formatter function
const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "N/A";
    }
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  } catch (error) {
    return "N/A";
  }
};

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