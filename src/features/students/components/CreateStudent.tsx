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
import { useStudentStore } from "../hooks/useStudentStore";
import { StudentFormData } from "../types";

const studentSchema = z.object({
  full_name: z.string().min(1, { message: "Họ tên không được để trống" }),
  dob: z.string().min(1, { message: "Ngày sinh không được để trống" }),
  phone: z.string().min(1, { message: "Số điện thoại không được để trống" }),
  email: z.string().email({ message: "Email không hợp lệ" }),
  address: z.string().min(1, { message: "Địa chỉ không được để trống" }),
});

export default function CreateStudent() {
  const [open, setOpen] = useState(false);
  const { createStudent, loading, getAllStudents } = useStudentStore();
  const form = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      full_name: "",
      dob: "",
      phone: "",
      email: "",
      address: "",
    },
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      form.reset({
        full_name: "",
        dob: "",
        phone: "",
        email: "",
        address: "",
      });
    }
  }, [open, form]);
  
  const onSubmit = async (values: StudentFormData) => {
    try {
      setIsSubmitting(true);
      await createStudent(values);
      // Explicitly refresh the students list on page 1 to show the new student
      await getAllStudents(1);
      form.reset();
      setOpen(false);
    } catch (error) {
      console.error("Error creating student:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thêm học sinh mới</DialogTitle>
          <DialogDescription>
            Nhập thông tin để tạo học sinh mới.
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
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ngày sinh</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
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
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Địa chỉ</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Đường ABC, Quận XYZ, TP HCM" {...field} />
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
                {isSubmitting ? "Đang tạo..." : "Tạo học sinh"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
} 