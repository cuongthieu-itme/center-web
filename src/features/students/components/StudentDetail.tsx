import LoadingSpinner from "@/components/shared/loading-spinner";
import { DataTable } from "@/components/shared/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, Calendar, Home, Mail, Pencil, Phone, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStudentStore } from "../hooks/useStudentStore";
import { Student } from "../types";
import { studentAttendanceColumns } from "./StudentAttendanceColumns";
import { studentClassColumns } from "./StudentClassColumns";

export default function StudentDetail() {
  const { id } = useParams();
  const { 
    getStudentById, 
    getStudentClasses, 
    getStudentAttendance,
    getFileUrl,
    studentClasses,
    studentAttendance,
    loading 
  } = useStudentStore();
  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        if (!id) {
          setError("Không tìm thấy ID học sinh");
          return;
        }

        const studentId = Number(id);
        const studentData = await getStudentById(studentId);
        
        if (studentData) {
          setStudent(studentData);
          
          // Load student classes and attendance
          await getStudentClasses(studentId);
          await getStudentAttendance(studentId);
        } else {
          setError("Không tìm thấy học sinh");
        }
      } catch (err) {
        setError("Đã xảy ra lỗi khi tải dữ liệu học sinh");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, getStudentById, getStudentClasses, getStudentAttendance]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh]">
        <p className="text-red-500">{error}</p>
        <Button
          variant="ghost"
          className="mt-4"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Quay lại
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="max-w-6xl mx-auto">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Quay lại
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Profile Card */}
          <Card className="md:col-span-1">
            <CardHeader className="text-center">
              <Avatar className="mx-auto h-24 w-24">
                {student.avatar_url ? (
                  <AvatarImage src={getFileUrl(student.avatar_url)} alt={student.full_name} />
                ) : (
                  <AvatarFallback>
                    {student.full_name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
              <CardTitle className="mt-2">{student.full_name}</CardTitle>
            </CardHeader>
          </Card>

          {/* Details Card */}
          <Card className="md:col-span-3">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Thông tin học sinh</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate(`/students/${id}/edit`)}
                >
                  <Pencil className="h-4 w-4 mr-2" />
                  Chỉnh sửa
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <User className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Họ và tên</p>
                    <p className="font-medium">{student.full_name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Ngày sinh</p>
                    <p className="font-medium">{formatDate(student.dob)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{student.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Số điện thoại</p>
                    <p className="font-medium">{student.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Home className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Địa chỉ</p>
                    <p className="font-medium">{student.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Ngày tạo</p>
                    <p className="font-medium">{formatDate(student.createdAt)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Student Classes */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Danh sách lớp học</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable 
              columns={studentClassColumns} 
              data={studentClasses} 
              loading={loading} 
            />
          </CardContent>
        </Card>

        {/* Student Attendance */}
        <Card>
          <CardHeader>
            <CardTitle>Danh sách điểm danh</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable 
              columns={studentAttendanceColumns} 
              data={studentAttendance} 
              loading={loading} 
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 