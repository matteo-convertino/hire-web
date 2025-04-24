import { JobPositionResponseDTO } from "@/dto/response/JobPositionResponseDTO";
import { useDashboardStore } from "@/features/dashboard/stores/useDashboardStore";
import { useEffect } from "react";
import useJobPositionsFetchAllByUser from "@/features/dashboard/hooks/useJobPositionsFetchAllByUser";

export function useJobPositionsAutoFetch(initialJobPositions: JobPositionResponseDTO[] = []) {
  const {
    setJobPositions,
    toFetchJobPositions,
    setToFetchJobPositions
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
