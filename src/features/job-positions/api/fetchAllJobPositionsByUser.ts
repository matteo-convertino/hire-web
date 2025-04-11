import { callApiAsync } from "@/utils/callApi";
import JobPositionService from "@/services/JobPositionService";

export async function fetchJobPositionsByUser() {
  return callApiAsync({
    api: () => JobPositionService.getInstance().getAllByUser()
  });
}
