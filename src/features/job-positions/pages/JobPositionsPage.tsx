"use client";

import { JobPositionResponseDTO } from "@/dto/response/JobPositionResponseDTO";
import { ErrorDTO } from "@/dto/ErrorDTO";
import { useRouter } from "next/navigation";
import { useHireClientErrorHandler } from "@/hooks/useHireClientErrorHandler";
import { JobPositionsGrid } from "@/features/job-positions/components/JobPositionsGrid";
import { useEffect, useState } from "react";
import useJobPositionsFetchAll from "@/features/job-positions/hooks/useJobPositionsFetchAll";

export default function JobPositionsPage({ initialJobPositions, error }: {
  initialJobPositions: JobPositionResponseDTO[] | null,
  error: ErrorDTO | null
}) {
  const router = useRouter();
  const [jobPositions, setJobPositions] = useState(initialJobPositions);
  const { fetchAllJobPositions } = useJobPositionsFetchAll();

  useHireClientErrorHandler(error);

  useEffect(() => {
    if (initialJobPositions !== null) return;

    fetchAllJobPositions({
      onComplete: (jobPositions) => setJobPositions(jobPositions)
    });
  }, [initialJobPositions]);

  return (
    <JobPositionsGrid
      jobPositions={jobPositions ?? []}
      onView={(id) => router.push(`/job-positions/${id}`)}
    />
  );
}

