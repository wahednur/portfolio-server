import z from "zod";

export const createUserSchema = z.object({
  name: z.string().min(2, "Name is required and minimum value"),
  email: z.email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["USER", "ADMIN"]).optional(),
  photo: z.string().optional(),
});
