"use server";

import { JobPositionResponseDTO } from "@/dto/response/JobPositionResponseDTO";
import { callApiAsync } from "@/utils/callApi";
import JobPositionService from "@/services/JobPositionService";
import Client from "./Client";

export async function fetchJobPosition(id: number): Promise<JobPositionResponseDTO | null> {
  let jobPosition: JobPositionResponseDTO | null = null;

  await callApiAsync({
    api: () => JobPositionService.getInstance().getById(id),
    onComplete: (jobPositionsResponseDTO) => jobPosition = jobPositionsResponseDTO
  });

  return jobPosition;
}

export default async function Page({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;
  const jobPosition = await fetchJobPosition(id);

  return <Client jobPosition={jobPosition}></Client>;
}
