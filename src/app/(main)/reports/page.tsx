"use server";

import { fetchAllReports } from "@/features/reports/api/fetchAllReports";
import aggregateReports from "@/features/reports/utils/aggregateReports";
import ReportsPage from "@/features/reports/pages/ReportsPage";


export default async function Page() {
  const { response, error } = await fetchAllReports();

  const reports = aggregateReports(response ?? []);

  return <ReportsPage reports={reports} error={error} />;
}
