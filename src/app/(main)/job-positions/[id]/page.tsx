"use server";

import DetailJobPositionPage from "@/features/job-positions/pages/DetailJobPositionPage";
import { fetchJobPositionById } from "@/features/job-positions/api/fetchJobPositionById";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { response, error } = await fetchJobPositionById({ idString: id });

  return <DetailJobPositionPage jobPosition={response} error={error} />;
}
