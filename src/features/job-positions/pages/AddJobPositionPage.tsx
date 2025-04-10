"use client";

import { HireModal } from "@/components/HireModal";
import { Button, Group, Text } from "@mantine/core";

export default function AddJobPositionPage({ isFirstPage }: { isFirstPage: boolean }) {

  return (
    <HireModal title="Create job position" isFirstPage={isFirstPage}>
      <Text>
        sdasdsadas
      </Text>
      <Group justify="flex-end" mt="md">
        <Button variant="filled">Save</Button>
      </Group>
    </HireModal>
  );
}
