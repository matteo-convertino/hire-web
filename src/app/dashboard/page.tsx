import { JobPositionResponseDTO } from "@/dto/response/JobPositionResponseDTO";
import { callApiAsync } from "@/utils/callApi";
import JobPositionService from "@/services/JobPositionService";
import Client from "@/app/job-positions/Client";

export async function fetchJobPositionsByUser(): Promise<JobPositionResponseDTO[]> {
  let jobPositions: JobPositionResponseDTO[] = [];

  await callApiAsync({
    api: () => JobPositionService.getInstance().getAllByUser(),
    onComplete: (jobPositionsResponseDTO) => jobPositions = jobPositionsResponseDTO
  });

  return jobPositions;
}

export default async function Page() {
  const jobPositions = await fetchJobPositionsByUser();

  return <Client jobPositions={jobPositions} />;
}
