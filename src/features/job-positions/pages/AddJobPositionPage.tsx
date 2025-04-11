"use client";

import { HireModal } from "@/components/HireModal";
import { Button, Group, Stack, Textarea, TextInput } from "@mantine/core";
import useJobPositionAdd from "@/features/job-positions/hooks/useJobPositionAdd";
import { useState } from "react";
import { useDashboardStore } from "@/features/dashboard/stores/useDashboardStore";

export default function AddJobPositionPage({ isFirstPage }: { isFirstPage: boolean }) {
  const { form, onSubmit } = useJobPositionAdd();
  const [opened, setOpened] = useState(false);
  const {setToFetchJobPositions} = useDashboardStore();

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
        <Stack>
          <TextInput
            radius="md"
            label="Title"
            withAsterisk
            // rightSection={<IconAbc />}
            key={form.key("title")}
            {...form.getInputProps("title")}
          />
          <Textarea
            radius="md"
            label="Description"
            resize="vertical"
            withAsterisk
            key={form.key("description")}
            {...form.getInputProps("description")}
          />
          <Textarea
            radius="md"
            label="End message"
            resize="vertical"
            key={form.key("lastMessage")}
            {...form.getInputProps("lastMessage")}
          />
          <Textarea
            radius="md"
            label="Evaluation criteria"
            resize="vertical"
            key={form.key("evaluationCriteria")}
            {...form.getInputProps("evaluationCriteria")}
          />
        </Stack>
        <Group justify="flex-end" mt="md">
          <Button type="submit" radius="md" variant="filled">Save</Button>
        </Group>
      </form>
    </HireModal>
  );
}
