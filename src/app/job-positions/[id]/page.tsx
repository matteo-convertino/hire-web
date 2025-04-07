"use server";

import { JobPositionResponseDTO } from "@/dto/response/JobPositionResponseDTO";
import { callApiAsync } from "@/utils/callApi";
import JobPositionService from "@/services/JobPositionService";
import Client from "./Client";
import { notFound } from "next/navigation";

export async function fetchJobPosition(idString: string): Promise<JobPositionResponseDTO> {
  let jobPosition: JobPositionResponseDTO;
  let id = Number(idString);

  if (isNaN(id) || !Number.isInteger(id)) notFound();

  await callApiAsync({
    api: () => JobPositionService.getInstance().getById(id),
    onComplete: (jobPositionsResponseDTO) => jobPosition = jobPositionsResponseDTO,
    /*onError: (e) => {
      if(e.status === 404) notFound();

      throw new Error();
    },
    onGenericError: () => {
      throw new Error();
    },*/
  });

  return jobPosition!;
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const jobPosition = await fetchJobPosition(id);

  return <Client jobPosition={jobPosition} />;
}
