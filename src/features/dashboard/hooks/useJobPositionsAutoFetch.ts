import { JobPositionResponseDTO } from "@/dto/response/JobPositionResponseDTO";
import { useDashboardStore } from "@/features/dashboard/stores/useDashboardStore";
import { useEffect } from "react";
import useJobPositionsFetchAll from "@/features/job-positions/hooks/useJobPositionsFetchAll";
import useJobPositionsFetchAllByUser from "@/features/dashboard/hooks/useJobPositionsFetchAllByUser";

export function useJobPositionsAutoFetch(initialJobPositions: JobPositionResponseDTO[] | null) {
  const {
    setJobPositions,
    toFetchJobPositions,
    setToFetchJobPositions,
  } = useDashboardStore();
  const { fetchAllJobPositionsByUser } = useJobPositionsFetchAllByUser();

  useEffect(() => setJobPositions(initialJobPositions ?? []), []);

  useEffect(() => {
    if (!toFetchJobPositions) return;
    setToFetchJobPositions(false);

    fetchAllJobPositionsByUser({
      onComplete: (jobPositions) => setJobPositions(jobPositions)
    });

  }, [toFetchJobPositions]);
}
