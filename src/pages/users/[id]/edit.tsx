import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAdminStore } from "@/stores/useAdminStore";
import { UserType } from "@/types";
import { ArrowLeft, Image, Mail, Save, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditUserPage() {
  const { id } = useParams();
  const { getUserById, updateUser } = useAdminStore();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await updateUser(user.id, user);
      navigate(`/users/${user.id}`);
    } catch (err) {
      setError("Đã xảy ra lỗi khi cập nhật thông tin người dùng");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
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
              <div className="flex flex-col items-center gap-4">
                <div className="text-6xl">😕</div>
                <h2 className="text-2xl font-bold">Không tìm thấy người dùng</h2>
                <p className="text-muted-foreground">
                  Người dùng bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!user) return null;

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
              <CardTitle>Chỉnh sửa thông tin người dùng</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid gap-8">
                {/* Avatar Section */}
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <img
                      src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`}
                      alt={user.name}
                      className="w-32 h-32 rounded-full object-cover border-4 border-primary/10"
                    />
                    <div className="absolute bottom-0 right-0 p-2 bg-primary rounded-full">
                      <Image className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div className="text-center">
                    <h2 className="text-xl font-semibold">{user.name}</h2>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Họ và tên
                    </Label>
                    <Input
                      id="name"
                      value={user.name}
                      onChange={(e) => setUser({ ...user, name: e.target.value })}
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
                      value={user.email}
                      onChange={(e) => setUser({ ...user, email: e.target.value })}
                      placeholder="Nhập email"
                      className="h-12"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="avatar" className="flex items-center gap-2">
                      <Image className="h-4 w-4" />
                      Avatar URL
                    </Label>
                    <Input
                      id="avatar"
                      value={user.avatar || ""}
                      onChange={(e) => setUser({ ...user, avatar: e.target.value })}
                      placeholder="Nhập URL avatar"
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