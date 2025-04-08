import { JobPositionResponseDTO } from "@/dto/response/JobPositionResponseDTO";
import { callApiAsync } from "@/utils/callApi";
import JobPositionService from "@/services/JobPositionService";
import { ErrorDTO } from "@/dto/ErrorDTO";
import Client from "./Client";

export async function fetchJobPositionsByUser(): Promise<{
  jobPositions: JobPositionResponseDTO[],
  error: ErrorDTO | null | undefined
}> {
  let jobPositions: JobPositionResponseDTO[] = [];
  let error: ErrorDTO | null | undefined = undefined;

  await callApiAsync({
    api: () => JobPositionService.getInstance().getAllByUser(),
    onComplete: (jobPositionsResponseDTO) => jobPositions = jobPositionsResponseDTO,
    onError: (errorDTO: ErrorDTO) => error = errorDTO,
    onGenericError: () => error = null
  });

  return { jobPositions, error };
}

export default async function Page() {
  const { jobPositions, error } = await fetchJobPositionsByUser();

  return <Client jobPositions={jobPositions} error={error} />;
}
