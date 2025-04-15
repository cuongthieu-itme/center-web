import { Badge } from "@/components/ui/badge";
import { UserType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import UserActionMenu from "./user-action-menu";

// Simple date formatter function
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB'); // Format as DD/MM/YYYY
};

export const columns: ColumnDef<UserType>[] = [
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
      return date ? formatDate(date) : "N/A";
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
