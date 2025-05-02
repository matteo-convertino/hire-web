"use server";

import HireCookieService from "@/services/utils/HireCookieService";
import { fetchInterviewById } from "@/features/interviews/api/fetchInterviewById";
import { redirect } from "next/navigation";
import InterviewPage from "@/features/interviews/pages/InterviewPage";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { response, error } = await fetchInterviewById({ idString: id });

  // const userId = await HireCookieService.getIdFromAccessToken(true);
  // if(userId === null || response?.userId !== userId) redirect("/");

  return <InterviewPage
    interview={response}
    error={error}
  />;
}
