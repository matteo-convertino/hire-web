"use server";

import { fetchInterviewById } from "@/features/interviews/api/fetchInterviewById";
import InterviewPage from "@/features/interviews/pages/InterviewPage";
import { fetchMessagesByInterview } from "@/features/interviews/api/fetchMessagesByInterview";
import { MessageResponseDTO } from "@/dto/response/MessageResponseDTO";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { response: interview, error } = await fetchInterviewById({ idString: id });
  let messages: MessageResponseDTO[] = [];

  if (interview !== undefined) {
    const { response } = await fetchMessagesByInterview({ interviewId: interview.id });
    if (response !== undefined) messages = response;
  }

  return <InterviewPage
    interview={interview}
    initialMessages={messages}
    error={error}
  />;
}
