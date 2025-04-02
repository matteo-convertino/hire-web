import hireApiClient from "@/utils/hireApiClient";
import { SkillResponseDTO } from "@/dto/response/SkillResponseDTO";
import { InterviewResponseDTO } from "@/dto/response/InterviewResponseDTO";
import { ReportRoutes } from "@/utils/routes/reportRoutes";

export default class ReportService {
  private static instance: ReportService;

  private constructor() {
  }

  public static getInstance(): ReportService {
    if (!ReportService.instance) {
      ReportService.instance = new ReportService();
    }

    return ReportService.instance;
  }

  public async getById(id: number): Promise<InterviewResponseDTO> {
    return hireApiClient.get<InterviewResponseDTO>(
      ReportRoutes.FIND_BY_ID(id)
    ).then(res => res.data);
  }

  public async getByIdByInterviewId(interviewId: number): Promise<SkillResponseDTO> {
    return hireApiClient.get<SkillResponseDTO>(
      ReportRoutes.FIND_BY_INTERVIEW_ID(interviewId)
    ).then(res => res.data);
  }

  public async getAllByUser(): Promise<InterviewResponseDTO[]> {
    return hireApiClient.put<InterviewResponseDTO[]>(
      ReportRoutes.FIND_ALL_BY_USER
    ).then(res => res.data);
  }
}
