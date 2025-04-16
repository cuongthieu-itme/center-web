import { DataTable } from "@/components/shared/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useTeacherStore } from "../hooks/useTeacherStore";
import CreateTeacher from "./CreateTeacher";
import { columns } from "./TeacherColumns";

export default function TeacherList() {
  const { getAllTeachers, teachers, teachersPagination, loading } = useTeacherStore();
  const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(() => {
    getAllTeachers(currentPage);
  }, [getAllTeachers, currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < teachersPagination.last_page) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Danh sách giáo viên</h1>
        <CreateTeacher />
      </div>

      <div>
        <DataTable columns={columns} data={teachers} loading={loading} />
      </div>

      {teachersPagination.last_page > 1 && (
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
            <span className="text-sm font-medium">{teachersPagination.last_page}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === teachersPagination.last_page}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next Page</span>
          </Button>
        </div>
      )}
    </div>
  );
} 