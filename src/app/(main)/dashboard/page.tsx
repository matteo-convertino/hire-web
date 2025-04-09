"use server";

import { callApiAsync } from "@/utils/callApi";
import JobPositionService from "@/services/JobPositionService";
import Client from "./Client";

export async function fetchJobPositionsByUser() {
  return callApiAsync({
    api: () => JobPositionService.getInstance().getAllByUser()
  });
}

export default async function Page() {
  const { response, error } = await fetchJobPositionsByUser();

  return <Client jobPositions={response} error={error} />;
}
