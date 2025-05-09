import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";

interface ClassModel {
  id: number;
  class_name: string;
  teacher_id: number;
}

interface ClassSession {
  id: number;
  class_id: number;
  session_date: string;
  start_time: string;
  end_time: string;
  notes: string | null;
  class_model: ClassModel;
}

interface StudentAttendance {
  id: number;
  student_id: number;
  session_id: number;
  status: "present" | "absent" | "late";
  check_in_time: string;
  check_out_time: string;
  class_session: ClassSession;
}

// Format date from YYYY-MM-DD to DD/MM/YYYY
const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
};

export const columns: ColumnDef<StudentAttendance>[] = [
  {
    accessorKey: "class_session.session_date",
    header: "Ngày",
    cell: ({ row }) => {
      const date = row.original.class_session.session_date;
      return formatDate(date);
    }
  },
  {
    accessorKey: "class_session.class_model.class_name",
    header: "Lớp học",
    cell: ({ row }) => {
      return row.original.class_session.class_model.class_name;
    }
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      
      switch (status) {
        case "present":
          return (
            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
              Có mặt
            </Badge>
          );
        case "absent":
          return (
            <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
              Vắng mặt
            </Badge>
          );
        case "late":
          return (
            <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
              Đi muộn
            </Badge>
          );
        default:
          return null;
      }
    }
  },
  {
    accessorKey: "check_in_time",
    header: "Giờ vào",
  },
  {
    accessorKey: "check_out_time",
    header: "Giờ ra",
  },
  {
    accessorKey: "class_session.notes",
    header: "Ghi chú",
    cell: ({ row }) => {
      return row.original.class_session.notes || "—";
    }
  }
]; 