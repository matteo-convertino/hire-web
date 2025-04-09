"use client";

import { JobPositionResponseDTO } from "@/dto/response/JobPositionResponseDTO";
import { SimpleGrid } from "@mantine/core";
import { useRouter } from "next/navigation";
import HireInterviewCard from "@/components/hire/HireInterviewCard";
import { ErrorDTO } from "@/dto/ErrorDTO";
import { useEffect } from "react";
import { showHireErrors } from "@/utils/hireNotifications";

export default function Client({ jobPositions, error }: {
  jobPositions: JobPositionResponseDTO[] | null,
  error: ErrorDTO | null | undefined
}) {
  const router = useRouter();

  useEffect(() => {
    if (error === undefined) return;

    showHireErrors({
      notificationId: null,
      errorDTO: error
    });
  }, [error]);

  return (
    <SimpleGrid cols={3}>
      {
        jobPositions?.map((jobPosition) =>
          <HireInterviewCard
            key={jobPosition.id}
            jobPosition={jobPosition}
            onView={() => router.push(`/job-positions/${jobPosition.id}`)}
            onEdit={() => router.push(`/job-positions/${jobPosition.id}/edit`)}
            onDelete={() => router.push(`/job-positions/${jobPosition.id}/delete`)}
          />
        )
      }
    </SimpleGrid>

  );
}
