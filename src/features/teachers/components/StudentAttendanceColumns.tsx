import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export interface StudentAttendance {
  id: number;
  student_id: number;
  session_id: number;
  status: string;
  check_in_time: string;
  check_out_time: string;
  created_at: string;
  updated_at: string;
  class_session: {
    id: number;
    class_id: number;
    session_date: string;
    start_time: string;
    end_time: string;
    notes: string | null;
    created_at: string;
    updated_at: string;
    class_model: {
      id: number;
      class_name: string;
      teacher_id: number;
      created_at: string;
      updated_at: string;
    };
  };
}

export const columns: ColumnDef<StudentAttendance>[] = [
  {
    accessorKey: "class_session.class_model.class_name",
    header: "Lớp học",
  },
  {
    accessorKey: "class_session.session_date",
    header: "Ngày học",
    cell: ({ row }) => formatDate(row.original.class_session.session_date),
  },
  {
    accessorKey: "class_session.start_time",
    header: "Giờ bắt đầu",
  },
  {
    accessorKey: "class_session.end_time",
    header: "Giờ kết thúc",
  },
  {
    accessorKey: "check_in_time",
    header: "Giờ điểm danh",
  },
  {
    accessorKey: "check_out_time",
    header: "Giờ kết thúc",
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          variant="outline"
          className={
            status === "present"
              ? "bg-green-100 text-green-800 border-green-200"
              : status === "absent"
              ? "bg-red-100 text-red-800 border-red-200"
              : "bg-yellow-100 text-yellow-800 border-yellow-200"
          }
        >
          {status === "present"
            ? "Có mặt"
            : status === "absent"
            ? "Vắng mặt"
            : "Có phép"}
        </Badge>
      );
    },
  },
]; 