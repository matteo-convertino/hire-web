import SkillService from "@/services/SkillService";
import useHireApi from "@/hooks/useHireApi";
import { SkillUpdateRequestDTO } from "@/dto/request/SkillUpdateRequestDTO";
import { isNotEmpty, useForm } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import { SkillResponseDTO } from "@/dto/response/SkillResponseDTO";

export default function useSkillUpdate({ initialSkills }: { initialSkills: SkillResponseDTO[] }) {
  const form = useForm<UpdateSkillsFormValues, UpdateSkillsFormTransformFunction>({
    mode: "uncontrolled",
    initialValues: {
      skills: initialSkills.map((skill: SkillResponseDTO) => ({
        id: skill.id,
        description: skill.description,
        key: randomId()
      }))
    },
    validate: {
      skills: {
        description: isNotEmpty("Description is required")
      }
    },
    transformValues: (values) => ({
      skills: values.skills.map(({ key, ...rest }) => ({
        ...rest
      }))
    })
  });

  const skillService = SkillService.getInstance();
  const hireApiWithNotification = useHireApi();

  const updateSkill = ({ index, onComplete }: {
    index: number,
    onComplete?: (skillResponseDTO: SkillResponseDTO) => void
  }) => {
    const skill = form.getValues().skills[index];

    const { hasError } = form.validateField(`skills.${index}.description`);
    if (hasError) return;

    const skillUpdateRequestDTO: SkillUpdateRequestDTO = { description: skill.description };

    hireApiWithNotification({
      api: () => skillService.update(skill.id, skillUpdateRequestDTO),
      titleOnSuccess: "Skill",
      messageOnSuccess: "Skill updated with success",
      titleOnLoading: "Updating skill",
      messageOnLoading: "Wait while we update your skill",
      messageOnGenericError: "There was an error while trying to update skill",
      onComplete: onComplete
    });
  };

  return { form, updateSkill };
}

export type UpdateSkillsFormValues = {
  skills: {
    id: number
    description: string;
    key: string;
  }[];
};

export type UpdateSkillsFormTransformFunction = (values: UpdateSkillsFormValues) => {
  skills: {
    description: string;
  }[];
};
