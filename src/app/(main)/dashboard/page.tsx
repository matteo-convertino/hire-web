"use server";

import { callApiAsync } from "@/utils/callApi";
import JobPositionService from "@/services/JobPositionService";
import DashboardPage from "@/features/dashboard/DashboardPage";

export async function fetchJobPositionsByUser() {
  return callApiAsync({
    api: () => JobPositionService.getInstance().getAllByUser()
  });
}

export default async function Page() {
  const { response, error } = await fetchJobPositionsByUser();

  return <DashboardPage initialJobPositions={response} error={error} />;
}
