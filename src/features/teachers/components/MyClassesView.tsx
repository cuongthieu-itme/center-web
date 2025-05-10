import { DataTable } from "@/components/shared/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, School } from "lucide-react";
import { useEffect, useState } from "react";
import { useTeacherStore } from "../hooks/useTeacherStore";
import { columns } from "./MyClassesColumns";
import { Pagination } from "@/components/shared/pagination";
import { useAuthStore } from "@/stores/useAuthStore";
import { Navigate } from "react-router-dom";
import { PROTECTED_ROUTES } from "@/routes/common/routesPath";

export default function MyClassesView() {
  const { getMyClasses, myClasses, myClassesPagination, loading } = useTeacherStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();

  // Redirect if user is not a teacher
  if (!user || user.role !== 'teacher') {
    console.log('Redirecting: Not a teacher user', user);
    return <Navigate to={PROTECTED_ROUTES.DASHBOARD} replace />;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getMyClasses(currentPage);
        setError(null);
      } catch (err) {
        console.error('Error fetching class schedule data:', err);
        setError('Không thể tải dữ liệu lịch học. Vui lòng thử lại sau hoặc liên hệ quản trị viên.');
      }
    };
    
    fetchData();
  }, [getMyClasses, currentPage]);

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lớp học phụ trách</h1>
          <p className="text-gray-500">Danh sách các lớp học và lịch giảng dạy của bạn</p>
        </div>
        <div className="flex items-center gap-2">
          <School className="w-6 h-6 text-indigo-500" />
          <span className="font-medium">{myClassesPagination.total} lớp học</span>
        </div>
      </div>

      {error ? (
        <div className="p-4 mb-6 border border-red-300 bg-red-50 rounded-md text-red-800">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="h-5 w-5" />
            <h3 className="font-medium">Lỗi</h3>
          </div>
          <p>{error}</p>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Lịch giảng dạy</CardTitle>
            <CardDescription>
              Lịch trình các buổi học cho từng lớp mà bạn đang phụ trách
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable 
              columns={columns} 
              data={myClasses} 
              loading={loading} 
            />
            
            {myClassesPagination.last_page > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={myClassesPagination.last_page}
                onPageChange={setCurrentPage}
              />
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
} 