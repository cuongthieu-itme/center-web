import { z } from "zod";

export const emailSchema = z
  .string()
  .trim()
  .email("Please enter a valid email address.")
  .min(1)
  .max(255);

export const passwordSchema = z
  .string()
  .trim()
  .min(4, { message: "Please check your password." });

export const registerSchema = z.object({
  username: z.string().trim().min(1).max(255),
  email: emailSchema,
  password: passwordSchema,
  role: z.enum(["ADMIN", "MANAGER"]),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
export type RegisterSchemaType = z.infer<typeof registerSchema>;
