"use server";

import DashboardPage from "@/features/dashboard/DashboardPage";
import { fetchJobPositionsByUser } from "@/features/job-positions/api/fetchAllJobPositionsByUser";

export default async function Page() {
  const { response, error } = await fetchJobPositionsByUser();

  return <DashboardPage initialJobPositions={response} error={error} />;
}
