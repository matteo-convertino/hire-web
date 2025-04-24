"use client";

import { HirePageModal } from "@/components/HirePageModal";
import useJobPositionForm from "@/features/job-positions/hooks/useJobPositionForm";
import { useState } from "react";
import { useDashboardStore } from "@/features/dashboard/stores/useDashboardStore";
import { useParams } from "next/navigation";
import { parseParamToInteger } from "@/utils/parseParamToInteger";
import SkillsForm from "@/features/skills/components/SkillsForm";
import useSkillsAdd from "@/features/skills/hooks/useSkillsAdd";

export default function AddSkillsPage({ isFirstPage }: { isFirstPage: boolean }) {
  const { id } = useParams();
  const [opened, setOpened] = useState(false);
  const { setToFetchJobPositions } = useDashboardStore();

  const jobPositionId = parseParamToInteger(id);
  if (jobPositionId === undefined) {
    window.location.replace("/");
    return;
  }

  const { form, onSubmit } = useSkillsAdd({ jobPositionId: jobPositionId });

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
        <SkillsForm form={form} />
      </form>
    </HirePageModal>
  );
}
