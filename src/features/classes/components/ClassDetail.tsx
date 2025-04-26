import LoadingSpinner from "@/components/shared/loading-spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTeacherStore } from "@/features/teachers/hooks/useTeacherStore";
import { TeacherDetail } from "@/features/teachers/types";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, Calendar, School, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useClassStore } from "../hooks/useClassStore";
import { Class } from "../types";

export default function ClassDetail() {
  const { id } = useParams();
  const { getClassById } = useClassStore();
  const { getTeacherById } = useTeacherStore();
  const [classData, setClassData] = useState<Class | null>(null);
  const [teacher, setTeacher] = useState<TeacherDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!id) {
          setError("Không tìm thấy ID lớp học");
          return;
        }

        const classResult = await getClassById(Number(id));
        if (classResult) {
          setClassData(classResult);

          // Fetch teacher data if teacher_id exists
          if (classResult.teacher_id) {
            const teacherResult = await getTeacherById(classResult.teacher_id);
            if (teacherResult) {
              setTeacher(teacherResult);
            }
          }
        } else {
          setError("Không tìm thấy lớp học");
        }
      } catch (err) {
        setError("Đã xảy ra lỗi khi tải dữ liệu lớp học");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClassData();
  }, [id, getClassById, getTeacherById]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !classData) {
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

  console.log(teacher);


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
          {/* Class Details Card */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin lớp học</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <School className="text-gray-500" />
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
        </div>
      </div>
    </div>
  );
}