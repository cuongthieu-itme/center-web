import { DataTable } from "@/components/shared/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useClassSessionStore } from "../hooks/useClassSessionStore";
import { columns } from "./ClassSessionColumns";
import CreateClassSession from "./CreateClassSession";

export default function ClassSessionList() {
  const { getAllClassSessions, classSessions, classSessionsPagination, loading } = useClassSessionStore();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getAllClassSessions(currentPage);
  }, [getAllClassSessions, currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < classSessionsPagination.last_page) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Danh sách buổi học</h1>
        <CreateClassSession />
      </div>

      <div>
        <DataTable columns={columns} data={classSessions} loading={loading} />
      </div>

      {classSessionsPagination.last_page > 1 && (
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
            <span>Trang</span>
            <span className="font-semibold">
              {currentPage} / {classSessionsPagination.last_page}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === classSessionsPagination.last_page}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next Page</span>
          </Button>
        </div>
      )}
    </div>
  );
}

