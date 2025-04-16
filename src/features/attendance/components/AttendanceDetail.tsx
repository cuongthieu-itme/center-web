import LoadingSpinner from "@/components/shared/loading-spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStudentStore } from "@/features/students/hooks/useStudentStore";
import { Student } from "@/features/students/types";
import { ArrowLeft, Calendar, Clock, Mail, MapPin, Phone, User } from "lucide-react";
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
const formatTimeOnly = (timeString: string | null): string => {
  if (!timeString) return "N/A";
  try {
    // Handle both ISO string and time-only string
    const time = timeString.includes('T') ? new Date(timeString) : new Date(`2000-01-01T${timeString}`);
    return time.toLocaleTimeString('vi-VN', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: false 
    });
  } catch {
    return "Invalid time";
  }
};

// Format date from ISO string to DD/MM/YYYY
const formatDateOnly = (dateString: string | null): string => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch {
    return "Invalid date";
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
    <div className="container mx-auto pb-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Quay lại
        </Button>

        {/* Student Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Thông tin học sinh
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="text-gray-500 h-5 w-5" />
                  <div>
                    <p className="text-sm text-gray-500">Họ và tên</p>
                    <p className="font-medium">{attendance.student?.full_name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="text-gray-500 h-5 w-5" />
                  <div>
                    <p className="text-sm text-gray-500">Ngày sinh</p>
                    <p className="font-medium">{formatDateOnly(attendance.student?.dob)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-gray-500 h-5 w-5" />
                  <div>
                    <p className="text-sm text-gray-500">Số điện thoại</p>
                    <p className="font-medium">{attendance.student?.phone}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="text-gray-500 h-5 w-5" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{attendance.student?.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="text-gray-500 h-5 w-5" />
                  <div>
                    <p className="text-sm text-gray-500">Địa chỉ</p>
                    <p className="font-medium">{attendance.student?.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Class Session Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Thông tin buổi học
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6">
              {/* Class Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 mb-3">Thông tin lớp học</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Calendar className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Mã lớp</p>
                      <p className="font-medium">{attendance.class_session?.class_id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Calendar className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Ngày học</p>
                      <p className="font-medium">{formatDateOnly(attendance.class_session?.session_date)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Session Time Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 mb-3">Thời gian buổi học</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Clock className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Giờ bắt đầu</p>
                      <p className="font-medium">{formatTimeOnly(attendance.class_session?.start_time)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-red-100 p-2 rounded-full">
                      <Clock className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Giờ kết thúc</p>
                      <p className="font-medium">{formatTimeOnly(attendance.class_session?.end_time)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Session Duration */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 mb-3">Thời lượng buổi học</h3>
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Clock className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Tổng thời gian</p>
                    <p className="font-medium">
                      {(() => {
                        if (attendance.class_session?.start_time && attendance.class_session?.end_time) {
                          const start = new Date(`2000-01-01T${attendance.class_session.start_time}`);
                          const end = new Date(`2000-01-01T${attendance.class_session.end_time}`);
                          const diff = end.getTime() - start.getTime();
                          const hours = Math.floor(diff / (1000 * 60 * 60));
                          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                          return `${hours} giờ ${minutes} phút`;
                        }
                        return "N/A";
                      })()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Thông tin điểm danh
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="text-gray-500 h-5 w-5" />
                  <div>
                    <p className="text-sm text-gray-500">Giờ vào</p>
                    <p className="font-medium">{formatTimeOnly(attendance.check_in_time)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="text-gray-500 h-5 w-5" />
                  <div>
                    <p className="text-sm text-gray-500">Giờ ra</p>
                    <p className="font-medium">{formatTimeOnly(attendance.check_out_time)}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-sm text-gray-500">Trạng thái</p>
                    <div>{renderStatusBadge(attendance.status)}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="text-gray-500 h-5 w-5" />
                  <div>
                    <p className="text-sm text-gray-500">Ngày tạo</p>
                    <p className="font-medium">{formatDateOnly(attendance.created_at)}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 