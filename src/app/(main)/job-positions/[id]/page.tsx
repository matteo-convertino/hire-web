"use server";

import { fetchJobPositionById } from "@/features/job-positions/api/fetchJobPositionById";
import DetailsJobPositionPage from "@/features/job-positions/pages/DetailsJobPositionPage";
import HireCookieService from "@/services/utils/HireCookieService";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { response, error } = await fetchJobPositionById({ idString: id });
  const userId = await HireCookieService.getIdFromAccessToken();
  const isOwner = userId === null ? false : response?.userId === userId;

  return <DetailsJobPositionPage
    jobPosition={response}
    error={error}
    isOwner={isOwner} />;
}
