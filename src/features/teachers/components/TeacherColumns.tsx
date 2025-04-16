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
    accessorKey: "specialization",
    header: "Chuyên môn",
  },
  {
    accessorKey: "createdAt",
    header: "Ngày tạo",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as string;
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