import { ChatRoleEnum } from "@/utils/ChatRole";
import { z } from "zod";

export const messageResponseSchema = z.object({
  id: z.number(),
  text: z.string(),
  interviewId: z.number(),
  lastMessage: z.boolean(),
  role: ChatRoleEnum
});

export type MessageResponseDTO = z.infer<typeof messageResponseSchema>;
