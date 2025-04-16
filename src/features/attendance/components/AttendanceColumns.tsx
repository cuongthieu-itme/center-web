import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Attendance } from "../types";
import AttendanceActionMenu from "./AttendanceActionMenu";

// Helper function to render the status badge with appropriate color
const renderStatusBadge = (status: string) => {
  const statusColors = {
    present: "bg-green-100 text-green-800 border-green-200",
    absent: "bg-red-100 text-red-800 border-red-200",
    late: "bg-yellow-100 text-yellow-800 border-yellow-200",
    excused: "bg-blue-100 text-blue-800 border-blue-200",
  };

  const statusLabels = {
    present: "Có mặt",
    absent: "Vắng mặt",
    late: "Đi muộn",
    excused: "Có phép",
  };

  return (
    <Badge className={statusColors[status as keyof typeof statusColors] || "bg-gray-100"}>
      {statusLabels[status as keyof typeof statusLabels] || status}
    </Badge>
  );
};

// Format time from ISO string to HH:MM:SS
const formatTimeOnly = (dateTimeString: string | null): string => {
  if (!dateTimeString) return "N/A";
  try {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString('vi-VN', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: false 
    });
  } catch {
    return "Invalid time";
  }
};

export const columns: ColumnDef<Attendance>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "student_id",
    header: "Mã học sinh",
  },
  {
    accessorKey: "session_id",
    header: "Buổi học",
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return renderStatusBadge(status);
    }
  },
  {
    accessorKey: "check_in_time",
    header: "Giờ vào",
    cell: ({ row }) => {
      const time = row.getValue("check_in_time") as string | null;
      return formatTimeOnly(time);
    }
  },
  {
    accessorKey: "check_out_time",
    header: "Giờ ra",
    cell: ({ row }) => {
      const time = row.getValue("check_out_time") as string | null;
      return formatTimeOnly(time);
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
      return <AttendanceActionMenu attendance={row.original} />;
    },
  },
]; 