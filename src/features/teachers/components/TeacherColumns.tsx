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