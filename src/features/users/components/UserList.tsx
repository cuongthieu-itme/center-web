import { DataTable } from "@/components/shared/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useUserStore } from "../hooks/useUserStore";
import CreateUser from "./CreateUser";
import { columns } from "./UserColumns";

const filterName = "name";

export default function UserList() {
  const { getAllUsers, users, usersPagination, loading } = useUserStore();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getAllUsers(currentPage);
  }, [getAllUsers, currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < usersPagination.last_page) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Danh sách người dùng</h1>
          <CreateUser />
        </div>
        <DataTable
          columns={columns}
          data={users}
          filterName={filterName}
        />
        <div className="flex items-center justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousPage}
            disabled={currentPage === 1 || loading}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === usersPagination.last_page || loading}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
} 