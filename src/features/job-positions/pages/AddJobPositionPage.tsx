"use client";

import { HirePageModal } from "@/components/HirePageModal";
import useJobPositionForm from "@/features/job-positions/hooks/useJobPositionForm";
import JobPositionForm from "@/features/job-positions/components/JobPositionForm";
import { useRouter } from "next/navigation";
import { useDashboardStore } from "@/features/dashboard/stores/useDashboardStore";

export default function AddJobPositionPage({ isFirstPage }: { isFirstPage: boolean }) {
  const { form, onSubmit } = useJobPositionForm();
  const router = useRouter();
  const { setToFetchJobPositions } = useDashboardStore();

  return (
    <HirePageModal
      title="Create job position"
      isFirstPage={isFirstPage}
    >
      <form onSubmit={
        form.onSubmit((values) => onSubmit({
            data: values,
            onComplete: (jobPosition) => {
              form.reset();
              setToFetchJobPositions(true);
              router.replace(`/job-positions/${jobPosition.id}/skills/add`);
            }
          })
        )}>
        <JobPositionForm form={form} />
      </form>
    </HirePageModal>
  );
}
