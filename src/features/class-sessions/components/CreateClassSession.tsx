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
import { useClassStore } from "@/features/classes/hooks/useClassStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useClassSessionStore } from "../hooks/useClassSessionStore";

const sessionSchema = z.object({
  class_id: z.number().min(1, { message: "Vui lòng chọn lớp" }),
  session_date: z.string().min(1, { message: "Ngày học không được để trống" }),
  start_time: z.string().min(1, { message: "Thời gian bắt đầu không được để trống" }),
  end_time: z.string().min(1, { message: "Thời gian kết thúc không được để trống" }),
});

type SessionFormValues = z.infer<typeof sessionSchema>;

export default function CreateClassSession() {
  const [open, setOpen] = useState(false);
  const { createClassSession, loading, getAllClassSessions } = useClassSessionStore();
  const { getAllClasses, classes } = useClassStore();

  useEffect(() => {
    getAllClasses();
  }, [getAllClasses]);

  const form = useForm<SessionFormValues>({
    resolver: zodResolver(sessionSchema),
    defaultValues: {
      class_id: 0,
      session_date: "",
      start_time: "",
      end_time: "",
    },
  });

  const onSubmit = async (values: SessionFormValues) => {
    await createClassSession(values);
    await getAllClassSessions(1);
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <CalendarPlus className="mr-2 h-4 w-4" /> Thêm buổi học
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thêm buổi học mới</DialogTitle>
          <DialogDescription>Nhập thông tin buổi học</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="class_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lớp</FormLabel>
                  <Select
                    onValueChange={value => field.onChange(Number(value))}
                    value={field.value ? String(field.value) : undefined}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn lớp" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {classes.map(cls => (
                        <SelectItem key={cls.id} value={String(cls.id)}>
                          {cls.class_name}
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
              name="session_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ngày học</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="start_time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bắt đầu</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="end_time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kết thúc</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              Tạo buổi học
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

