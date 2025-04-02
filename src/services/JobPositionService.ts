import hireApiClient from "@/utils/hireApiClient";
import { JobPositionRoutes } from "@/utils/routes/jobPositionRoutes";
import { JobPositionResponseDTO } from "@/dto/response/JobPositionResponseDTO";
import { JobPositionRequestDTO } from "@/dto/request/JobPositionRequestDTO";

export default class JobPositionService {
  private static instance: JobPositionService;

  private constructor() {
  }

  public static getInstance(): JobPositionService {
    if (!JobPositionService.instance) {
      JobPositionService.instance = new JobPositionService();
    }

    return JobPositionService.instance;
  }

  public async save(jobPositionRequestDTO: JobPositionRequestDTO): Promise<JobPositionResponseDTO> {
    return hireApiClient.post<JobPositionResponseDTO>(
      JobPositionRoutes.SAVE,
      jobPositionRequestDTO
    ).then(res => res.data);
  }

  public async getAll(): Promise<JobPositionResponseDTO[]> {
    return hireApiClient.get<JobPositionResponseDTO[]>(
      JobPositionRoutes.FIND_ALL
    ).then(res => res.data);
  }

  public async getAllByUser(): Promise<JobPositionResponseDTO[]> {
    return hireApiClient.get<JobPositionResponseDTO[]>(
      JobPositionRoutes.FIND_ALL_BY_USER
    ).then(res => res.data);
  }

  public async getById(id: number): Promise<JobPositionResponseDTO> {
    return hireApiClient.get<JobPositionResponseDTO>(
      JobPositionRoutes.FIND_BY_ID(id)
    ).then(res => res.data);
  }

  public async update(id: number, jobPositionRequestDTO: JobPositionRequestDTO): Promise<JobPositionResponseDTO> {
    return hireApiClient.put<JobPositionResponseDTO>(
      JobPositionRoutes.UPDATE(id),
      jobPositionRequestDTO
    ).then(res => res.data);
  }

  public async delete(id: number): Promise<JobPositionResponseDTO> {
    return hireApiClient.delete<JobPositionResponseDTO>(
      JobPositionRoutes.DELETE(id)
    ).then(res => res.data);
  }
}
