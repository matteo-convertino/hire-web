"use client";

import { HireModal } from "@/components/HireModal";
import useJobPositionForm from "@/features/job-positions/hooks/useJobPositionForm";
import { useState } from "react";
import { useDashboardStore } from "@/features/dashboard/stores/useDashboardStore";
import JobPositionForm from "@/features/job-positions/components/JobPositionForm";

export default function AddJobPositionPage({ isFirstPage }: { isFirstPage: boolean }) {
  const { form, onSubmit } = useJobPositionForm();
  const [opened, setOpened] = useState(false);
  const { setToFetchJobPositions } = useDashboardStore();

  return (
    <HireModal title="Create job position" isFirstPage={isFirstPage} opened={opened} setOpened={setOpened}>
      <form onSubmit={
        form.onSubmit((values) => onSubmit({
            data: values,
            onComplete: () => {
              form.reset();
              setOpened(false);
              setToFetchJobPositions(true);
            }
          })
        )}>
        <JobPositionForm form={form} />
      </form>
    </HireModal>
  );
}
