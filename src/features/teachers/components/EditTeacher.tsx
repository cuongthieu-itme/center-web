import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, BookOpen, Mail, Phone, Save, User as UserIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTeacherStore } from "../hooks/useTeacherStore";
import { TeacherDetail as TeacherDetailType } from "../types";

export default function EditTeacher() {
  const { id } = useParams();
  const { getTeacherById, updateTeacher } = useTeacherStore();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacher) return;

    try {
      await updateTeacher(Number(id), {
        teacher: {
          id: teacher.id,
          full_name: teacher.full_name,
          phone: teacher.phone,
          email: teacher.email,
          specialization: teacher.specialization,
          user_id: teacher.user_id,
          created_at: teacher.created_at,
          updated_at: teacher.updated_at
        }
      });
      navigate(`/teachers/${id}`);
    } catch (err) {
      setError("Đã xảy ra lỗi khi cập nhật thông tin giáo viên");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
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

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader className="border-b">
              <CardTitle>Chỉnh sửa thông tin giáo viên</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid gap-8">
                {/* Form Fields */}
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="full_name" className="flex items-center gap-2">
                      <UserIcon className="h-4 w-4" />
                      Họ và tên
                    </Label>
                    <Input
                      id="full_name"
                      value={teacher.full_name || ""}
                      onChange={(e) => setTeacher({ ...teacher, full_name: e.target.value })}
                      placeholder="Nhập họ và tên"
                      className="h-12"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={teacher.email || ""}
                      onChange={(e) => setTeacher({ ...teacher, email: e.target.value })}
                      placeholder="Nhập email"
                      className="h-12"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Số điện thoại
                    </Label>
                    <Input
                      id="phone"
                      value={teacher.phone || ""}
                      onChange={(e) => setTeacher({ ...teacher, phone: e.target.value })}
                      placeholder="Nhập số điện thoại"
                      className="h-12"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="specialization" className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Chuyên môn
                    </Label>
                    <Input
                      id="specialization"
                      value={teacher.specialization || ""}
                      onChange={(e) => setTeacher({ ...teacher, specialization: e.target.value })}
                      placeholder="Nhập chuyên môn"
                      className="h-12"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate(-1)}
                  >
                    Hủy
                  </Button>
                  <Button type="submit" className="gap-2">
                    <Save className="h-4 w-4" />
                    Lưu thay đổi
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
} 