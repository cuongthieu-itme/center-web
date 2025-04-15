import LoadingSpinner from "@/components/shared/loading-spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminStore } from "@/stores/useAdminStore";
import { UserType } from "@/types";
import { Activity, ArrowLeft, Calendar, Mail, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UserDetailPage() {
  const { id } = useParams();
  const { getUserById } = useAdminStore();
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!id) {
          setError("Không tìm thấy ID người dùng");
          return;
        }

        const userData = await getUserById(Number(id));
        if (userData) {
          setUser(userData);
        } else {
          setError("Không tìm thấy người dùng");
        }
      } catch (err) {
        setError("Đã xảy ra lỗi khi tải dữ liệu người dùng");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, getUserById]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
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
            <CardContent className="pt-6 text-center">
              <p className="text-red-500">{error}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const roleLabel = {
    admin: "Admin",
    teacher: "Giáo viên",
    student: "Học sinh",
  }[user.role] || "Không xác định";

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
          {/* Profile Card */}
          <Card>
            <CardHeader className="border-b">
              <CardTitle>Thông tin cá nhân</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-4">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-4xl">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h1 className="text-3xl font-bold">{user.name}</h1>
                  <p className="text-muted-foreground mt-2">{user.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Details Card */}
          <Card>
            <CardHeader className="border-b">
              <CardTitle>Chi tiết tài khoản</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid gap-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Vai trò</p>
                    <Badge
                      variant={
                        user.role === "admin" ? "destructive" :
                          user.role === "teacher" ? "default" :
                            "secondary"
                      }
                      className="mt-1"
                    >
                      {roleLabel}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Activity className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Trạng thái</p>
                    <Badge variant="default" className="mt-1">
                      Đang hoạt động
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ngày tạo</p>
                    <p className="font-medium mt-1">
                      {new Date(user.created_at).toLocaleDateString('vi-VN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium mt-1">{user.email}</p>
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