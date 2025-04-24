"use client";

import { HirePageModal } from "@/components/HirePageModal";
import { useEffect, useState } from "react";
import { parseParamToInteger } from "@/utils/parseParamToInteger";
import { useParams } from "next/navigation";
import { useDashboardStore } from "@/features/dashboard/stores/useDashboardStore";
import { JobPositionResponseDTO } from "@/dto/response/JobPositionResponseDTO";
import { useJobPositionEditStore } from "@/features/job-positions/stores/useJobPositionEditStore";
import useJobPositionForm from "@/features/job-positions/hooks/useJobPositionForm";
import JobPositionForm from "@/features/job-positions/components/JobPositionForm";

export default function EditJobPositionPage({ initialJobPosition }: {
  initialJobPosition: JobPositionResponseDTO | null
}) {
  const { id } = useParams();
  const [opened, setOpened] = useState(false);
  const { setToFetchJobPositions } = useDashboardStore();
  const { jobPosition, setJobPosition } = useJobPositionEditStore();
  const { form, onSubmit } = useJobPositionForm();

  const jobPositionId = parseParamToInteger(id);
  if (jobPositionId === null) {
    window.location.replace("/");
    return;
  }

  useEffect(() => {
    if (initialJobPosition === null) {
      if (jobPosition === null) {
        window.location.replace("/");
        return;
      }

      form.initialize(jobPosition);
    } else {
      setJobPosition(initialJobPosition);
      form.initialize(initialJobPosition);
    }
  }, []);

  return (
    <HirePageModal
      title="Edit job position" isFirstPage={initialJobPosition !== null} opened={opened} setOpened={setOpened}>
      <form onSubmit={
        form.onSubmit((values) => onSubmit({
            jobPositionId: jobPosition!.id,
            data: values,
            onComplete: () => {
              form.reset();
              setOpened(false);
              setToFetchJobPositions(true);
            }
          })
        )}>
        <JobPositionForm form={form} isEdit={true} />
      </form>
    </HirePageModal>
  );
}
