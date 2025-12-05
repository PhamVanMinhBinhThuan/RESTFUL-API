import { z } from "zod";

export const ProductCreateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  price: z.number().positive("Price must be a positive number"),
  desc: z.string().min(5, "Description must be at least 5 characters"),
});

export const ProductIdSchema = z.object({
  id: z.string().regex(/^\d+$/, "ID is a number").transform(Number),
});

export const ProductQuerySchema = z.object({
  page: z
    .string()
    .regex(/^\d+$/, "Page is a number")
    .transform(Number)
    .optional()
    .default("1"),
  q: z.string().optional(),
});
