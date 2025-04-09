"use server";

import { callApiAsync } from "@/utils/callApi";
import Client from "./Client";
import JobPositionService from "@/services/JobPositionService";

export function fetchJobPositions() {
  return callApiAsync({
    api: () => JobPositionService.getInstance().getAll()
  });
}

export default async function Home() {
  const { response, error } = await fetchJobPositions();

  return <Client jobPositions={response} error={error} />;
}
