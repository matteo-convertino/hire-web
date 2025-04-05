"use client";

import { JobPositionResponseDTO } from "@/dto/response/JobPositionResponseDTO";
import { SimpleGrid } from "@mantine/core";
import { useRouter } from "next/navigation";
import InterviewCard from "@/components/InterviewCard";

export default function Client({ jobPositions }: { jobPositions: JobPositionResponseDTO[] }) {
  const router = useRouter();

  return (
    <SimpleGrid cols={3}>
      {
        jobPositions.map((jobPosition) =>
          <InterviewCard
            key={jobPosition.id}
            jobPosition={jobPosition}
            onClick={() => router.push(`/job-positions/${jobPosition.id}`)}
          />
        )
      }
    </SimpleGrid>

  );
}
