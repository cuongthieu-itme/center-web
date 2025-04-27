import { DataTable } from "@/components/shared/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useAttendanceStore } from "../hooks/useAttendanceStore";
import { columns } from "./AttendanceColumns";
import CreateAttendance from "./CreateAttendance";
import { BASE_URL } from "@/lib/base-url";

export default function AttendanceList() {
  const { getAllAttendance, attendances, attendancePagination, loading } =
    useAttendanceStore();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getAllAttendance(currentPage);
  }, [getAllAttendance, currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < attendancePagination.last_page) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleClickExportExcel = (class_id: number = 0) => {
    window.open(`${BASE_URL}/export-attandance?class_id=${class_id}`)
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Danh sách điểm danh</h1>
        <Button
          onClick={() => handleClickExportExcel()}
          size={"lg"}
        >
          Xuất thông tin điểm danh
        </Button>
        <CreateAttendance />
      </div>

      <div>
        <DataTable columns={columns} data={attendances} loading={loading} />
      </div>

      {attendancePagination.last_page > 1 && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous Page</span>
          </Button>
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium">{currentPage}</span>
            <span className="text-sm text-gray-400">của</span>
            <span className="text-sm font-medium">
              {attendancePagination.last_page}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === attendancePagination.last_page}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next Page</span>
          </Button>
        </div>
      )}
    </div>
  );
}
