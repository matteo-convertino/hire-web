"use client";

import { HirePageModal } from "@/components/HirePageModal";
import useJobPositionForm from "@/features/job-positions/hooks/useJobPositionForm";
import { useState } from "react";
import { useDashboardStore } from "@/features/dashboard/stores/useDashboardStore";
import { useParams } from "next/navigation";
import { parseParamToInteger } from "@/utils/parseParamToInteger";
import JobPositionSkillsForm from "@/features/job-positions/components/JobPositionSkillsForm";
import useJobPositionSkillsForm from "@/features/job-positions/hooks/useJobPositionSkillsForm";

export default function AddJobPositionSkillsPage({ isFirstPage }: { isFirstPage: boolean }) {
  const { id } = useParams();
  const [opened, setOpened] = useState(false);
  const { setToFetchJobPositions } = useDashboardStore();

  const jobPositionId = parseParamToInteger(id);
  if (jobPositionId === null) {
    window.location.replace("/");
    return;
  }

  const { form, onSubmit } = useJobPositionSkillsForm({ jobPositionId: jobPositionId });

  return (
    <HirePageModal
      title="Add skills"
      size="xl"
      isFirstPage={isFirstPage}
      opened={opened}
      setOpened={setOpened}
      beforeClose={() => setToFetchJobPositions(true)}
    >
      <form onSubmit={
        form.onSubmit((values) => onSubmit({
            data: values.skills,
            onComplete: () => {
              form.reset();
              setOpened(false);
            }
          })
        )}>
        <JobPositionSkillsForm form={form} />
      </form>
    </HirePageModal>
  );
}
