"use client";

import useHireApi from "@/hooks/useHireApi";
import InterviewService from "@/services/InterviewService";
import { InterviewResponseDTO } from "@/dto/response/InterviewResponseDTO";

export default function useInterviewAdd() {
  const interviewService = InterviewService.getInstance();
  const hireApiWithNotification = useHireApi();

  const addInterview = ({ jobPositionId, onComplete }: {
    jobPositionId: number,
    onComplete?: (_: InterviewResponseDTO) => void
  }) => {
    hireApiWithNotification({
      api: () => interviewService.save({ jobPositionId: jobPositionId }),
      showNotifications: false,
      onComplete: onComplete
    });
  };

  return { addInterview };
}

