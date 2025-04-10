"use server";

import { callApiAsync } from "@/utils/callApi";
import JobPositionService from "@/services/JobPositionService";
import JobPositionsPage from "@/features/job-positions/pages/JobPositionsPage";

export async function fetchJobPositions() {
  return callApiAsync({
    api: () => JobPositionService.getInstance().getAll()
  });
}

export default async function Home() {
  const { response, error } = await fetchJobPositions();

  return <JobPositionsPage initialJobPositions={response} error={error} />;
}
