"use server";

import JobPositionsPage from "@/features/job-positions/pages/JobPositionsPage";
import { fetchAllJobPositions } from "@/features/job-positions/api/fetchAllJobPositions";

export default async function Page() {
  const { response, error } = await fetchAllJobPositions();

  return <JobPositionsPage jobPositions={response} error={error} />;
}
