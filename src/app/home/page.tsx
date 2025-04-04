"use server";

import { callApiAsync } from "@/utils/callApi";
import { JobPositionResponseDTO } from "@/dto/response/JobPositionResponseDTO";
import Client from "./Client";
import JobPositionService from "@/services/JobPositionService";

export async function fetchJobPositions(): Promise<JobPositionResponseDTO[]> {
  let jobPositions: JobPositionResponseDTO[] = [];

  await callApiAsync({
    api: () => JobPositionService.getInstance().getAll(),
    onComplete: (jobPositionsResponseDTO) => jobPositions = jobPositionsResponseDTO
  });

  return jobPositions;
}

export default async function Home() {
  const jobPositions = await fetchJobPositions();

  return <Client jobPositions={jobPositions} />;
}
