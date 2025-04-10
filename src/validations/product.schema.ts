import { z } from "zod";

export const productSchema = z.object({
  name: z.string().trim().min(4).max(255),
  description: z.string().min(4).max(255),
  price: z.string(),
  stock: z.string(),
});

export type productSchemaType = z.infer<typeof productSchema>;
