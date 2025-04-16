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
import { useStudentStore } from "@/features/students/hooks/useStudentStore";
import { Student } from "@/features/students/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { BadgePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAttendanceStore } from "../hooks/useAttendanceStore";
import { AttendanceFormData } from "../types";

// Since sessions might not exist yet, we'll mock a simple array of sessions
// This should be replaced with actual session data from an API
const mockSessions = [
  { id: 1, name: "Buổi sáng - 08:00" },
  { id: 2, name: "Buổi chiều - 13:30" },
  { id: 3, name: "Buổi tối - 18:00" },
];

const attendanceSchema = z.object({
  student_id: z.number().min(1, { message: "Vui lòng chọn học sinh" }),
  session_id: z.number().min(1, { message: "Vui lòng chọn buổi học" }),
  status: z.enum(["present", "absent", "late", "excused"], {
    message: "Vui lòng chọn trạng thái",
  }),
  check_in_time: z.string().optional(),
  check_out_time: z.string().optional(),
});

export default function CreateAttendance() {
  const [open, setOpen] = useState(false);
  const { createAttendance, loading } = useAttendanceStore();
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

  const form = useForm<AttendanceFormData>({
    resolver: zodResolver(attendanceSchema),
    defaultValues: {
      student_id: 0,
      session_id: 0,
      status: "present",
      check_in_time: undefined,
      check_out_time: undefined,
    },
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      form.reset({
        student_id: 0,
        session_id: 0,
        status: "present",
        check_in_time: undefined,
        check_out_time: undefined,
      });
    }
  }, [open, form]);
  
  const onSubmit = async (values: AttendanceFormData) => {
    try {
      setIsSubmitting(true);
      await createAttendance(values);
      form.reset();
      setOpen(false);
    } catch (error) {
      console.error("Error creating attendance:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const statusOptions = [
    { value: "present", label: "Có mặt" },
    { value: "absent", label: "Vắng mặt" },
    { value: "late", label: "Đi muộn" },
    { value: "excused", label: "Có phép" },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <BadgePlus className="mr-2 h-4 w-4" />
          Thêm điểm danh
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thêm điểm danh mới</DialogTitle>
          <DialogDescription>
            Nhập thông tin điểm danh cho học sinh.
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
            <FormField
              control={form.control}
              name="session_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Buổi học</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn buổi học" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {mockSessions.map((session) => (
                        <SelectItem
                          key={session.id}
                          value={session.id.toString()}
                        >
                          {session.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trạng thái</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {statusOptions.map((status) => (
                        <SelectItem
                          key={status.value}
                          value={status.value}
                        >
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="check_in_time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giờ vào</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="check_out_time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giờ ra</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} value={field.value || ""} />
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
                {isSubmitting ? "Đang tạo..." : "Tạo điểm danh"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
} 