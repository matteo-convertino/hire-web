import JobPositionService from "@/services/JobPositionService";
import useHireApiWithNotification from "@/hooks/useHireApiWithNotification";
import { JobPositionResponseDTO } from "@/dto/response/JobPositionResponseDTO";

export default function useJobPositionsFetchAll() {
  const jobPositionService = JobPositionService.getInstance();
  const hireApiWithNotification = useHireApiWithNotification();

  const fetchAllJobPositions = ({ onComplete }: {
    onComplete: ((_: JobPositionResponseDTO[]) => void) | null | undefined
  }) => {
    hireApiWithNotification({
      api: () => jobPositionService.getAll(),
      titleOnSuccess: "Job positions",
      messageOnSuccess: "Job positions fetched with success",
      titleOnLoading: "Fetching job positions",
      messageOnLoading: "Wait while we fetch your job positions",
      messageOnGenericError: "There was an error while trying to fetch job positions",
      onComplete: onComplete
    });
  };

  return { fetchAllJobPositions };
}
