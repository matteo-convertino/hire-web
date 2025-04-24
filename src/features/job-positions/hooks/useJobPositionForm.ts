import { useForm, zodResolver } from "@mantine/form";
import JobPositionService from "@/services/JobPositionService";
import useHireApiWithNotification from "@/hooks/useHireApiWithNotification";
import { JobPositionRequestDTO, jobPositionSchema } from "@/dto/request/JobPositionRequestDTO";
import { JobPositionResponseDTO } from "@/dto/response/JobPositionResponseDTO";

export default function useJobPositionForm({ initialJobPosition } : { initialJobPosition?: JobPositionRequestDTO } = {}) {
  const form = useForm<JobPositionRequestDTO>({
    mode: "uncontrolled",
    validate: zodResolver(jobPositionSchema),
    initialValues: {
      title: initialJobPosition?.title ?? "",
      description: initialJobPosition?.description ?? "",
      lastMessage: initialJobPosition?.lastMessage ?? null,
      evaluationCriteria: initialJobPosition?.evaluationCriteria ?? null
    },
    transformValues: (jobPosition) => {
      return ({
        ...jobPosition,
        lastMessage: jobPosition.lastMessage === "" ? null : jobPosition.lastMessage,
        evaluationCriteria: jobPosition.evaluationCriteria === "" ? null : jobPosition.evaluationCriteria
      });
    }
  });

  const jobPositionService = JobPositionService.getInstance();
  const hireApiWithNotification = useHireApiWithNotification();

  const onSubmit = async ({ jobPositionId, data, onComplete }: {
    jobPositionId?: number,
    data: JobPositionRequestDTO,
    onComplete?: (_: JobPositionResponseDTO) => void,
  }) => {
    let isEdit = jobPositionId !== undefined;

    hireApiWithNotification({
      api: () => isEdit ? jobPositionService.update(jobPositionId!, data) : jobPositionService.save(data),
      titleOnSuccess: "Job position",
      messageOnSuccess: `Job position ${isEdit ? "updated" : "created"} with success`,
      titleOnLoading: "Job position",
      messageOnLoading: `Wait while we ${isEdit ? "update" : "create"} your job position`,
      messageOnGenericError: `There was an error while trying to ${isEdit ? "update" : "create"} job position`,
      onComplete: onComplete
    });
  };

  return { form, onSubmit };
}
