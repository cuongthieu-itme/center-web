import LoadingSpinner from "@/components/shared/loading-spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStudentStore } from "@/features/students/hooks/useStudentStore";
import { Student } from "@/features/students/types";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, Calendar, ClipboardCheck, Clock, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAttendanceStore } from "../hooks/useAttendanceStore";
import { Attendance } from "../types";

// Helper function to render the status badge with appropriate color
const renderStatusBadge = (status: string) => {
  const statusColors = {
    present: "bg-green-100 text-green-800 border-green-200",
    absent: "bg-red-100 text-red-800 border-red-200",
    late: "bg-yellow-100 text-yellow-800 border-yellow-200",
    excused: "bg-blue-100 text-blue-800 border-blue-200",
  };

  const statusLabels = {
    present: "Có mặt",
    absent: "Vắng mặt",
    late: "Đi muộn",
    excused: "Có phép",
  };

  return (
    <Badge className={statusColors[status as keyof typeof statusColors] || "bg-gray-100"}>
      {statusLabels[status as keyof typeof statusLabels] || status}
    </Badge>
  );
};

// Format time from ISO string to HH:MM:SS
const formatTimeOnly = (dateTimeString: string | null): string => {
  if (!dateTimeString) return "N/A";
  try {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString('vi-VN', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: false 
    });
  } catch {
    return "Invalid time";
  }
};

export default function AttendanceDetail() {
  const { id } = useParams();
  const { getAttendanceById } = useAttendanceStore();
  const { getStudentById } = useStudentStore();
  const [attendance, setAttendance] = useState<Attendance | null>(null);
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!id) {
          setError("Không tìm thấy ID điểm danh");
          return;
        }

        const attendanceResult = await getAttendanceById(Number(id));
        if (attendanceResult) {
          setAttendance(attendanceResult);
          
          // Fetch student data if student_id exists
          if (attendanceResult.student_id) {
            const studentResult = await getStudentById(attendanceResult.student_id);
            if (studentResult) {
              setStudent(studentResult);
            }
          }
        } else {
          setError("Không tìm thấy thông tin điểm danh");
        }
      } catch (err) {
        setError("Đã xảy ra lỗi khi tải dữ liệu điểm danh");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, [id, getAttendanceById, getStudentById]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !attendance) {
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
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Quay lại
        </Button>

        <div className="grid gap-6">
          {/* Attendance Details Card */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin điểm danh</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <User className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Học sinh</p>
                    <p className="font-medium">
                      {student ? student.full_name : `ID học sinh: ${attendance.student_id}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Buổi học</p>
                    <p className="font-medium">
                      {`ID buổi học: ${attendance.session_id}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <ClipboardCheck className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Trạng thái</p>
                    <div>{renderStatusBadge(attendance.status)}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Giờ vào</p>
                    <p className="font-medium">{formatTimeOnly(attendance.check_in_time)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Giờ ra</p>
                    <p className="font-medium">{formatTimeOnly(attendance.check_out_time)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Ngày tạo</p>
                    <p className="font-medium">{formatDate(attendance.createdAt)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 