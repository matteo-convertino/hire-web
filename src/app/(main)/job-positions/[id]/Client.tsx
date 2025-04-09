"use client";

import { JobPositionResponseDTO } from "@/dto/response/JobPositionResponseDTO";
import { Text } from "@mantine/core";
import { ErrorDTO } from "@/dto/ErrorDTO";
import { useHireClientErrorHandler } from "@/hooks/useHireClientErrorHandler";

export default function Client({ jobPosition, error }: {
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
