"use client";

import { ErrorDTO } from "@/dto/ErrorDTO";
import { useEffect } from "react";
import { showHireErrors } from "@/utils/hireNotifications";

export function useHireClientSideErrorHandler(error?: ErrorDTO) {
  useEffect(() => {
    if (error === undefined) return;

    showHireErrors({
      errorDTO: error
    });
  }, [error]);
}
