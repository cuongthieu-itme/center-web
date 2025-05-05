import { z } from "zod";

export const changePasswordSchema = z.object({
  current_password: z
    .string()
    .min(1, "Vui lòng nhập mật khẩu hiện tại")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  new_password: z
    .string()
    .min(1, "Vui lòng nhập mật khẩu mới")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  confirm_password: z
    .string()
    .min(1, "Vui lòng xác nhận mật khẩu mới")
}).refine((data) => data.new_password === data.confirm_password, {
  message: "Mật khẩu xác nhận không khớp",
  path: ["confirm_password"],
});

export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>;