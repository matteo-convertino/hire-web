import { SkillResponseDTO } from "@/dto/response/SkillResponseDTO";

export type JobPositionResponseDTO = {
  id: number
  title: string
  description: string
  lastMessage: string
  evaluationCriteria: string
  skills: SkillResponseDTO[]
  userId: number
}
