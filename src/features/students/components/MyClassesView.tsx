import { DataTable } from "@/components/shared/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, School } from "lucide-react";
import { useEffect, useState } from "react";
import { useStudentStore } from "../hooks/useStudentStore";

// Define columns for the classes table
const columns = [
  {
    accessorKey: "class_model.class_name",
    header: "Tên lớp",
    cell: ({ row }: any) => {
      return row.original.class_model.class_name;
    },
  },
  {
    accessorKey: "class_model.teacher.full_name",
    header: "Giáo viên",
    cell: ({ row }: any) => {
      return row.original.class_model.teacher.full_name;
    },
  },
  {
    accessorKey: "class_model.teacher.specialization",
    header: "Chuyên môn",
    cell: ({ row }: any) => {
      return row.original.class_model.teacher.specialization;
    },
  },
  {
    accessorKey: "class_model.created_at",
    header: "Ngày tạo",
    cell: ({ row }: any) => {
      return new Date(row.original.class_model.created_at).toLocaleDateString('vi-VN');
    },
  },
];

export default function MyClassesView() {
  const { getMyClasses, myClasses, myClassesPagination, loading } = useStudentStore();
  const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(() => {
    getMyClasses(currentPage);
  }, [getMyClasses, currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < myClassesPagination.last_page) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Lớp của tôi</h1>
        <p className="text-muted-foreground">Xem danh sách các lớp học của bạn</p>
      </div>

      {myClasses.length === 0 && !loading ? (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Chưa có lớp học</CardTitle>
            <CardDescription>
              Bạn chưa được đăng ký vào lớp học nào.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="flex items-center justify-center p-8">
              <div className="flex flex-col items-center">
                <School className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center">
                  Liên hệ với trung tâm để được đăng ký vào lớp học.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <DataTable columns={columns} data={myClasses} loading={loading} />
          
          {myClassesPagination.last_page > 1 && (
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
                <span className="text-sm font-medium">{myClassesPagination.last_page}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage === myClassesPagination.last_page}
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