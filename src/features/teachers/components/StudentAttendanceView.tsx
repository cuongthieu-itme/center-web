import { DataTable } from "@/components/shared/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useTeacherStore } from "../hooks/useTeacherStore";
import { columns as attendanceColumns } from "./StudentAttendanceColumns";
import { StudentAttendance } from "./StudentAttendanceColumns";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";

export default function StudentAttendanceView() {
  const { id } = useParams();
  const { getStudentAttendance } = useTeacherStore();
  const [studentAttendance, setStudentAttendance] = useState<StudentAttendance[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentAttendance = async () => {
      if (id) {
        setLoading(true);
        try {
          const attendanceData = await getStudentAttendance(Number(id), 1);
          setStudentAttendance(attendanceData);
          setError(null);
        } catch (err) {
          console.error('Error fetching student attendance:', err);
          setError('Không thể tải dữ liệu điểm danh. Vui lòng thử lại sau.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchStudentAttendance();
  }, [id, getStudentAttendance]);

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="hover:bg-muted"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lịch sử điểm danh</h1>
          <p className="text-gray-500">Xem chi tiết lịch sử điểm danh của học sinh</p>
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
            <CardTitle>Danh sách điểm danh</CardTitle>
            <CardDescription>
              Lịch sử điểm danh của học sinh
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable 
              columns={attendanceColumns} 
              data={studentAttendance} 
              loading={loading}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
} 