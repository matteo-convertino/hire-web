import hireAxiosClient from "@/utils/hireAxiosClient";
import { JobPositionRoutes } from "@/utils/routes/jobPositionRoutes";
import { JobPositionResponseDTO } from "@/dto/response/JobPositionResponseDTO";
import { JobPositionRequestDTO } from "@/dto/request/JobPositionRequestDTO";
import { SkillRequestDTO } from "@/dto/request/SkillRequestDTO";
import { SkillResponseDTO } from "@/dto/response/SkillResponseDTO";
import { SkillRoutes } from "@/utils/routes/skillRoutes";
import { SkillUpdateRequestDTO } from "@/dto/request/SkillUpdateRequestDTO";

export default class SkillService {
  private static instance: SkillService;

  private constructor() {
  }

  public static getInstance(): SkillService {
    if (!SkillService.instance) {
      SkillService.instance = new SkillService();
    }

    return SkillService.instance;
  }

  public async save(skillRequestDTO: SkillRequestDTO): Promise<SkillResponseDTO> {
    return hireAxiosClient.post<SkillResponseDTO>(
      SkillRoutes.SAVE,
      skillRequestDTO
    ).then(res => res.data);
  }

  public async getById(id: number): Promise<SkillResponseDTO> {
    return hireAxiosClient.get<SkillResponseDTO>(
      SkillRoutes.FIND_BY_ID(id)
    ).then(res => res.data);
  }

  public async getByIdByJobPositionId(jobPositionId: number): Promise<SkillResponseDTO> {
    return hireAxiosClient.get<SkillResponseDTO>(
      SkillRoutes.FIND_BY_JOB_POSITION_ID(jobPositionId)
    ).then(res => res.data);
  }

  public async update(id: number, skillUpdateRequestDTO: SkillUpdateRequestDTO): Promise<SkillResponseDTO> {
    return hireAxiosClient.put<SkillResponseDTO>(
      SkillRoutes.UPDATE(id),
      skillUpdateRequestDTO
    ).then(res => res.data);
  }

  public async delete(id: number): Promise<SkillResponseDTO> {
    return hireAxiosClient.delete<SkillResponseDTO>(
      SkillRoutes.DELETE(id)
    ).then(res => res.data);
  }
}
