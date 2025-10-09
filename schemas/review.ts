import z from "../node_modules/zod/index.cjs";

export const ReviewSchema = z.object({
  review: z.string().min(1),
  rating: z.number().min(1).max(5),
});

export type Review = z.infer<typeof ReviewSchema>;
