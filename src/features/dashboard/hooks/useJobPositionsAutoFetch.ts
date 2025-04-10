import { JobPositionResponseDTO } from "@/dto/response/JobPositionResponseDTO";
import { useDashboardStore } from "@/features/dashboard/stores/useDashboardStore";
import { useEffect } from "react";
import useJobPositionsFetchAll from "@/features/job-positions/hooks/useJobPositionsFetchAll";
import useJobPositionsFetchAllByUser from "@/features/dashboard/hooks/useJobPositionsFetchAllByUser";

export function useJobPositionsAutoFetch(initialJobPositions: JobPositionResponseDTO[] | null) {
  const {
    jobPositions,
    setJobPositions
  } = useDashboardStore();
  const { fetchAllJobPositionsByUser } = useJobPositionsFetchAllByUser();

  useEffect(() => setJobPositions(initialJobPositions ?? []), []);

  useEffect(() => {
    if (jobPositions !== null) return;

    setJobPositions([]);

    fetchAllJobPositionsByUser({
      onComplete: (jobPositions) => setJobPositions(jobPositions)
    });

  }, [jobPositions]);
}
