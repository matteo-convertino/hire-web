import { isNotEmpty, useForm, UseFormReturnType } from "@mantine/form";
import { SkillRequestDTO } from "@/dto/request/SkillRequestDTO";
import SkillService from "@/services/SkillService";
import { SkillUpdateRequestDTO } from "@/dto/request/SkillUpdateRequestDTO";
import { randomId } from "@mantine/hooks";
import {
  showHireLoadingNotification,
  updateHireErrorNotification,
  updateHireSuccessNotification
} from "@/utils/hireNotifications";
import useHireApi from "@/hooks/useHireApi";
import { SkillResponseDTO } from "@/dto/response/SkillResponseDTO";

export default function useSkillsAdd({ jobPositionId, defaultItem = true }: { jobPositionId: number, defaultItem?: boolean }) {
  const form = useForm<AddSkillsFormValues, AddSkillsFormTransformFunction>({
    mode: "uncontrolled",
    initialValues: {
      skills: defaultItem ?  [{ description: "", key: randomId() }] : []
    },
    validate: {
      skills: {
        description: isNotEmpty("Description is required")
      }
    },
    transformValues: (values) => ({
      skills: values.skills.map(({ key, ...rest }) => ({
        ...rest,
        ...{ jobPositionId }
      }))
    })
  });

  const skillService = SkillService.getInstance();
  const hireApi = useHireApi();

  const onSubmit = async ({ data, onComplete }: {
    data: SkillRequestDTO[],
    onComplete?: (skillsResponseDTO: SkillResponseDTO[]) => void,
  }) => {
    const skillsResponseDTO: SkillResponseDTO[] = []

    const notificationId = showHireLoadingNotification({
      title: "Skills",
      message: `Wait while we create your skills`
    });

    Promise.all(
      data.map((skill) =>
        new Promise<void>((resolve, reject) => {
          hireApi({
            api: () => skillService.save(skill),
            onComplete: (skillResponseDTO) => {
              skillsResponseDTO.push(skillResponseDTO)
              resolve();
            },
            onError: () => reject(new Error()),
            onGenericError: () => reject(new Error())
          });
        }))
    ).then(() => {
      onComplete?.(skillsResponseDTO);
      updateHireSuccessNotification({
        notificationId: notificationId,
        title: "Skills",
        message: "Skills created with success"
      });
    }).catch(() => updateHireErrorNotification({
      notificationId: notificationId,
      title: "Skills",
      message: "There was an error while trying to create skills"
    }));
  };

  return { form, onSubmit };
}

export type AddSkillsFormValues = {
  skills: {
    description: string;
    key: string;
  }[];
};

export type AddSkillsFormTransformFunction = (values: AddSkillsFormValues) => {
  skills: {
    description: string;
    jobPositionId: number;
  }[];
};
