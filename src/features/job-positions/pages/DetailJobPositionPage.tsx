"use client";

import { JobPositionResponseDTO } from "@/dto/response/JobPositionResponseDTO";
import { ErrorDTO } from "@/dto/ErrorDTO";
import { useHireClientErrorHandler } from "@/hooks/useHireClientErrorHandler";
import { Text } from "@mantine/core";

export default function DetailJobPositionPage({ jobPosition, error }: {
  jobPosition: JobPositionResponseDTO | null,
  error: ErrorDTO | null
}) {
  useHireClientErrorHandler(error);

  return (
    <>
      <Text>
        {jobPosition?.title}
      </Text>
      <Text>
        {jobPosition?.description}
      </Text>
    </>
  );

}
