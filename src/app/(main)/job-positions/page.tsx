"use server";

import { callApiAsync } from "@/utils/callApi";
import { JobPositionResponseDTO } from "@/dto/response/JobPositionResponseDTO";
import Client from "./Client";
import JobPositionService from "@/services/JobPositionService";
import { ErrorDTO } from "@/dto/ErrorDTO";

export async function fetchJobPositions(): Promise<{
  jobPositions: JobPositionResponseDTO[],
  error: ErrorDTO | null | undefined
}> {
  let jobPositions: JobPositionResponseDTO[] = [];
  let error: ErrorDTO | null | undefined = undefined;

  await callApiAsync({
    api: () => JobPositionService.getInstance().getAll(),
    onComplete: (jobPositionsResponseDTO) => jobPositions = jobPositionsResponseDTO,
    onError: (errorDTO: ErrorDTO) => error = errorDTO,
    onGenericError: () => error = null
  });

  return { jobPositions, error };
}

export default async function Home() {
  const { jobPositions, error } = await fetchJobPositions();

  return <Client jobPositions={jobPositions} error={error} />;
}
