import { z } from 'zod'

export const jobPositionSchema = z.object({
  title: z.string().min(1,  "Title is required").max(255,  "Title cannot be longer than 255 characters"),
  description: z.string().min(1, "Description is required"),
  lastMessage: z.string().optional(),
  evaluationCriteria: z.string().optional()
})

export type JobPositionRequestDTO = z.infer<typeof jobPositionSchema>
