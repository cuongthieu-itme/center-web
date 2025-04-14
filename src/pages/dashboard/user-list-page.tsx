import { DataTable } from "@/components/shared/table";
import { columns } from "@/components/site/users/user-column";
import { Button } from "@/components/ui/button";
import { useAdminStore } from "@/stores/useAdminStore";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const filterName = "role";

export default function UserListPage() {
  const { getAllUsers, users, usersPagination, loading } = useAdminStore();
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
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý người dùng</h1>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          <DataTable
            columns={columns}
            data={users ?? []}
            filterName={filterName}
          />

          {usersPagination.total > 0 && (
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-muted-foreground">
                Showing {usersPagination.from} to {usersPagination.to} of {usersPagination.total} results
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>

                <div className="flex items-center justify-center w-12 h-8 rounded-md border">
                  {currentPage}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextPage}
                  disabled={currentPage === usersPagination.last_page}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}
