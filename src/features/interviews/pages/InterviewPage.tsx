"use client";

import { ErrorDTO } from "@/dto/ErrorDTO";
import { useHireClientSideErrorHandler } from "@/hooks/useHireClientSideErrorHandler";
import { Text } from "@mantine/core";
import { notFound } from "next/navigation";
import { InterviewResponseDTO } from "@/dto/response/InterviewResponseDTO";

export default function InterviewPage({ interview, error }: {
  interview?: InterviewResponseDTO,
  error?: ErrorDTO,
}) {
  if (interview === undefined) notFound();

  useHireClientSideErrorHandler(error);

  return (
    <>
      <Text>{interview.id}</Text>
    </>
  );
}
