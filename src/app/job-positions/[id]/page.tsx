"use server";

import { JobPositionResponseDTO } from "@/dto/response/JobPositionResponseDTO";
import { callApiAsync } from "@/utils/callApi";
import JobPositionService from "@/services/JobPositionService";
import Client from "./Client";

export async function fetchJobPosition(idString: string): Promise<JobPositionResponseDTO | null> {
  let jobPosition: JobPositionResponseDTO | null = null;
  let id = Number(idString);

  if (isNaN(id) || !Number.isInteger(id)) return jobPosition;

  await callApiAsync({
    api: () => JobPositionService.getInstance().getById(id),
    onComplete: (jobPositionsResponseDTO) => jobPosition = jobPositionsResponseDTO
  });

  return jobPosition;
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const jobPosition = await fetchJobPosition(id);

  return <Client jobPosition={jobPosition}></Client>;
}
