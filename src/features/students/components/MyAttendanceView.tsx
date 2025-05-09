import { useEffect, useState } from "react";
import { useStudentStore } from "../hooks/useStudentStore";
import { DataTable } from "@/components/shared/table";
import { columns } from "./MyAttendanceColumns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ClipboardCheck } from "lucide-react";

export default function MyAttendanceView() {
  const { getMyAttendance, myAttendance, myAttendancePagination, loading } = useStudentStore();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getMyAttendance(currentPage);
  }, [getMyAttendance, currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < myAttendancePagination.last_page) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Điểm danh của tôi</h1>
        <p className="text-muted-foreground">Xem lịch sử điểm danh của bạn</p>
      </div>

      {myAttendance.length === 0 && !loading ? (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Chưa có dữ liệu điểm danh</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="flex items-center justify-center p-8">
              <div className="flex flex-col items-center">
                <ClipboardCheck className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center">
                  Hiện tại chưa có dữ liệu điểm danh nào.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <DataTable columns={columns} data={myAttendance} loading={loading} />
          
          {myAttendancePagination.last_page > 1 && (
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
                <span className="text-sm font-medium">{myAttendancePagination.last_page}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage === myAttendancePagination.last_page}
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