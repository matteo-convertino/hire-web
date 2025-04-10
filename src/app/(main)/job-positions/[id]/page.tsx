"use server";

import { callApiAsync } from "@/utils/callApi";
import JobPositionService from "@/services/JobPositionService";
import { notFound } from "next/navigation";
import DetailJobPositionPage from "@/features/job-positions/pages/DetailJobPositionPage";

export async function fetchJobPosition(idString: string) {
  let id = Number(idString);

  if (isNaN(id) || !Number.isInteger(id)) notFound();

  return callApiAsync({
    api: () => JobPositionService.getInstance().getById(id)
  });
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { response, error } = await fetchJobPosition(id);

  return <DetailJobPositionPage jobPosition={response} error={error} />;
}
