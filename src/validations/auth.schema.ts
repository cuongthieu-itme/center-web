import { z } from "zod";

const emailSchema = z
  .string()
  .trim()
  .min(1, "Vui lòng nhập email")
  .email("Email không hợp lệ");

const passwordSchema = z
  .string()
  .trim()
  .min(1, "Vui lòng nhập mật khẩu")
  .min(8, "Mật khẩu phải có ít nhất 8 ký tự");

export const registerSchema = z.object({
  name: z.string().trim().min(1, "Vui lòng nhập tên").max(255, "Tên quá dài"),
  email: emailSchema,
  password: passwordSchema,
  role: z.enum(["admin", "teacher", "student"], {
    errorMap: () => ({ message: "Vui lòng chọn vai trò" }),
  }),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
export type RegisterSchemaType = z.infer<typeof registerSchema>;
