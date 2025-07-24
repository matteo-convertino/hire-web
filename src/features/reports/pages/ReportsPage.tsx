"use client";

import { ErrorDTO } from "@/dto/ErrorDTO";
import { useHireClientSideErrorHandler } from "@/hooks/useHireClientSideErrorHandler";
import { ReportsGrid } from "@/features/reports/components/ReportsGrid";
import { ReportsGroupByInterview } from "../utils/aggregateReports";

export default function ReportsPage({ reports, error }: {
  reports?: ReportsGroupByInterview,
  error?: ErrorDTO
}) {
  useHireClientSideErrorHandler(error);

  return (
    <ReportsGrid reports={reports} />
  );
}

