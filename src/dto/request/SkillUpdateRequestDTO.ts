import { z } from 'zod'

export const skillUpdateRequestSchema = z.object({
  description: z.string().min(1,  "Description is required"),
})

export type SkillUpdateRequestDTO = z.infer<typeof skillUpdateRequestSchema>
