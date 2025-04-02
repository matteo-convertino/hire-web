import hireApiClient from "@/utils/hireApiClient";
import { SkillResponseDTO } from "@/dto/response/SkillResponseDTO";
import { InterviewResponseDTO } from "@/dto/response/InterviewResponseDTO";
import { InterviewRequestDTO } from "@/dto/request/InterviewRequestDTO";
import { InterviewRoutes } from "@/utils/routes/interviewRoutes";

export default class InterviewService {
  private static instance: InterviewService;

  private constructor() {
  }

  public static getInstance(): InterviewService {
    if (!InterviewService.instance) {
      InterviewService.instance = new InterviewService();
    }

    return InterviewService.instance;
  }

  public async save(interviewRequestDTO: InterviewRequestDTO): Promise<InterviewResponseDTO> {
    return hireApiClient.post<InterviewResponseDTO>(
      InterviewRoutes.SAVE,
      interviewRequestDTO
    ).then(res => res.data);
  }

  public async getById(id: number): Promise<InterviewResponseDTO> {
    return hireApiClient.get<InterviewResponseDTO>(
      InterviewRoutes.FIND_BY_ID(id)
    ).then(res => res.data);
  }

  public async getByIdByJobPositionId(jobPositionId: number): Promise<SkillResponseDTO> {
    return hireApiClient.get<SkillResponseDTO>(
      InterviewRoutes.FIND_BY_JOB_POSITION_ID(jobPositionId)
    ).then(res => res.data);
  }

  public async getAllByUser(): Promise<InterviewResponseDTO[]> {
    return hireApiClient.put<InterviewResponseDTO[]>(
      InterviewRoutes.FIND_ALL_BY_USER
    ).then(res => res.data);
  }
}
