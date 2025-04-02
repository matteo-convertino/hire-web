import { InterviewResponseDTO } from "@/dto/response/InterviewResponseDTO";
import { SkillResponseDTO } from "@/dto/response/SkillResponseDTO";

export type ReportResponseDTO = {
  id: number
  value: number
  interview: InterviewResponseDTO
  skill: SkillResponseDTO
}
