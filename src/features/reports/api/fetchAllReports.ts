import { callApiAsync } from "@/utils/callApi";
import JobPositionService from "@/services/JobPositionService";
import ReportService from "@/services/ReportService";

export async function fetchAllReports() {
  return callApiAsync({
    api: () => ReportService.getInstance().getAll()
  });
}
