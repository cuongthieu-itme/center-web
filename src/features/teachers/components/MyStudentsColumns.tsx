import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "@/lib/utils";

export interface StudentData {
  id: number;
  full_name: string;
  dob: string;
  phone: string;
  email: string;
  address: string;
  avatar_url: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  vector: string | null;
  pivot: {
    class_id: number;
    student_id: number;
  };
}

export const columns: ColumnDef<StudentData>[] = [
  {
    accessorKey: "full_name",
    header: "Học sinh",
    cell: ({ row }) => {
      const student = row.original;
      const initials = student.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();

      return (
        <div className="flex items-center gap-3">
          <Avatar>
            {student.avatar_url ? (
              <AvatarImage src={student.avatar_url} alt={student.full_name} />
            ) : null}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{student.full_name}</p>
            <p className="text-sm text-gray-500">{student.email}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "Số điện thoại",
  },
  {
    accessorKey: "dob",
    header: "Ngày sinh",
    cell: ({ row }) => formatDate(row.original.dob),
  },
  {
    accessorKey: "address",
    header: "Địa chỉ",
  },
  {
    accessorKey: "created_at",
    header: "Ngày tạo",
    cell: ({ row }) => formatDate(row.original.created_at),
  },
]; 