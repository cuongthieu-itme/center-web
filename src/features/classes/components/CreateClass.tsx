import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTeacherStore } from "@/features/teachers/hooks/useTeacherStore";
import { Teacher } from "@/features/teachers/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { BadgePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useClassStore } from "../hooks/useClassStore";
import { ClassFormData } from "../types";

const classSchema = z.object({
  class_name: z.string().min(1, { message: "Tên lớp không được để trống" }),
  teacher_id: z.number().min(1, { message: "Vui lòng chọn giáo viên" }),
});

export default function CreateClass() {
  const [open, setOpen] = useState(false);
  const { createClass, loading, getAllClasses } = useClassStore();
  const { getAllTeachers } = useTeacherStore();
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    const loadTeachers = async () => {
      try {
        await getAllTeachers();
        const teacherStore = useTeacherStore.getState();
        setTeachers(teacherStore.teachers);
      } catch (error) {
        console.error("Error loading teachers:", error);
      }
    };

    loadTeachers();
  }, [getAllTeachers]);

  const form = useForm<ClassFormData>({
    resolver: zodResolver(classSchema),
    defaultValues: {
      class_name: "",
      teacher_id: 0,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      form.reset({
        class_name: "",
        teacher_id: 0,
      });
    }
  }, [open, form]);

  const onSubmit = async (values: ClassFormData) => {
    try {
      setIsSubmitting(true);
      await createClass(values);
      // Explicitly refresh the classes list on page 1 to show the new class
      await getAllClasses(1);
      form.reset();
      setOpen(false);
    } catch (error) {
      console.error("Error creating class:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <BadgePlus className="mr-2 h-4 w-4" />
          Thêm lớp học
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thêm lớp học mới</DialogTitle>
          <DialogDescription>
            Nhập thông tin để tạo lớp học mới.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="class_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên lớp</FormLabel>
                  <FormControl>
                    <Input placeholder="Tên lớp" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="teacher_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giáo viên chủ nhiệm</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn giáo viên" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {teachers.map((teacher) => (
                        <SelectItem
                          key={teacher.id}
                          value={teacher.id.toString()}
                        >
                          {teacher.teacher?.full_name || teacher.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                {isSubmitting ? "Đang tạo..." : "Tạo lớp học"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}