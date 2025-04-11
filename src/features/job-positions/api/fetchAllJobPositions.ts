import { callApiAsync } from "@/utils/callApi";
import JobPositionService from "@/services/JobPositionService";

export async function fetchAllJobPositions() {
  return callApiAsync({
    api: () => JobPositionService.getInstance().getAll()
  });
}
