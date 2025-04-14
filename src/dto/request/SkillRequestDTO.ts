import { z } from 'zod'

export const skillRequestSchema = z.object({
  description: z.string().min(1,  "Description is required"),
  jobPositionId: z.number(),
})

export type SkillRequestDTO = z.infer<typeof skillRequestSchema>
