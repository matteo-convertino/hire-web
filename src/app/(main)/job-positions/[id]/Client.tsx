"use client";

import { JobPositionResponseDTO } from "@/dto/response/JobPositionResponseDTO";
import { Text } from "@mantine/core";
import { ErrorDTO } from "@/dto/ErrorDTO";
import { useEffect } from "react";
import { showHireErrors } from "@/utils/hireNotifications";

export default function Client({ jobPosition, error }: {
  jobPosition: JobPositionResponseDTO | null,
  error: ErrorDTO | null
}) {
  {
    useEffect(() => {
      if (error === null) return;

      showHireErrors({
        notificationId: null,
        errorDTO: error
      });
    }, [error]);

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
}
