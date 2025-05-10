import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export interface ClassData {
  class: {
    id: number;
    class_name: string;
    teacher_id: number;
    created_at: string;
    updated_at: string;
    teacher: {
      id: number;
      full_name: string;
      phone: string;
      email: string;
      specialization: string;
      avatar_url: string | null;
      user_id: number;
      created_at: string;
      updated_at: string;
      deleted_at: string | null;
    }
  };
  schedule: {
    id: number;
    class_id: number;
    session_date: string;
    start_time: string;
    end_time: string;
    notes: string | null;
    created_at: string;
    updated_at: string;
  }[];
}

export const columns: ColumnDef<ClassData>[] = [
  {
    accessorKey: "class.class_name",
    header: "Tên lớp học",
    cell: ({ row }) => row.original.class.class_name
  },
  {
    accessorKey: "class.teacher.specialization",
    header: "Chuyên môn",
    cell: ({ row }) => row.original.class.teacher.specialization
  },
  {
    accessorKey: "schedule",
    header: "Lịch học",
    cell: ({ row }) => {
      const schedule = row.original.schedule;
      if (!schedule || schedule.length === 0) {
        return "Chưa có lịch";
      }
      
      // Only show first 2 schedules to keep the table clean
      return (
        <div className="space-y-1">
          {schedule.slice(0, 2).map((session, index) => (
            <div key={index} className="text-xs">
              <div>{formatDate(session.session_date)}</div>
              <div>{session.start_time.substring(0, 5)} - {session.end_time.substring(0, 5)}</div>
            </div>
          ))}
          {schedule.length > 2 && (
            <div className="text-xs text-muted-foreground">
              +{schedule.length - 2} buổi khác
            </div>
          )}
        </div>
      );
    }
  },
  {
    accessorKey: "schedule.length",
    header: "Số buổi",
    cell: ({ row }) => row.original.schedule.length
  },
  {
    accessorKey: "class.created_at",
    header: "Ngày tạo",
    cell: ({ row }) => formatDate(row.original.class.created_at)
  }
]; 