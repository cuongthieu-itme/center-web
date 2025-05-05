import { ColumnDef } from "@tanstack/react-table";
import { ClassSession } from "../types";
import ClassSessionActionMenu from "./ClassSessionActionMenu";

export const columns: ColumnDef<ClassSession>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "class_id",
    header: "Tên lớp",
    cell: ({ row }) => row.original?.class_model.class_name as string,
  },
  {
    accessorKey: "session_date",
    header: "Ngày học",
    cell: ({ row }) => row.getValue("session_date") as string,
  },
  {
    accessorKey: "start_time",
    header: "Bắt đầu",
    cell: ({ row }) => {
      const value = row.getValue("start_time") as string;
      return value.length === 5 ? value + ':00' : value;
    },
  },
  {
    accessorKey: "end_time",
    header: "Kết thúc",
    cell: ({ row }) => {
      const value = row.getValue("end_time") as string;
      return value.length === 5 ? value + ':00' : value;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Hành động",
    cell: ({ row }) => {
      return <ClassSessionActionMenu sessionItem={row.original} />;
    },
  },
];
