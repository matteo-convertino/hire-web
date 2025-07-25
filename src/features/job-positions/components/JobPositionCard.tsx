import { ActionIcon, Box, Button, Card, Flex, Group, Stack, Text } from "@mantine/core";
import { JobPositionResponseDTO } from "@/dto/response/JobPositionResponseDTO";
import { MouseEventHandler } from "react";
import { PencilSimple, Trash } from "@phosphor-icons/react";
import { HireButton } from "@/components/HireButton";

export default function JobPositionCard({ jobPosition, onView, onEdit, onDelete }: {
  jobPosition: JobPositionResponseDTO,
  onView?: () => void
  onEdit?: () => void
  onDelete?: () => void
}) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack h={150} justify="space-between">
        <Box>
          <Group justify="space-between" mb="xs">
            <Text truncate="end" fw={500}>{jobPosition.title}</Text>
          </Group>

          <Text lineClamp={2} size="sm" c="dimmed">{jobPosition.description}</Text>
        </Box>

        <Flex gap="xs" align="center" mt="md">
          <HireButton
            label="See job position"
            color="blue"
            fullWidth
            onClick={onView}
            style={{ flex: 1 }}
          />

          {
            onEdit &&
            <ActionIcon variant="filled" onClick={onEdit} size="lg" radius="md">
              <PencilSimple />
            </ActionIcon>
          }
          {
            onDelete &&
            <ActionIcon variant="filled" color="red" onClick={onDelete} size="lg" radius="md">
              <Trash />
            </ActionIcon>
          }
        </Flex>
      </Stack>

    </Card>
  );
}
