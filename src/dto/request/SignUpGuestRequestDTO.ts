import { z } from "zod";

export const signUpGuestSchema = z.object({
  email: z.string()
    .min(1, { message: "Email is required" })
    .email({ message: "Email is not a well-formed email address" }),

  name: z.string()
    .min(1, { message: "Name is required" })
    .max(30, { message: "Name cannot be longer than 30 characters" }),

  surname: z.string()
    .min(1, { message: "Surname is required" })
    .max(30, { message: "Surname cannot be longer than 30 characters" })
});

export type SignUpGuestRequestDTO = z.infer<typeof signUpGuestSchema>
