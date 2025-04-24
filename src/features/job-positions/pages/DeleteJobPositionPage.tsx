"use client";

import { HirePageModal } from "@/components/HirePageModal";
import { useState } from "react";
import { Button, Group, Text } from "@mantine/core";
import { parseParamToInteger } from "@/utils/parseParamToInteger";
import { useParams } from "next/navigation";
import { useDashboardStore } from "@/features/dashboard/stores/useDashboardStore";
import useJobPositionDelete from "@/features/job-positions/hooks/useJobPositionDelete";
import { HireButton } from "@/components/HireButton";

export default function DeleteJobPositionPage({ isFirstPage }: { isFirstPage: boolean }) {
  const { id } = useParams();
  const [opened, setOpened] = useState(false);
  const { deleteJobPosition } = useJobPositionDelete();
  const { setToFetchJobPositions } = useDashboardStore();

  const jobPositionId = parseParamToInteger(id);
  if (jobPositionId === undefined) {
    window.location.replace("/");
    return;
  }

  return (
    <HirePageModal
      title="Delete Confirmation" isFirstPage={isFirstPage} opened={opened} setOpened={setOpened}>
      <Text>
        Are you sure you want to delete this item?
        This action cannot be undone.
      </Text>
      <Group justify="flex-end" mt="md">
        <HireButton
          label="Cancel"
          variant="outline"
          color="red"
          onClick={() => setOpened(false)}
        />
        <HireButton
          label="Delete"
          color="red"
          onClick={() => deleteJobPosition({
            id: jobPositionId,
            onComplete: () => {
              setToFetchJobPositions(true);
              setOpened(false);
            }
          })}
        />
      </Group>
    </HirePageModal>
  );
}
