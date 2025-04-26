import { DataTable } from "@/components/shared/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useUserStore } from "../hooks/useUserStore";
import CreateUser from "./CreateUser";
import { columns } from "./UserColumns";

const filterName = "name";

export default function UserList() {
  const { getAllUsers, users, usersPagination, loading, setSelectedRole } = useUserStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const roleParam = searchParams.get("role");
    setSelectedRole(roleParam);
    getAllUsers(currentPage, roleParam || undefined);
  }, [getAllUsers, currentPage, searchParams, setSelectedRole]);

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

  const handleRoleChange = (value: string) => {
    if (value === "all") {
      searchParams.delete("role");
      setSearchParams(searchParams);
    } else {
      setSearchParams({ ...Object.fromEntries(searchParams), role: value });
    }
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Danh sách người dùng</h1>
          <div className="flex gap-4">
            <Select
              onValueChange={handleRoleChange}
              defaultValue={searchParams.get("role") || "all"}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Lọc theo vai trò" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="admin">Quản trị viên</SelectItem>
                <SelectItem value="teacher">Giáo viên</SelectItem>
                <SelectItem value="student">Học sinh</SelectItem>
              </SelectContent>
            </Select>
            <CreateUser />
          </div>
        </div>
        <DataTable
          columns={columns}
          data={users}
          filterName={filterName}
          loading={loading}
        />

        {usersPagination.last_page > 1 && (
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviousPage}
              disabled={currentPage === 1 || loading}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous Page</span>
            </Button>
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">{currentPage}</span>
              <span className="text-sm text-gray-400">của</span>
              <span className="text-sm font-medium">{usersPagination.last_page}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage === usersPagination.last_page || loading}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next Page</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}