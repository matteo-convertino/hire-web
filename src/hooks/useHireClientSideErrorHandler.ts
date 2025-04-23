"use client";

import { ErrorDTO } from "@/dto/ErrorDTO";
import { useEffect } from "react";
import { showHireErrors } from "@/utils/hireNotifications";

export function useHireClientSideErrorHandler(error: ErrorDTO | null) {
  useEffect(() => {
    if (error === null) return;

    showHireErrors({
      notificationId: null,
      errorDTO: error
    });
  }, [error]);
}
