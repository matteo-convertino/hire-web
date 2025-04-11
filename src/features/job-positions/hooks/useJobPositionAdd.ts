import { useForm, zodResolver } from "@mantine/form";
import JobPositionService from "@/services/JobPositionService";
import useHireApiWithNotification from "@/hooks/useHireApiWithNotification";
import { JobPositionRequestDTO, jobPositionSchema } from "@/dto/request/JobPositionRequestDTO";
import { JobPositionResponseDTO } from "@/dto/response/JobPositionResponseDTO";

export default function useJobPositionAdd() {
  const form = useForm({
    validate: zodResolver(jobPositionSchema),
    initialValues: {
      title: "",
      description: "",
      lastMessage: undefined,
      evaluationCriteria: undefined
    }
  });

  const jobPositionService = JobPositionService.getInstance();
  const hireApiWithNotification = useHireApiWithNotification();

  const onSubmit = async ({ data, onComplete }: {
    data: JobPositionRequestDTO,
    onComplete: ((_: JobPositionResponseDTO) => void) | null | undefined
  })=> {
    hireApiWithNotification({
      api: () => jobPositionService.save(data),
      titleOnSuccess: 'Job position',
      messageOnSuccess: "Job position created with success",
      titleOnLoading: 'Job position',
      messageOnLoading: 'Wait while we create your job position',
      messageOnGenericError: "There was an error while trying to create job position",
      onComplete: onComplete,
    })
  };

  return {form, onSubmit};
}
