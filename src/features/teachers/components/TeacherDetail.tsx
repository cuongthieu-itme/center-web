import LoadingSpinner from "@/components/shared/loading-spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, BookOpen, Calendar, Mail, Phone, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTeacherStore } from "../hooks/useTeacherStore";
import { TeacherDetail as TeacherDetailType } from "../types";

export default function TeacherDetail() {
  const { id } = useParams();
  const { getTeacherById } = useTeacherStore();
  const [teacher, setTeacher] = useState<TeacherDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!id) {
          setError("Không tìm thấy ID giáo viên");
          return;
        }

        const teacherData = await getTeacherById(Number(id));
        if (teacherData) {
          setTeacher(teacherData);
        } else {
          setError("Không tìm thấy giáo viên");
        }
      } catch (err) {
        setError("Đã xảy ra lỗi khi tải dữ liệu giáo viên");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacher();
  }, [id, getTeacherById]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !teacher) {
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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Profile Card */}
          <Card className="md:col-span-1">
            <CardHeader className="text-center">
              <Avatar className="mx-auto h-24 w-24">
                {teacher.avatar_url ? (
                  <AvatarImage src={"https://ui-avatars.com/api/?name=" + encodeURIComponent(teacher.full_name) + "&background=random"} alt={teacher.full_name} />
                ) : (
                  <AvatarFallback>
                    {teacher.full_name?.charAt(0)?.toUpperCase() || 'T'}
                  </AvatarFallback>
                )}
              </Avatar>
              <CardTitle className="mt-2">{teacher.full_name}</CardTitle>
              <Badge className="mt-1">{teacher.specialization || ''}</Badge>
            </CardHeader>
          </Card>

          {/* Details Card */}
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>Thông tin giáo viên</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <User className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Họ và tên</p>
                    <p className="font-medium">
                      {teacher.full_name || <span className="text-gray-400 italic">Chưa cập nhật</span>}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{teacher.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Số điện thoại</p>
                    <p className="font-medium">
                      {teacher.phone || <span className="text-gray-400 italic">Chưa cập nhật</span>}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <BookOpen className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Chuyên môn</p>
                    <p className="font-medium">
                      {teacher.specialization || <span className="text-gray-400 italic">Chưa cập nhật</span>}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Ngày tạo</p>
                    <p className="font-medium">{formatDate(teacher.created_at)}</p>
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