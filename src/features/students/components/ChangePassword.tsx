import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { changePasswordSchema, ChangePasswordSchemaType } from "@/validations/student.schema";
import { studentService } from "../services/studentService";
import { ArrowLeft, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  // Get user from localStorage instead of using the store directly
  const [studentId, setStudentId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const navigate = useNavigate();

  // Initialize student ID from localStorage on component mount
  useEffect(() => {
    try {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const userData = JSON.parse(userStr);
        if (userData && userData.id) {
          setStudentId(userData.id);
        } else {
          toast.error("Không tìm thấy thông tin học sinh");
        }
      } else {
        toast.error("Bạn cần đăng nhập để thực hiện thao tác này");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      toast.error("Có lỗi xảy ra khi lấy thông tin người dùng");
    } finally {
      setInitializing(false);
    }
  }, [navigate]);

  const form = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (values: ChangePasswordSchemaType) => {
    if (!studentId) {
      toast.error("Bạn cần đăng nhập để thực hiện thao tác này");
      return;
    }

    try {
      setLoading(true);
      
      await studentService.changePassword({
        student_id: studentId,
        current_password: values.current_password,
        new_password: values.new_password,
        confirm_password: values.confirm_password,
      });
      
      toast.success("Đổi mật khẩu thành công");
      form.reset();
    } catch (error: any) {
      console.error("Error changing password:", error);
      toast.error(error?.response?.data?.message || "Đã xảy ra lỗi khi đổi mật khẩu");
    } finally {
      setLoading(false);
    }
  };

  if (initializing) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Loader className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="max-w-md mx-auto">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Quay lại
        </Button>

        <Card>
          <CardHeader className="border-b">
            <CardTitle>Đổi mật khẩu</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="current_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mật khẩu hiện tại</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Nhập mật khẩu hiện tại"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="new_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mật khẩu mới</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Nhập mật khẩu mới"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirm_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Xác nhận mật khẩu mới</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Nhập lại mật khẩu mới"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end">
                  <Button type="submit" disabled={loading}>
                    {loading ? "Đang xử lý..." : "Đổi mật khẩu"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}