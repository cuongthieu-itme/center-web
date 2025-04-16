import { DataTable } from "@/components/shared/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useStudentStore } from "../hooks/useStudentStore";
import CreateStudent from "./CreateStudent";
import { columns } from "./StudentColumns";

export default function StudentList() {
  const { getAllStudents, students, studentsPagination, loading } = useStudentStore();
  const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(() => {
    getAllStudents(currentPage);
  }, [getAllStudents, currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < studentsPagination.last_page) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Danh sách học sinh</h1>
        <CreateStudent />
      </div>

      <div>
        <DataTable columns={columns} data={students} loading={loading} />
      </div>

      {studentsPagination.last_page > 1 && (
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
            <span className="text-sm font-medium">{studentsPagination.last_page}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === studentsPagination.last_page}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next Page</span>
          </Button>
        </div>
      )}
    </div>
  );
} 