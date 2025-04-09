"use client";

import { JobPositionResponseDTO } from "@/dto/response/JobPositionResponseDTO";
import { useRouter } from "next/navigation";
import { ErrorDTO } from "@/dto/ErrorDTO";
import { useHireClientErrorHandler } from "@/hooks/useHireClientErrorHandler";
import { JobPositionsGrid } from "@/components/job-positions/Grid";

export default function Client({ jobPositions, error }: {
  jobPositions: JobPositionResponseDTO[] | null,
  error: ErrorDTO | null
}) {
  const router = useRouter();

  useHireClientErrorHandler(error);

  return (
    <JobPositionsGrid
      jobPositions={jobPositions ?? []}
      onView={(id) => router.push(`/job-positions/${id}`)}
    />
  );

}
