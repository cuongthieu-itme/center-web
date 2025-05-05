import LoadingSpinner from "@/components/shared/loading-spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/shared/table";
import { useTeacherStore } from "@/features/teachers/hooks/useTeacherStore";
import { TeacherDetail } from "@/features/teachers/types";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, Calendar, Pencil, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useClassStore } from "../hooks/useClassStore";
import { Class } from "../types";
import { classStudentColumns } from "./ClassStudentColumns";
import AddStudentToClass from "./AddStudentToClass";
import { Pagination } from "@/components/shared/pagination";

export default function ClassDetail() {
  const { id } = useParams();
  const { getClassById, loading, getStudentsByClass } = useClassStore();
  const { getTeacherById } = useTeacherStore();
  const [classData, setClassData] = useState<Class | null>(null);
  const [teacher, setTeacher] = useState<TeacherDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  // State for students pagination
  const [students, setStudents] = useState<any[]>([]);
  const [studentsPagination, setStudentsPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 10,
  });
  const [studentsLoading, setStudentsLoading] = useState(false);

  useEffect(() => {
    const loadClass = async () => {
      if (!id) return;
      try {
        setIsLoading(true);
        const data = await getClassById(parseInt(id));
        if (data) {
          setClassData(data);

          // Fetch teacher data if teacher_id exists
          if (data.teacher_id) {
            const teacherResult = await getTeacherById(data.teacher_id);
            if (teacherResult) {
              setTeacher(teacherResult);
            }
          }
          
          // Load students initially
          await loadStudents(parseInt(id), 1);
        } else {
          setError("Không tìm thấy lớp học");
        }
      } catch (error) {
        setError("Có lỗi xảy ra khi tải thông tin lớp học");
        console.error("Error loading class:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadClass();
  }, [id, getClassById, getTeacherById]);
  
  // Function to load students with pagination
  const loadStudents = async (classId: number, page: number) => {
    try {
      setStudentsLoading(true);
      const response = await getStudentsByClass(classId, page, studentsPagination.per_page, {});
      setStudents(response.students.data || []);
      setStudentsPagination({
        current_page: response.students.current_page,
        last_page: response.students.last_page,
        total: response.students.total,
        per_page: response.students.per_page,
      });
    } catch (error) {
      console.error("Error loading students:", error);
    } finally {
      setStudentsLoading(false);
    }
  };
  
  // Handle page change
  const handlePageChange = (page: number) => {
    if (!id) return;
    loadStudents(parseInt(id), page);
  };
  
  // Refresh student list (used after adding/removing students)
  const refreshStudents = () => {
    if (!id) return;
    loadStudents(parseInt(id), studentsPagination.current_page);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !classData) {
    return (
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Button>
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-red-500">{error || "Không tìm thấy lớp học"}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Quay lại
        </Button>

        {/* Class Info */}
        <Card className="mb-8">
          <CardHeader className="border-b">
            <div className="flex justify-between items-center">
              <CardTitle>Thông tin lớp học</CardTitle>
              <Button
                variant="outline"
                onClick={() => navigate(`/classes/${id}/edit`)}
              >
                <Pencil className="mr-2 h-4 w-4" />
                Chỉnh sửa
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-6">
              <div className="flex items-center gap-3">
                <User className="text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Tên lớp</p>
                  <p className="font-medium">{classData.class_name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <User className="text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Giáo viên chủ nhiệm</p>
                  <p className="font-medium">
                    {teacher ? teacher.full_name : "Chưa phân công"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Ngày tạo</p>
                  <p className="font-medium">{formatDate(classData.createdAt)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Class Students */}
        <Card>
          <CardHeader className="border-b">
            <div className="flex justify-between items-center">
              <CardTitle>Danh sách học sinh</CardTitle>
              <AddStudentToClass
                classId={classData.id}
                onSuccess={() => {
                  // Refresh students list after adding
                  refreshStudents();
                }}
              />
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <DataTable
              columns={classStudentColumns}
              data={students}
              loading={studentsLoading}
            />
            
            {/* Pagination */}
            {studentsPagination.total > 0 && (
              <div className="mt-4 flex justify-end">
                <Pagination
                  currentPage={studentsPagination.current_page}
                  totalPages={studentsPagination.last_page}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}