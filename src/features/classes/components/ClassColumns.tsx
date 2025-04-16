import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Class } from "../types";
import ClassActionMenu from "./ClassActionMenu";

export const columns: ColumnDef<Class>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "class_name",
    header: "Tên lớp",
  },
  {
    accessorKey: "teacher_id",
    header: "Giáo viên",
    cell: ({ row }) => {
      // Just render the teacher ID for now - we'll handle teacher name display in the component
      return `Giáo viên ID: ${row.getValue("teacher_id")}`;
    }
  },
  {
    accessorKey: "schedule",
    header: "Lịch học",
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
      return <ClassActionMenu classItem={row.original} />;
    },
  },
]; 