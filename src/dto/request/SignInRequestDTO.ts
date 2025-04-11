import { z } from "zod";

export const signInSchema = z.object({
  email: z.string()
    .min(1, { message: "Email is required" })
    .email({ message: "Email is not a well-formed email address" }),

  password: z.string()
    .min(1, { message: "Password is required" })
});

export type SignInRequestDTO = z.infer<typeof signInSchema>
