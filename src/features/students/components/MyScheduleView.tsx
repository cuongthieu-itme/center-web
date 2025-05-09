import { DataTable } from "@/components/shared/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { useStudentStore } from "../hooks/useStudentStore";

// Define columns for the schedule table
const columns = [
  {
    accessorKey: "class_model.class_name",
    header: "Lớp học",
    cell: ({ row }: any) => {
      return row.original.class_model.class_name;
    },
  },
  {
    accessorKey: "session_date",
    header: "Ngày",
    cell: ({ row }: any) => {
      return new Date(row.original.session_date).toLocaleDateString('vi-VN');
    },
  },
  {
    accessorKey: "start_time",
    header: "Thời gian bắt đầu",
  },
  {
    accessorKey: "end_time",
    header: "Thời gian kết thúc",
  },
  {
    accessorKey: "notes",
    header: "Ghi chú",
    cell: ({ row }: any) => {
      return row.original.notes || "—";
    }
  }
];

export default function MyScheduleView() {
  const { getMySchedule, mySchedule, mySchedulePagination, loading } = useStudentStore();
  const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(() => {
    getMySchedule(currentPage);
  }, [getMySchedule, currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < mySchedulePagination.last_page) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Lịch của tôi</h1>
        <p className="text-muted-foreground">Xem lịch học của bạn</p>
      </div>

      {mySchedule.length === 0 && !loading ? (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Chưa có lịch học</CardTitle>
            <CardDescription>
              Bạn chưa có lịch học nào.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="flex items-center justify-center p-8">
              <div className="flex flex-col items-center">
                <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center">
                  Hiện tại chưa có buổi học nào được lên lịch.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <DataTable columns={columns} data={mySchedule} loading={loading} />
          
          {mySchedulePagination.last_page > 1 && (
            <div className="flex items-center justify-end space-x-2 py-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Trang trước</span>
              </Button>
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium">{currentPage}</span>
                <span className="text-sm text-gray-400">của</span>
                <span className="text-sm font-medium">{mySchedulePagination.last_page}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage === mySchedulePagination.last_page}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Trang sau</span>
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
} 