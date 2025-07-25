"use client";

import { JobPositionResponseDTO } from "@/dto/response/JobPositionResponseDTO";
import { ErrorDTO } from "@/dto/ErrorDTO";
import { useRouter } from "next/navigation";
import { useHireClientSideErrorHandler } from "@/hooks/useHireClientSideErrorHandler";
import { JobPositionsGrid } from "@/features/job-positions/components/JobPositionsGrid";
import { useDashboardStore } from "@/features/dashboard/stores/useDashboardStore";
import { useJobPositionsAutoFetch } from "@/features/dashboard/hooks/useJobPositionsAutoFetch";
import { useJobPositionEditStore } from "@/features/job-positions/stores/useJobPositionEditStore";

export default function DashboardPage({ initialJobPositions, error }: {
  initialJobPositions?: JobPositionResponseDTO[],
  error?: ErrorDTO
}) {
  const router = useRouter();
  const { jobPositions } = useDashboardStore();
  const { setJobPosition } = useJobPositionEditStore();

  useHireClientSideErrorHandler(error);
  useJobPositionsAutoFetch(initialJobPositions);

  return (
    <JobPositionsGrid
      jobPositions={jobPositions ?? []}
      onView={(id) => router.push(`/job-positions/${id}`)}
      onEdit={(jobPosition) => {
        setJobPosition(jobPosition);
        router.push(`/job-positions/${jobPosition.id}/edit`);
      }}
      onDelete={(id) => router.push(`/job-positions/${id}/delete`)}
    />
  );
}
