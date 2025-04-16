import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { StudentClass } from "../types";

export const studentClassColumns: ColumnDef<StudentClass>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Tên lớp",
  },
  {
    accessorKey: "description",
    header: "Mô tả",
  },
  {
    accessorKey: "teacher_name",
    header: "Giáo viên",
  },
  {
    accessorKey: "start_date",
    header: "Ngày bắt đầu",
    cell: ({ row }) => {
      const date = row.getValue("start_date") as string;
      return formatDate(date);
    }
  },
  {
    accessorKey: "end_date",
    header: "Ngày kết thúc",
    cell: ({ row }) => {
      const date = row.getValue("end_date") as string;
      return formatDate(date);
    }
  },
  {
    accessorKey: "createdAt",
    header: "Ngày tạo",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as string;
      return formatDate(date);
    }
  }
]; 