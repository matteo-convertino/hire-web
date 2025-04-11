"use server";

import { notFound } from "next/navigation";
import { callApiAsync } from "@/utils/callApi";
import JobPositionService from "@/services/JobPositionService";

export async function fetchJobPositionById({ idString, onError }: {
  idString: string,
  onError?: () => void
}) {
  let id = Number(idString);

  if (isNaN(id) || !Number.isInteger(id)) onError === undefined ? notFound() : onError();

  return callApiAsync({
    api: () => JobPositionService.getInstance().getById(id),
    onError: onError
  });
}
