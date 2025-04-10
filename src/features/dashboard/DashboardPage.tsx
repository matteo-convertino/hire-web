"use client";

import { JobPositionResponseDTO } from "@/dto/response/JobPositionResponseDTO";
import { ErrorDTO } from "@/dto/ErrorDTO";
import { useRouter } from "next/navigation";
import { useHireClientErrorHandler } from "@/hooks/useHireClientErrorHandler";
import { JobPositionsGrid } from "@/features/job-positions/components/JobPositionsGrid";
import { useDashboardStore } from "@/features/dashboard/stores/useDashboardStore";
import { useJobPositionsAutoFetch } from "@/features/dashboard/hooks/useJobPositionsAutoFetch";

export default function DashboardPage({ initialJobPositions, error }: {
  initialJobPositions: JobPositionResponseDTO[] | null,
  error: ErrorDTO | null
}) {
  const router = useRouter();
  const { jobPositions } = useDashboardStore();

  useHireClientErrorHandler(error);
  useJobPositionsAutoFetch(initialJobPositions);

  return (
    <JobPositionsGrid
      jobPositions={jobPositions ?? []}
      onView={(id) => router.push(`/job-positions/${id}`)}
      onEdit={(id) => router.push(`/job-positions/${id}/edit`)}
      onDelete={(id) => router.push(`/job-positions/${id}/delete`)}
    />
  );
}
