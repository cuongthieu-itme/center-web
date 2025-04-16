import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Student } from "../types";
import StudentActionMenu from "./StudentActionMenu";

export const columns: ColumnDef<Student>[] = [
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
    accessorKey: "address",
    header: "Địa chỉ",
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
      return <StudentActionMenu student={row.original} />;
    },
  },
]; 