import { isNotEmpty, useForm } from "@mantine/form";
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

export default function useJobPositionSkillsForm({ jobPositionId, isEdit = false }: {
  jobPositionId: number,
  isEdit?: boolean
}) {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      skills: [{ description: "", key: randomId() }]
    },
    validate: {
      skills: {
        description: isNotEmpty("Description is required")
      }
    },
    transformValues: (values) => ({
      skills: values.skills.map(({ key, ...rest }) => ({
        ...rest,
        ...(isEdit ? {} : { jobPositionId })
      }))
    })
  });

  const skillService = SkillService.getInstance();
  const hireApi = useHireApi();

  const onSubmit = async ({ data, onComplete }: {
    data: SkillRequestDTO[] | SkillUpdateRequestDTO[],
    onComplete: (() => void) | null | undefined,
  }) => {

    const notificationId = showHireLoadingNotification({
      title: "Skills",
      message: `Wait while we ${isEdit ? "update" : "create"} your skills`
    })!;

    Promise.all(
      data.map((skill) =>
        new Promise<void>((resolve, reject) => {
          hireApi({
            api: () => isEdit
              ? skillService.update(jobPositionId!, skill as SkillUpdateRequestDTO)
              : skillService.save(skill as SkillRequestDTO),
            onComplete: () => resolve(),
            onError: () => reject(new Error()),
            onGenericError: () => reject(new Error())
          });
        }))
    ).then(() => {
      onComplete?.();
      updateHireSuccessNotification({
        notificationId: notificationId,
        title: "Skills",
        message: `Skills ${isEdit ? "updated" : "created"} with success`
      });
    }).catch(() => updateHireErrorNotification({
      notificationId: notificationId,
      title: "Skills",
      message: `There was an error while trying to ${isEdit ? "update" : "create"} skills`
    }));
  };

  return { form, onSubmit };
}
