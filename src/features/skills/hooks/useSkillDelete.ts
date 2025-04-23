"use client";

import useHireApiWithNotification from "@/hooks/useHireApiWithNotification";
import JobPositionService from "@/services/JobPositionService";
import { JobPositionResponseDTO } from "@/dto/response/JobPositionResponseDTO";
import SkillService from "@/services/SkillService";
import { SkillResponseDTO } from "@/dto/response/SkillResponseDTO";

export default function useSkillDelete() {
  const skillService = SkillService.getInstance();
  const hireApiWithNotification = useHireApiWithNotification();

  const deleteSkill =  ({ id, onComplete }: {
    id: number,
    onComplete?: (skillResponseDTO: SkillResponseDTO) => void
  }) => hireApiWithNotification({
    api: () => skillService.delete(id),
    titleOnSuccess: "Skill",
    messageOnSuccess: "Skill deleted with success",
    titleOnLoading: "Deleting skill",
    messageOnLoading: "Wait while we delete your skill",
    messageOnGenericError: "There was an error while trying to delete skill",
    onComplete: onComplete
  });

  return { deleteSkill };
}

