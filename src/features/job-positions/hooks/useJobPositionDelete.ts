"use client";

import useHireApi from "@/hooks/useHireApi";
import JobPositionService from "@/services/JobPositionService";
import { JobPositionResponseDTO } from "@/dto/response/JobPositionResponseDTO";

export default function useJobPositionDelete() {
  const jobPositionService = JobPositionService.getInstance();
  const hireApiWithNotification = useHireApi();

  const deleteJobPosition = ({ id, onComplete }: {
    id: number,
    onComplete?: (_: JobPositionResponseDTO) => void
  }) => {
    hireApiWithNotification({
      api: () => jobPositionService.delete(id),
      titleOnSuccess: "Job position",
      messageOnSuccess: "Job position deleted with success",
      titleOnLoading: "Deleting job position",
      messageOnLoading: "Wait while we delete your job position",
      messageOnGenericError: "There was an error while trying to delete job position",
      onComplete: onComplete
    });
  };

  return { deleteJobPosition };
}

