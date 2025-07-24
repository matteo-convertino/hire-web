import hireAxiosClient from "@/utils/hireAxiosClient";
import { ReportRoutes } from "@/utils/routes/reportRoutes";
import { ReportResponseDTO } from "@/dto/response/ReportResponseDTO";

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

  public async getAll(): Promise<ReportResponseDTO[]> {
    return hireAxiosClient.get<ReportResponseDTO[]>(
      ReportRoutes.FIND_ALL_BY_USER
    ).then(res => res.data);
  }

  public async getById(id: number): Promise<ReportResponseDTO> {
    return hireAxiosClient.get<ReportResponseDTO>(
      ReportRoutes.FIND_BY_ID(id)
    ).then(res => res.data);
  }

  public async getByInterviewId(interviewId: number): Promise<ReportResponseDTO> {
    return hireAxiosClient.get<ReportResponseDTO>(
      ReportRoutes.FIND_BY_INTERVIEW_ID(interviewId)
    ).then(res => res.data);
  }
}
