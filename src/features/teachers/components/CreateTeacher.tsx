import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
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
import { z } from "zod";
import { useTeacherStore } from "../hooks/useTeacherStore";
import { TeacherFormData } from "../types";

const teacherSchema = z.object({
  full_name: z.string().min(1, { message: "Họ tên không được để trống" }),
  phone: z.string().min(1, { message: "Số điện thoại không được để trống" }),
  email: z.string().email({ message: "Email không hợp lệ" }),
  specialization: z.string().min(1, { message: "Chuyên môn không được để trống" }),
});

export default function CreateTeacher() {
  const [open, setOpen] = useState(false);
  const { createTeacher, loading, getAllTeachers } = useTeacherStore();
  const form = useForm<TeacherFormData>({
    resolver: zodResolver(teacherSchema),
    defaultValues: {
      full_name: "",
      phone: "",
      email: "",
      specialization: "",
    },
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      form.reset({
        full_name: "",
        phone: "",
        email: "",
        specialization: "",
      });
    }
  }, [open, form]);
  
  const onSubmit = async (values: TeacherFormData) => {
    try {
      setIsSubmitting(true);
      await createTeacher(values);
      // Explicitly refresh the teachers list on page 1 to show the new teacher
      await getAllTeachers(1);
      form.reset();
      setOpen(false);
    } catch (error) {
      console.error("Error creating teacher:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thêm giáo viên mới</DialogTitle>
          <DialogDescription>
            Nhập thông tin để tạo giáo viên mới.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Họ và tên</FormLabel>
                  <FormControl>
                    <Input placeholder="Nguyễn Văn A" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số điện thoại</FormLabel>
                  <FormControl>
                    <Input placeholder="0123456789" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="specialization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chuyên môn</FormLabel>
                  <FormControl>
                    <Input placeholder="Toán học" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setOpen(false)}
              >
                Hủy
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting || loading}
              >
                {isSubmitting ? "Đang tạo..." : "Tạo giáo viên"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
} 