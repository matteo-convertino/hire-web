import { z } from "zod";

export const messageRequestSchema = z.object({
  text: z.string().min(1, "Message is required")
});

export type MessageRequestDTO = z.infer<typeof messageRequestSchema>
