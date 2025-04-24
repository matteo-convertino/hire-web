import JobPositionService from "@/services/JobPositionService";
import { JobPositionResponseDTO } from "@/dto/response/JobPositionResponseDTO";
import useHireApi from "@/hooks/useHireApi";

export default function useJobPositionsFetchAllByUser() {
  const jobPositionService = JobPositionService.getInstance();
  const hireApi = useHireApi();

  const fetchAllJobPositionsByUser = ({ onComplete }: {
    onComplete?: (_: JobPositionResponseDTO[]) => void
  }) => {
    hireApi({
      api: () => jobPositionService.getAllByUser(),
      onComplete: onComplete,
      showNotifications: false
    });
  };

  return { fetchAllJobPositionsByUser };
}
