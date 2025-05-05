import LoadingSpinner from "@/components/shared/loading-spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Calendar, Home, Mail, Phone, Upload, User as UserIcon } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStudentStore } from "../hooks/useStudentStore";
import { Student } from "../types";
import { toast } from "sonner";

export default function EditStudent() {
  const { id } = useParams();
  const { getStudentById, updateStudent, uploadFile, getFileUrl } = useStudentStore();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
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
          // If student has an avatar, set the preview
          if (studentData.avatar_url) {
            setAvatarPreview(getFileUrl(studentData.avatar_url));
          }
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
  }, [id, getStudentById, getFileUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarFile(file);
    // Create a preview URL
    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!student || !id) {
      return;
    }

    try {
      setSubmitting(true);
      
      // Upload the avatar file first if there is one
      let avatarFilename = student.avatar_url;
      if (avatarFile) {
        avatarFilename = await uploadFile(avatarFile, {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 100)
            );
            setUploadProgress(percentCompleted);
          },
          silent: true // Tắt thông báo tự động từ store
        });
        
        // Kiểm tra và hiển thị thông báo dựa vào kết quả
        if (avatarFilename) {
          toast.success("Tải ảnh lên thành công");
        } else {
          toast.error("Không thể tải ảnh lên. Vui lòng thử lại");
          setSubmitting(false);
          return;
        }
      }
      
      // Only include fields that can be updated
      const updatedData = {
        full_name: student.full_name,
        phone: student.phone,
        email: student.email,
        address: student.address,
        dob: student.dob,
        avatar_url: avatarFilename
      };
      
      await updateStudent(Number(id), updatedData);
      navigate(`/students/${id}`);
    } catch (err) {
      console.error("Error updating student:", err);
    } finally {
      setSubmitting(false);
      setUploadProgress(0);
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
                {/* Avatar Upload Section */}
                <div className="flex flex-col items-center gap-4">
                  <div 
                    className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200 bg-gray-50 flex items-center justify-center cursor-pointer"
                    onClick={handleUploadClick}
                  >
                    {avatarPreview ? (
                      <img 
                        src={avatarPreview} 
                        alt="Avatar Preview" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <UserIcon className="h-16 w-16 text-gray-400" />
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Upload className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={handleUploadClick}
                  >
                    {avatarFile ? 'Thay đổi ảnh' : 'Tải lên ảnh đại diện'}
                  </Button>
                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="w-full max-w-xs bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  )}
                </div>

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