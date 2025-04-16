import { DataTable } from "@/components/shared/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useClassStore } from "../hooks/useClassStore";
import { columns } from "./ClassColumns";
import CreateClass from "./CreateClass";

export default function ClassList() {
  const { getAllClasses, classes, classesPagination, loading } = useClassStore();
  const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(() => {
    getAllClasses(currentPage);
  }, [getAllClasses, currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < classesPagination.last_page) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Danh sách lớp học</h1>
        <CreateClass />
      </div>

      <div>
        <DataTable columns={columns} data={classes} loading={loading} />
      </div>

      {classesPagination.last_page > 1 && (
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
            <span className="text-sm font-medium">{classesPagination.last_page}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === classesPagination.last_page}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next Page</span>
          </Button>
        </div>
      )}
    </div>
  );
} 