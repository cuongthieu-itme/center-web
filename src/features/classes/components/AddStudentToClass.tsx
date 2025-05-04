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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStudentStore } from "@/features/students/hooks/useStudentStore";
import { Student } from "@/features/students/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useClassStore } from "../hooks/useClassStore";

const addStudentSchema = z.object({
  student_id: z.number().min(1, { message: "Vui lòng chọn học sinh" }),
});

type AddStudentFormData = z.infer<typeof addStudentSchema>;

interface AddStudentToClassProps {
  classId: number;
  onSuccess?: () => void;
}

export default function AddStudentToClass({ classId, onSuccess }: AddStudentToClassProps) {
  const [open, setOpen] = useState(false);
  const { addStudentToClass, loading } = useClassStore();
  const { getAllStudents } = useStudentStore();
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const loadStudents = async () => {
      try {
        await getAllStudents();
        const studentStore = useStudentStore.getState();
        setStudents(studentStore.students);
      } catch (error) {
        console.error("Error loading students:", error);
      }
    };

    loadStudents();
  }, [getAllStudents]);

  const form = useForm<AddStudentFormData>({
    resolver: zodResolver(addStudentSchema),
    defaultValues: {
      student_id: 0,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      form.reset({
        student_id: 0,
      });
    }
  }, [open, form]);

  const onSubmit = async (values: AddStudentFormData) => {
    try {
      setIsSubmitting(true);
      await addStudentToClass(classId, values.student_id);
      form.reset();
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error("Error adding student to class:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Thêm học sinh
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thêm học sinh vào lớp</DialogTitle>
          <DialogDescription>
            Chọn học sinh để thêm vào lớp học.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="student_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Học sinh</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn học sinh" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {students.map((student) => (
                        <SelectItem
                          key={student.id}
                          value={student.id.toString()}
                        >
                          {student.full_name}
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
                {isSubmitting ? "Đang thêm..." : "Thêm học sinh"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}