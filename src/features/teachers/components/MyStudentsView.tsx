import { DataTable } from "@/components/shared/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ChevronLeft, ChevronRight, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useTeacherStore } from "../hooks/useTeacherStore";
import { columns } from "./MyStudentsColumns";
import { Pagination } from "@/components/shared/pagination";
import { useAuthStore } from "@/stores/useAuthStore";
import { Navigate, useNavigate } from "react-router-dom";
import { PROTECTED_ROUTES } from "@/routes/common/routesPath";
import { columns as attendanceColumns } from "./StudentAttendanceColumns";
import { StudentAttendance } from "./StudentAttendanceColumns";
import { StudentData } from "./MyStudentsColumns";

export default function MyStudentsView() {
  const { getMyStudents, myStudents, myStudentsPagination, loading, getStudentAttendance } = useTeacherStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
  const [studentAttendance, setStudentAttendance] = useState<StudentAttendance[]>([]);
  const [attendanceLoading, setAttendanceLoading] = useState(false);

  // Redirect if user is not a teacher
  if (!user || user.role !== 'teacher') {
    console.log('Redirecting: Not a teacher user', user);
    return <Navigate to={PROTECTED_ROUTES.DASHBOARD} replace />;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getMyStudents(currentPage);
        setError(null);
      } catch (err) {
        console.error('Error fetching student data:', err);
        setError('Không thể tải dữ liệu học sinh. Vui lòng thử lại sau hoặc liên hệ quản trị viên.');
      }
    };
    
    fetchData();
  }, [getMyStudents, currentPage]);

  useEffect(() => {
    const fetchStudentAttendance = async () => {
      if (selectedStudent) {
        setAttendanceLoading(true);
        try {
          const attendanceData = await getStudentAttendance(selectedStudent, 1);
          setStudentAttendance(attendanceData);
          setError(null);
        } catch (err) {
          console.error('Error fetching student attendance:', err);
          setError('Không thể tải dữ liệu điểm danh. Vui lòng thử lại sau.');
        } finally {
          setAttendanceLoading(false);
        }
      }
    };

    fetchStudentAttendance();
  }, [selectedStudent, getStudentAttendance]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < myStudentsPagination.last_page) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handleRowClick = (student: StudentData) => {
    setSelectedStudent(student.id);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Học sinh của tôi</h1>
          <p className="text-gray-500">Quản lý danh sách học sinh trong các lớp của bạn</p>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6 text-indigo-500" />
          <span className="font-medium">{myStudentsPagination.total} học sinh</span>
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
        <>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Danh sách học sinh</CardTitle>
              <CardDescription>
                Danh sách học sinh trong các lớp bạn đang giảng dạy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable 
                columns={columns} 
                data={myStudents} 
                loading={loading}
                onRowClick={handleRowClick}
              />
              
              {myStudentsPagination.last_page > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={myStudentsPagination.last_page}
                  onPageChange={setCurrentPage}
                />
              )}
            </CardContent>
          </Card>

          {selectedStudent && (
            <Card>
              <CardHeader>
                <CardTitle>Lịch sử điểm danh</CardTitle>
                <CardDescription>
                  Lịch sử điểm danh của học sinh
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable 
                  columns={attendanceColumns} 
                  data={studentAttendance} 
                  loading={attendanceLoading}
                />
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
} 