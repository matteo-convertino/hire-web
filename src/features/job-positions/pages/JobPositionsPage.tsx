"use client";

import { JobPositionResponseDTO } from "@/dto/response/JobPositionResponseDTO";
import { ErrorDTO } from "@/dto/ErrorDTO";
import { useRouter } from "next/navigation";
import { useHireClientSideErrorHandler } from "@/hooks/useHireClientSideErrorHandler";
import { JobPositionsGrid } from "@/features/job-positions/components/JobPositionsGrid";

export default function JobPositionsPage({ jobPositions, error }: {
  jobPositions?: JobPositionResponseDTO[],
  error?: ErrorDTO
}) {
  const router = useRouter();

  useHireClientSideErrorHandler(error);

  return (
    <JobPositionsGrid
      jobPositions={jobPositions ?? []}
      onView={(id) => router.push(`/job-positions/${id}`)}
    />
  );
}

