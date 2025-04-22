"use server";

import { fetchJobPositionById } from "@/features/job-positions/api/fetchJobPositionById";
import DetailsJobPositionPage from "@/features/job-positions/pages/DetailsJobPositionPage";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { response, error } = await fetchJobPositionById({ idString: id });

  return <DetailsJobPositionPage jobPosition={response} error={error} />;
}
