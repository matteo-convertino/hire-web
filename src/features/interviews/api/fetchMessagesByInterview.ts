"use server";

import { callApiAsync } from "@/utils/callApi";
import InterviewService from "@/services/InterviewService";

export async function fetchMessagesByInterview({ interviewId, onError }: {
  interviewId: number,
  onError?: () => void
}) {
  return callApiAsync({
    api: () => InterviewService.getInstance().getAllMessagesByInterviewId(interviewId),
    onError: onError
  });
}
