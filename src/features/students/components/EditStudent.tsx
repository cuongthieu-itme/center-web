import LoadingSpinner from "@/components/shared/loading-spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Calendar, Home, Mail, Phone, User as UserIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStudentStore } from "../hooks/useStudentStore";
import { Student } from "../types";

export default function EditStudent() {
  const { id } = useParams();
  const { getStudentById, updateStudent } = useStudentStore();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!id) {
          setError("Không tìm thấy ID học sinh");
          return;
        }

        const studentData = await getStudentById(Number(id));
        if (studentData) {
          setStudent(studentData);
        } else {
          setError("Không tìm thấy học sinh");
        }
      } catch (err) {
        setError("Đã xảy ra lỗi khi tải dữ liệu học sinh");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id, getStudentById]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!student || !id) {
      return;
    }

    try {
      setSubmitting(true);
      
      // Only include fields that can be updated
      const updatedData = {
        full_name: student.full_name,
        phone: student.phone,
        email: student.email,
        address: student.address,
        dob: student.dob
      };
      
      await updateStudent(Number(id), updatedData);
      navigate(`/students/${id}`);
    } catch (err) {
      console.error("Error updating student:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
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
              <CardTitle>Chỉnh sửa thông tin học sinh</CardTitle>
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
                      value={student.full_name || ""}
                      onChange={(e) => setStudent({ ...student, full_name: e.target.value })}
                      placeholder="Nhập họ và tên"
                      className="h-12"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="dob" className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Ngày sinh
                    </Label>
                    <Input
                      id="dob"
                      type="date"
                      value={student.dob ? new Date(student.dob).toISOString().split('T')[0] : ""}
                      onChange={(e) => setStudent({ ...student, dob: e.target.value })}
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
                      value={student.email || ""}
                      onChange={(e) => setStudent({ ...student, email: e.target.value })}
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
                      value={student.phone || ""}
                      onChange={(e) => setStudent({ ...student, phone: e.target.value })}
                      placeholder="Nhập số điện thoại"
                      className="h-12"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="address" className="flex items-center gap-2">
                      <Home className="h-4 w-4" />
                      Địa chỉ
                    </Label>
                    <Input
                      id="address"
                      value={student.address || ""}
                      onChange={(e) => setStudent({ ...student, address: e.target.value })}
                      placeholder="Nhập địa chỉ"
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    disabled={submitting} 
                    className="w-full md:w-auto"
                  >
                    {submitting ? "Đang lưu..." : "Lưu thay đổi"}
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