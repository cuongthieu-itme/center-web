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
    cell: ({ row }) => {
      // Just render the teacher ID for now - we'll handle teacher name display in the component
      return row.original.teacher ? `${row.original.class_name}` : "Chưa phân công";
    }
  },
  {
    accessorKey: "teacher_id",
    header: "Giáo viên",
    cell: ({ row }) => {
      // Just render the teacher ID for now - we'll handle teacher name display in the component
      return row.original.teacher ? `${row.original.teacher.full_name}` : "Chưa phân công";
    }
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